import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getJobList } from "@/app/(pages)/(portal)/admin/jobs-managment/actions";
import { Badge } from "@/components/ui/badge";

export function useHome() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadingRef = useRef(false);

  // Debounce del searchTerm
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const loadJobs = useCallback(async () => {
    // Evitar llamadas duplicadas
    if (loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const result = await getJobList({
        status: selectedStatus,
        searchTerm: debouncedSearchTerm.trim(),
      });

      if (result.success) {
        const assignedJobs = result.data.map((job) => ({
          ...job,
          assigned_date: job.published_at || job.created_at,
          total_applications: 2,
          newApplicationsToReview: 10,
          pollenInterviewsBooked: 5,
          needsApproval: job.needs_approval || false,
          company_name: job.company_name || "Unknown Company",
          responsibilities: job.responsibilities || [],
          candidatesMatchedToEmployer: 15,
          feedbackSent: 8,
          interviewsScheduled: 4,
          offersExtended: 2,
          hiresMade: 1,
        }));
        setJobs(assignedJobs || []);
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
  }, [selectedStatus, debouncedSearchTerm]);

  // Efecto unificado para cargar datos iniciales y cambios
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

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
      error,
      setSelectedStatus,
      setSearchTerm,
      loadJobs,
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
      loadJobs,
      getStatusBadge,
      hasActionRequired,
    ],
  );

  return { homeState };
}
