import { useState, useEffect } from "react";
import { getJobSeeker } from "@/app/(pages)/(portal)/admin/all-job-seekers/actions";
import { Badge } from "@/app/components/ui/badge";

export function useJobSeeker() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [profileFilter, setProfileFilter] = useState("all");
  const [applicationFilter, setApplicationFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobSeekers, setJobSeekers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJobSeekers();
  }, [statusFilter, profileFilter, applicationFilter]);

  // Usar debounce para la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== "") {
        loadJobSeekers();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Cargar todas las aplicaciones cuando se borre la búsqueda
  useEffect(() => {
    if (searchTerm === "") {
      loadJobSeekers();
    }
  }, [searchTerm]);

  async function loadJobSeekers() {
    setLoading(true);
    setError(null);

    try {
      const result = await getJobSeeker({
        status: statusFilter,
        searchTerm: searchTerm.trim(),
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
    }
  }

  const getStatusBadge = (status) => {
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
  };

  const getProfileCompleteBadge = (isComplete) => {
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
  };

  return {
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
  };
}
