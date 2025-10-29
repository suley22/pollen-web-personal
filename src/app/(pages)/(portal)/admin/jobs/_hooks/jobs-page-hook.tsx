"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  useJobsList,
  useJobsStatistics,
  useAdminsList,
} from "../_services/jobs-page-service";
import { JobStatusBadge } from "@/components/design-system";
import { JOB_STATUS_OPTIONS } from "@/constants/filters";
import type { FilterOption } from "@/types/filters";

export function useJobManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAdmin, setSelectedAdmin] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when search term or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedAdmin]);

  // Fetch admins list
  const { data: admins = [] } = useAdminsList();

  // Create admin options for the filter
  const adminOptions: FilterOption[] = useMemo(() => {
    const options: FilterOption[] = [{ label: "All Admins", value: "all" }];

    admins.forEach((admin) => {
      options.push({
        label: `${admin.first_name} ${admin.last_name}`,
        value: admin.id,
      });
    });

    return options;
  }, [admins]);

  // Filter configurations for Filters component
  const filterConfigs = useMemo(
    () => [
      {
        name: "status",
        placeholder: "Filter by status",
        defaultValue: selectedStatus,
        options: JOB_STATUS_OPTIONS,
        onValueChange: setSelectedStatus,
      },
      {
        name: "admin",
        placeholder: "Filter by admin",
        defaultValue: selectedAdmin,
        options: adminOptions,
        onValueChange: setSelectedAdmin,
      },
    ],
    [selectedStatus, selectedAdmin, adminOptions],
  );

  // Build filters for React Query
  const fetchFilters = useMemo(
    () => ({
      status: selectedStatus,
      assignment: selectedAdmin !== "all" ? selectedAdmin : undefined,
      searchTerm: searchTerm.trim(),
      page: currentPage,
      pageSize: pageSize,
    }),
    [selectedStatus, selectedAdmin, searchTerm, currentPage, pageSize],
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
      searchTerm: searchTerm.trim(),
    }),
    [searchTerm],
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
    selectedAdmin,
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
    setSelectedAdmin,
    setActiveTab,
    getStatusBadge,
    hasActionRequired,
    handlePageChange,
    handlePageSizeChange,
    setSearchTerm,
  };
}
