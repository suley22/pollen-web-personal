"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useJobsList, useJobsStatistics } from "../_services/jobs-page-service";
import { JobStatusBadge } from "@/components/design-system";
import {
  JOB_STATUS_OPTIONS,
  JOB_ASSIGNMENT_OPTIONS,
} from "@/constants/filters";

export function useJobManagement(debouncedSearchTerm) {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when search term or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedStatus, selectedAssignment]);

  // Filter configurations for Filters component
  const filterConfigs = useMemo(
    () => [
      {
        name: "assignment",
        placeholder: "Filter by assignment",
        defaultValue: selectedAssignment,
        options: JOB_ASSIGNMENT_OPTIONS,
        onValueChange: setSelectedAssignment,
      },
      {
        name: "status",
        placeholder: "Filter by status",
        defaultValue: selectedStatus,
        options: JOB_STATUS_OPTIONS,
        onValueChange: setSelectedStatus,
      },
    ],
    [selectedAssignment, selectedStatus],
  );

  // Build filters for React Query
  const fetchFilters = useMemo(
    () => ({
      status: selectedStatus,
      assignment: selectedAssignment,
      searchTerm: debouncedSearchTerm.trim(),
      page: currentPage,
      pageSize: pageSize,
    }),
    [
      selectedStatus,
      selectedAssignment,
      debouncedSearchTerm,
      currentPage,
      pageSize,
    ],
  );

  // React Query: Fetch jobs list
  const {
    data: { jobs = [], pagination = null } = {},
    isLoading,
    error,
  } = useJobsList(fetchFilters);

  // React Query: Fetch statistics - only filter by search term
  const statisticsFilters = useMemo(
    () => ({
      searchTerm: debouncedSearchTerm.trim(),
    }),
    [debouncedSearchTerm],
  );

  const { data: statisticsData } = useJobsStatistics(statisticsFilters);

  // Pagination functions
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const goToNextPage = useCallback(() => {
    if (pagination?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [pagination?.hasNextPage]);

  const goToPreviousPage = useCallback(() => {
    if (pagination?.hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [pagination?.hasPreviousPage]);

  const getStatusBadge = useCallback((status) => {
    return <JobStatusBadge status={status} />;
  }, []);

  const hasActionRequired = useCallback((job) => {
    return (
      job.newApplicationsToReview > 0 ||
      job.pollenInterviewsBooked > 0 ||
      job.needsApproval
    );
  }, []);

  return {
    selectedStatus,
    selectedAssignment,
    activeTab,
    jobs,
    loading: isLoading,
    error: error?.message || null,
    statistics: statisticsData || {
      total: 0,
      draft: 0,
      live: 0,
      paused: 0,
      complete: 0,
      cancelled: 0,
      assigned: 0,
      unassigned: 0,
    },
    pagination,
    currentPage,
    pageSize,
    filterConfigs,
    setSelectedStatus,
    setSelectedAssignment,
    setActiveTab,
    getStatusBadge,
    hasActionRequired,
    handlePageChange,
    handlePageSizeChange,
    goToNextPage,
    goToPreviousPage,
  };
}
