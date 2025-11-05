"use client";

import { useState, useMemo, useCallback } from "react";
import {
  useExternalJobs,
  usePollenJobs,
  useSaveJob,
  useUserApplications,
} from "../_services/jobs-service";

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

  // React Query: Fetch both Pollen jobs and External jobs separately
  const {
    data: pollenJobs = [],
    isLoading: loadingPollenJobs,
    error: pollenError,
  } = usePollenJobs(fetchFilters);

  const {
    data: externalJobs = [],
    isLoading: loadingExternalJobs,
    error: externalError,
  } = useExternalJobs(fetchFilters);

  // Fetch user applications to check applied status and interview links
  const { data: applicationsData } = useUserApplications();
  const appliedJobIds = useMemo(() => {
    return applicationsData?.appliedJobIds || new Set<string>();
  }, [applicationsData]);
  const jobsWithInterviewLink = useMemo(() => {
    return applicationsData?.jobsWithInterviewLink || new Set<string>();
  }, [applicationsData]);

  // Combine both lists based on jobTypeFilter with unique identifiers
  const jobs = useMemo(() => {
    // Add source property to differentiate jobs and create unique keys
    const pollenJobsWithSource = pollenJobs.map((job) => ({
      ...job,
      source: "pollen" as const,
      uniqueKey: `pollen-${job.id}`,
    }));

    const externalJobsWithSource = externalJobs.map((job) => ({
      ...job,
      source: "external" as const,
      uniqueKey: `external-${job.id}`,
    }));

    if (jobTypeFilter === "pollen") {
      return pollenJobsWithSource;
    } else if (jobTypeFilter === "external") {
      return externalJobsWithSource;
    } else {
      // "all" - combine both lists
      return [...pollenJobsWithSource, ...externalJobsWithSource];
    }
  }, [jobTypeFilter, pollenJobs, externalJobs]);

  // Combine loading states
  const loading = loadingPollenJobs || loadingExternalJobs;

  // Combine errors (prioritize pollen error if both exist)
  const error = pollenError || externalError;

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

  // Check if user has applied to a job
  const hasApplied = useCallback(
    (jobId: string) => {
      return appliedJobIds.has(jobId);
    },
    [appliedJobIds],
  );

  // Check if job has interview link
  const hasInterviewLink = useCallback(
    (jobId: string) => {
      return jobsWithInterviewLink.has(jobId);
    },
    [jobsWithInterviewLink],
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
    hasApplied,
    hasInterviewLink,
    isSaved,
  };
}
