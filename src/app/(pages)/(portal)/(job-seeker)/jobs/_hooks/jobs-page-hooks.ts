"use client";

import { useState, useMemo, useCallback } from "react";
import { useJobs as useJobsList, useSaveJob } from "../_services/jobs-service";

export function useJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState<
    "all" | "pollen" | "external"
  >("all");
  const [jobIndustriesFilter, setJobIndustriesFilter] = useState("all");
  const [jobLocationsFilter, setJobLocationsFilter] = useState("all");
  const [jobContractTypesFilter, setJobContractTypesFilter] = useState("all");
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  // Build filters for React Query
  const fetchFilters = useMemo(
    () => ({
      jobType: jobTypeFilter,
      industry: jobIndustriesFilter,
      location: jobLocationsFilter,
      contractType: jobContractTypesFilter,
      searchTerm: searchTerm.trim(),
    }),
    [
      jobTypeFilter,
      jobIndustriesFilter,
      jobLocationsFilter,
      jobContractTypesFilter,
      searchTerm,
    ],
  );

  // React Query: Fetch jobs list
  const {
    data: jobs = [],
    isLoading: loading,
    error,
  } = useJobsList(fetchFilters);

  // React Query: Save job mutation
  const saveJobMutation = useSaveJob();

  // Handle favorite job toggle
  const saveFavoriteJob = useCallback(
    (jobId: string) => {
      const alreadySaved = savedJobs.has(jobId);

      if (alreadySaved) {
        setSavedJobs((prev) => {
          const newSet = new Set(prev);
          newSet.delete(jobId);
          return newSet;
        });
      } else {
        setSavedJobs((prev) => {
          const newSet = new Set(prev);
          newSet.add(jobId);
          return newSet;
        });
      }

      // Call the mutation
      saveJobMutation.mutate(jobId, {
        onError: () => {
          // Revert on error
          if (alreadySaved) {
            setSavedJobs((prev) => {
              const newSet = new Set(prev);
              newSet.add(jobId);
              return newSet;
            });
          } else {
            setSavedJobs((prev) => {
              const newSet = new Set(prev);
              newSet.delete(jobId);
              return newSet;
            });
          }
        },
      });
    },
    [savedJobs, saveJobMutation],
  );

  // Check if a job is saved
  const isSaved = useCallback(
    (jobId: string) => {
      return savedJobs.has(jobId);
    },
    [savedJobs],
  );

  return {
    jobs,
    loading,
    error: error?.message || null,
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
    savedJobs,
    saveFavoriteJob,
    isSaved,
  };
}

export function useExternalJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState<
    "all" | "pollen" | "external"
  >("all");
  const [jobIndustriesFilter, setJobIndustriesFilter] = useState("all");
  const [jobLocationsFilter, setJobLocationsFilter] = useState("all");
  const [jobContractTypesFilter, setJobContractTypesFilter] = useState("all");
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  // Build filters for React Query
  const fetchFilters = useMemo(
    () => ({
      jobType: jobTypeFilter,
      industry: jobIndustriesFilter,
      location: jobLocationsFilter,
      contractType: jobContractTypesFilter,
      searchTerm: searchTerm.trim(),
    }),
    [
      jobTypeFilter,
      jobIndustriesFilter,
      jobLocationsFilter,
      jobContractTypesFilter,
      searchTerm,
    ],
  );

  // React Query: Fetch jobs list
  const {
    data: externalJobs = [],
    isLoading: loading,
    error,
  } = useJobsList(fetchFilters);

  // React Query: Save job mutation
  const saveJobMutation = useSaveJob();

  // Handle favorite job toggle
  const saveFavoriteJob = useCallback(
    (jobId: string) => {
      const alreadySaved = savedJobs.has(jobId);

      if (alreadySaved) {
        setSavedJobs((prev) => {
          const newSet = new Set(prev);
          newSet.delete(jobId);
          return newSet;
        });
      } else {
        setSavedJobs((prev) => {
          const newSet = new Set(prev);
          newSet.add(jobId);
          return newSet;
        });
      }

      // Call the mutation
      saveJobMutation.mutate(jobId, {
        onError: () => {
          // Revert on error
          if (alreadySaved) {
            setSavedJobs((prev) => {
              const newSet = new Set(prev);
              newSet.add(jobId);
              return newSet;
            });
          } else {
            setSavedJobs((prev) => {
              const newSet = new Set(prev);
              newSet.delete(jobId);
              return newSet;
            });
          }
        },
      });
    },
    [savedJobs, saveJobMutation],
  );

  // Check if a job is saved
  const isSaved = useCallback(
    (jobId: string) => {
      return savedJobs.has(jobId);
    },
    [savedJobs],
  );

  return {
    externalJobs,
    loading,
    error: error?.message || null,
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
    savedJobs,
    saveFavoriteJob,
    isSaved,
  };
}
