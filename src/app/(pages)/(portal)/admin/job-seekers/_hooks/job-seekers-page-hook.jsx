import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  getJobSeeker,
  getDistinctRoles,
} from "@/app/(pages)/(portal)/admin/job-seekers/_services/job-seekers-page-service";
import { Badge } from "@/components/ui/badge";

// Variantes para el badge de "perfil completo"
const PROFILE_BADGE_VARIANTS = {
  complete: {
    label: "Complete",
    classes: "bg-green-100 text-green-800 border-green-200",
  },
  incomplete: {
    label: "Incomplete",
    classes: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  admin: {
    label: "Pollen Admin",
    classes: "bg-pink-100 text-pink-800 border-pink-200",
  },
};

// Variantes para el badge de "status"
const STATUS_BADGE_VARIANTS = {
  active: {
    label: "Active",
    classes: "text-sm bg-green-100 text-green-800 border-green-200",
  },
  inactive: {
    label: "Inactive",
    classes: "text-sm bg-gray-100 text-gray-800 border-gray-200",
  },
  undefined: {
    label: "Undefined",
    classes: "text-sm bg-gray-200 text-gray-700",
  },
};

export function useJobSeeker() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [profileFilter, setProfileFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [jobSeekers, setJobSeekers] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadingRef = useRef(false);

  // Debounce search term
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const loadJobSeekers = useCallback(async () => {
    // Evitar llamadas duplicadas
    if (loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const result = await getJobSeeker({
        status: statusFilter,
        searchTerm: debouncedSearchTerm.trim(),
        profile: profileFilter,
        role: roleFilter,
      });

      if (result.success) {
        setJobSeekers(result.data || []);
        setError(null);
      } else {
        console.error("❌ Error from server:", result.error);
        setError(result.error);
      }
    } catch (err) {
      console.error("💥 Exception caught:", err);
      setError("Failed to load employers: " + err.message);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [statusFilter, profileFilter, roleFilter, debouncedSearchTerm]);

  // Load job seekers when loadJobSeekers function changes
  useEffect(() => {
    loadJobSeekers();
  }, [loadJobSeekers]);

  // Load distinct roles based on search term only (not affected by current role/status/profile filters)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await getDistinctRoles({
          searchTerm: debouncedSearchTerm.trim(),
        });
        if (!cancelled && result.success) {
          setRoleOptions(result.data || []);
        }
      } catch {
        // non-blocking; omit error surface here
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debouncedSearchTerm]);

  const getStatusBadge = useCallback((status) => {
    const variant = STATUS_BADGE_VARIANTS[status];
    if (variant) {
      return <Badge className={variant.classes}>{variant.label}</Badge>;
    }
    // default: mostrar el status textual con estilo gris
    return (
      <Badge className="text-sm bg-gray-100 text-gray-800 border-gray-200">
        {status}
      </Badge>
    );
  }, []);

  const getProfileCompleteBadge = useCallback((isComplete) => {
    const badgeClass = "w-full text-sm";
    const variant =
      PROFILE_BADGE_VARIANTS[isComplete] || PROFILE_BADGE_VARIANTS.incomplete;
    return (
      <Badge className={`${badgeClass} ${variant.classes}`}>
        {variant.label}
      </Badge>
    );
  }, []);

  return useMemo(
    () => ({
      form: {
        statusFilter: statusFilter,
        profileFilter: profileFilter,
        roleFilter: roleFilter,
        searchTerm: searchTerm,
        jobSeekers: jobSeekers,
        roleOptions: roleOptions,
        loading: loading,
        error: error,
        setSearchTerm: setSearchTerm,
        setStatusFilter: setStatusFilter,
        setProfileFilter: setProfileFilter,
        setRoleFilter: setRoleFilter,
        loadJobSeekers: loadJobSeekers,
        getStatusBadge: getStatusBadge,
        getProfileCompleteBadge: getProfileCompleteBadge,
      },
    }),
    [
      statusFilter,
      profileFilter,
      roleFilter,
      jobSeekers,
      roleOptions,
      searchTerm,
      loading,
      error,
      loadJobSeekers,
      getStatusBadge,
      getProfileCompleteBadge,
    ],
  );
}
