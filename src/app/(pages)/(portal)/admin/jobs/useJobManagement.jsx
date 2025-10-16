import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getJobList } from "@/admin/jobs/actions";
import { Badge } from "@/components/ui/badge";

export function useJobManagement() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadingRef = useRef(false);

  // Debug: Log filter changes
  useEffect(() => {
    console.log("🔄 Filters changed:", {
      selectedStatus,
      selectedAssignment,
      debouncedSearchTerm,
    });
  }, [selectedStatus, selectedAssignment, debouncedSearchTerm]);

  // Debounce search term y resetear filtros cuando se busca
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Si hay término de búsqueda, resetear los filtros
      if (searchTerm.trim()) {
        setSelectedStatus("all");
        setSelectedAssignment("all");
      }
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
      // Si hay búsqueda activa, ignorar los filtros y buscar en todos
      const statusToUse = debouncedSearchTerm.trim() ? "all" : selectedStatus;
      const assignmentToUse = debouncedSearchTerm.trim()
        ? "all"
        : selectedAssignment;

      const result = await getJobList({
        status: statusToUse,
        searchTerm: debouncedSearchTerm.trim(),
        assignment: assignmentToUse,
      });

      if (result.success) {
        const jobsResult = result.data.map((job) => ({
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
        console.log(
          `✅ Loaded ${jobsResult.length} jobs:`,
          jobsResult.map((j) => ({
            id: j.id,
            title: j.job_title,
            status: j.status,
            assigned_to: j.assigned_to,
          })),
        );
        setJobs(jobsResult || []);
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
  }, [selectedStatus, debouncedSearchTerm, selectedAssignment]);

  // Load jobs when filters change
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
        return <Badge className="bg-yellow-100 text-yellow-800 ">Draft</Badge>;
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

  // Función personalizada para cambiar el status y limpiar el buscador
  const handleStatusChange = useCallback((status) => {
    setSelectedStatus(status);
    setSearchTerm("");
    setDebouncedSearchTerm("");
  }, []);

  // Función personalizada para cambiar el assignment y limpiar el buscador
  const handleAssignmentChange = useCallback((assignment) => {
    setSelectedAssignment(assignment);
    setSearchTerm("");
    setDebouncedSearchTerm("");
  }, []);

  return useMemo(
    () => ({
      form: {
        selectedStatus: selectedStatus,
        selectedAssignment: selectedAssignment,
        activeTab: activeTab,
        searchTerm: searchTerm,
        jobs: jobs,
        loading: loading,
        error: error,
        setSelectedStatus: handleStatusChange,
        setSearchTerm: setSearchTerm,
        loadJobs: loadJobs,
        getStatusBadge: getStatusBadge,
        setSelectedAssignment: handleAssignmentChange,
        setActiveTab: setActiveTab,
        hasActionRequired: hasActionRequired,
      },
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
      handleStatusChange,
      handleAssignmentChange,
    ],
  );
}
