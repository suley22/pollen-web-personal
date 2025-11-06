import { useState, useCallback, useRef, useEffect } from "react";
import {
  getFeaturedHiddenJobs,
  getFeaturedJobs,
  saveSavedJob,
  getUserApplications,
} from "../_services/feature-jobs-service";

export function useFeaturedJobs() {
  const loadingRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [hiddenJobs, setHiddenJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [savedJobs] = useState(new Set());
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

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
      const applicationsResult = getUserApplications();

      const [jobsResponse, hiddenResponse, applicationsResponse] =
        await Promise.all([jobsResult, hiddenResult, applicationsResult]);

      // Set applied job IDs
      if (applicationsResponse.success) {
        setAppliedJobIds(applicationsResponse.data);
      }

      if (jobsResponse.success) {
        const jobsWithAppliedStatus = jobsResponse.data.map((job) => ({
          ...job,
          hasApplied: applicationsResponse.success
            ? applicationsResponse.data.has(job.id)
            : false,
        }));
        setJobs(jobsWithAppliedStatus || []);
        setError(null);
      } else {
        console.error("❌ Error from server:", jobsResponse.error);
        setError(jobsResponse.error);
      }

      if (hiddenResponse.success) {
        const hiddenJobsWithAppliedStatus = hiddenResponse.data.map((job) => ({
          ...job,
          hasApplied: applicationsResponse.success
            ? applicationsResponse.data.has(job.id)
            : false,
        }));
        setHiddenJobs(hiddenJobsWithAppliedStatus || []);
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
        console.error("❌ Error removing favorite job:", result.error);
        // Revert: add back to savedJobs and update UI to show as saved
        savedJobs.add(jobId);
        updateSavedJobList(jobId, true);
      }
    } else {
      updateSavedJobList(jobId, true);
      savedJobs.add(jobId);

      const result = saveSavedJob(jobId);

      if (!result.success) {
        console.error("❌ Error saving favorite job:", result.error);
        // Revert: remove from savedJobs and update UI to show as not saved
        savedJobs.delete(jobId);
        updateSavedJobList(jobId, false);
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
