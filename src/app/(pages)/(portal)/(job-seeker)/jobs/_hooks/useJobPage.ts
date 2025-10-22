import { useState, useEffect, useCallback } from "react";
import { getJobs } from "../_services/jobs-service";

export function useJobs(filters) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
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
  }, [filters]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return {
    jobs,
    loading,
    error,
  };
}
