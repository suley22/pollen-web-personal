import { useState, useEffect, useCallback, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { useAssignedJobs } from "../_services/home-page-service";

export function useHome() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Debounce del searchTerm
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Use the React Query hook to fetch assigned jobs
  const {
    data: jobs = [],
    isLoading: loading,
    error,
  } = useAssignedJobs({
    status: selectedStatus,
    searchTerm: debouncedSearchTerm.trim(),
  });

  const getStatusBadge = useCallback((status) => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-green-100 text-green-800 status-badge-compact">
            Live
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-orange-100 text-orange-800 status-badge-compact">
            Paused
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 status-badge-medium">
            Cancelled
          </Badge>
        );
      case "complete":
        return (
          <Badge className="bg-blue-100 text-blue-800 status-badge-medium">
            Complete
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 status-badge-compact">
            Draft
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="status-badge-compact">
            {status}
          </Badge>
        );
    }
  }, []);

  const hasActionRequired = useCallback((job) => {
    return (
      job.newApplicationsToReview > 0 ||
      job.pollenInterviewsBooked > 0 ||
      job.needsApproval
    );
  }, []);

  const homeState = useMemo(
    () => ({
      selectedStatus,
      selectedAssignment,
      activeTab,
      searchTerm,
      jobs,
      loading,
      error: error?.message || null,
      setSelectedStatus,
      setSearchTerm,
      getStatusBadge,
      setSelectedAssignment,
      setActiveTab,
      hasActionRequired,
    }),
    [
      selectedStatus,
      selectedAssignment,
      activeTab,
      searchTerm,
      jobs,
      loading,
      error,
      getStatusBadge,
      hasActionRequired,
    ],
  );

  return { homeState };
}
