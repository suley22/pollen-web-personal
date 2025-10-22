import { useState, useCallback, useRef, useEffect } from "react";
import {
  getFeaturedHiddenJobs,
  getFeaturedJobs,
  saveSavedJob,
} from "../_services/feature-jobs-service";

export function useFeaturedJobs() {
  const loadingRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [hiddenJobs, setHiddenJobs] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [savedJobs] = useState(new Set());

  useEffect(() => {
    // Forzar re-render cuando savedJobs cambie
    console.log("Saved jobs updated:", Array.from(savedJobs));
  }, [savedJobs]);

  const loadJobs = useCallback(async () => {
    // Evitar llamadas duplicadas
    if (loadingRef.current) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const jobsResult = getFeaturedJobs();
      const hiddenResult = getFeaturedHiddenJobs();

      const [jobsResponse, hiddenResponse] = await Promise.all([
        jobsResult,
        hiddenResult,
      ]);

      if (jobsResponse.success) {
        setJobs(jobsResponse.data || []);
        setError(null);
      } else {
        console.error("❌ Error from server:", jobsResponse.error);
        setError(jobsResponse.error);
      }

      if (hiddenResponse.success) {
        setHiddenJobs(hiddenResponse.data || []);
      } else {
        console.error("❌ Error from server:", hiddenResponse.error);
        setError(hiddenResponse.error);
      }
    } catch (err) {
      console.error("💥 Exception caught:", err);
      setError("Failed to load employers: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Efecto unificado para cargar datos iniciales y cambios
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const setIsLoading = (value) => {
    setLoading(value);
    loadingRef.current = value;
  };

  const updateFavouriteJob = (jobId) => {
    const alreadySaved = savedJobs.has(jobId);

    if (alreadySaved) {
      updateSavedJobList(jobId, false);
      savedJobs.delete(jobId);

      const result = saveSavedJob(jobId);

      if (!result.success) {
        console.error("❌ Error saving favorite job:", result.error);
        updateSavedJobList(jobId, true);
      }
    } else {
      updateSavedJobList(jobId, true);
      savedJobs.add(jobId);

      const result = saveSavedJob(jobId);

      if (!result.success) {
        console.error("❌ Error saving favorite job:", result.error);
        updateSavedJobList(jobId, true);
      }
    }
  };

  const updateSavedJobList = (jobId, isSaved) => {
    setJobs((items) => updateSavedJob(items, jobId, isSaved));
    setHiddenJobs((items) => updateSavedJob(items, jobId, isSaved));
  };

  const updateSavedJob = (items, jobId, isSaved) => {
    return items.map((job) =>
      job.id === jobId ? { ...job, isSaved: isSaved } : job,
    );
  };

  return {
    jobs: jobs,
    hiddenJobs: hiddenJobs,
    loading: loading,
    error: error,
    saveFavoriteJob: updateFavouriteJob,
    savedJobs,
  };
}
