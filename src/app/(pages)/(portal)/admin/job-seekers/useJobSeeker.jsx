import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getJobSeeker } from "@/admin/job-seekers/actions";
import { Badge } from "@/components/ui/badge";

export function useJobSeeker() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [profileFilter, setProfileFilter] = useState("all");
  const [applicationFilter, setApplicationFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [jobSeekers, setJobSeekers] = useState([]);
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
        application: applicationFilter,
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
  }, [statusFilter, profileFilter, applicationFilter, debouncedSearchTerm]);

  // Load job seekers when loadJobSeekers function changes
  useEffect(() => {
    loadJobSeekers();
  }, [loadJobSeekers]);

  const getStatusBadge = useCallback((status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="text-sm bg-green-100 text-green-800 border-green-200">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="text-sm bg-gray-100 text-gray-800 border-gray-200">
            Inactive
          </Badge>
        );
      default:
        return (
          <Badge className="text-sm bg-gray-100 text-gray-800 border-gray-200">
            {status}
          </Badge>
        );
    }
  }, []);

  const getProfileCompleteBadge = useCallback((isComplete) => {
    switch (isComplete) {
      case "complete":
        return (
          <Badge className="text-sm bg-green-100 text-green-800 border-green-200">
            Complete
          </Badge>
        );
      case "incomplete":
        return (
          <Badge className="text-sm bg-yellow-100 text-yellow-800 border-yellow-200">
            Incomplete
          </Badge>
        );
      default:
        return (
          <Badge className="text-sm bg-yellow-100 text-yellow-800 border-yellow-200">
            Incomplete
          </Badge>
        );
    }
  }, []);

  return useMemo(
    () => ({
      form: {
        statusFilter: statusFilter,
        profileFilter: profileFilter,
        applicationFilter: applicationFilter,
        jobSeekers: jobSeekers,
        loading: loading,
        error: error,
        setSearchTerm: setSearchTerm,
        setStatusFilter: setStatusFilter,
        setProfileFilter: setProfileFilter,
        setApplicationFilter: setApplicationFilter,
        loadJobSeekers: loadJobSeekers,
        getStatusBadge: getStatusBadge,
        getProfileCompleteBadge: getProfileCompleteBadge,
      },
    }),
    [
      statusFilter,
      profileFilter,
      applicationFilter,
      jobSeekers,
      loading,
      error,
      loadJobSeekers,
      getStatusBadge,
      getProfileCompleteBadge,
    ],
  );
}
