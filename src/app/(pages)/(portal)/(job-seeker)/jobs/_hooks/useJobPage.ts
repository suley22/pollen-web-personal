import { useState, useEffect, useCallback } from "react";
import { getJobs } from "../_services/jobs-service";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [jobIndustriesFilter, setJobIndustriesFilter] = useState("all");
  const [jobLocationsFilter, setJobLocationsFilter] = useState("all");
  const [jobContractTypesFilter, setJobContractTypesFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const filters = {
        searchTerm,
        jobType: jobTypeFilter,
        industry: jobIndustriesFilter,
        location: jobLocationsFilter,
        contractType: jobContractTypesFilter,
      };

      const result = await getJobs(filters);

      if (result.success) {
        setJobs(result.data || []);
      } else {
        console.error("❌ Error from server:", result.error);
        setError(result.error);
      }
    } catch (err) {
      console.error("💥 Exception caught:", err);
      setError("Failed to load jobs: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, jobTypeFilter, jobIndustriesFilter, jobLocationsFilter, jobContractTypesFilter]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return {
    jobs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    jobTypeFilter,
    setJobTypeFilter,
    jobIndustriesFilter,
    setJobIndustriesFilter,
    jobLocationsFilter,
    setJobLocationsFilter,
    jobContractTypesFilter,
    setJobContractTypesFilter,
    selectedJob,
    setSelectedJob,
    showJobDetails,
    setShowJobDetails,
  };
}
