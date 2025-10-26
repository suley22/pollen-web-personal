"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  useEmployersList,
  useEmployersStatistics,
} from "../_services/employers-page-service";

import { EMPLOYER_STATUS_OPTIONS } from "@/constants/filters";

export function useEmployersPage(debouncedSearchTerm: string) {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when search term or status changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedStatus]);

  // Build filters for React Query - combines search term AND status
  const fetchFilters = useMemo(
    () => ({
      status: selectedStatus, // Use selected status from cards or dropdown
      searchTerm: debouncedSearchTerm.trim(),
      page: currentPage,
      pageSize: pageSize,
    }),
    [selectedStatus, debouncedSearchTerm, currentPage, pageSize],
  );

  // Filter configurations for Filters component
  const filterOptionsConfigs = useMemo(
    () => [
      {
        name: "status",
        placeholder: "Select status",
        defaultValue: selectedStatus,
        options: EMPLOYER_STATUS_OPTIONS,
        onValueChange: setSelectedStatus,
      },
    ],
    [selectedStatus],
  );

  // React Query: Fetch employers list
  const { data, isLoading, error } = useEmployersList(fetchFilters);

  const employers = data?.employers || [];
  const pagination = data?.pagination || null;

  // React Query: Fetch statistics - only filter by search term, NOT by status
  const statisticsFilters = useMemo(
    () => ({
      searchTerm: debouncedSearchTerm.trim(),
    }),
    [debouncedSearchTerm],
  );

  const { data: statisticsData } = useEmployersStatistics(statisticsFilters);

  // Pagination functions
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  return {
    selectedStatus,
    employers: employers || [],
    statistics: statisticsData || {
      total: 0,
      draft: 0,
      live: 0,
      hidden: 0,
    },
    loading: isLoading,
    error: error?.message || null,
    pagination: pagination || null,
    currentPage,
    pageSize,
    filterConfigs: filterOptionsConfigs,
    setSelectedStatus,
    handlePageChange,
    handlePageSizeChange,
  };
}
