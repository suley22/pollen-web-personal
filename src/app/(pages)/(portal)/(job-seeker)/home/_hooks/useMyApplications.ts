import { useState, useEffect } from "react";
import { getMyApplications } from "../_services/my-applications-service";

export function useMyApplications() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMyApplications();
  }, []);

  const loadMyApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getMyApplications();

      if (response.success) {
        setJobs(response.data || []);
        setError(null);
      } else {
        console.error("❌ Error from server:", response.error);
        setError(response.error);
      }
    } catch (err) {
      console.error("💥 Exception caught:", err);
      setError("Failed to load applications: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,
    loading,
    error,
  };
}
