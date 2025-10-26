"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchEmployers,
  fetchEmployerStatistics,
} from "../_services/employers-page-service";
import { EMPLOYERS_QUERY_KEYS } from "../_queries/employers-query-keys";

export function useEmployersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounce search term
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (searchTerm.trim()) {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Build filters for React Query
  const filters = useMemo(
    () => ({
      status: debouncedSearchTerm.trim() ? "all" : selectedStatus,
      searchTerm: debouncedSearchTerm.trim(),
      page: currentPage,
      pageSize: pageSize,
    }),
    [selectedStatus, debouncedSearchTerm, currentPage, pageSize],
  );

  // React Query: Fetch employers list
  const { data, isLoading, error } = useQuery({
    queryKey: EMPLOYERS_QUERY_KEYS.list(filters),
    queryFn: () => fetchEmployers(filters),
  });

  // React Query: Fetch statistics
  const { data: statisticsData } = useQuery({
    queryKey: EMPLOYERS_QUERY_KEYS.statistics,
    queryFn: fetchEmployerStatistics,
  });

  // Pagination functions
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const goToNextPage = useCallback(() => {
    if (data?.pagination?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [data?.pagination?.hasNextPage]);

  const goToPreviousPage = useCallback(() => {
    if (data?.pagination?.hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [data?.pagination?.hasPreviousPage]);

  return {
    selectedStatus,
    searchTerm,
    employers: data?.employers || [],
    statistics: statisticsData || {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
    },
    loading: isLoading,
    error: error?.message || null,
    pagination: data?.pagination || null,
    currentPage,
    pageSize,
    setSelectedStatus,
    setSearchTerm,
    handlePageChange,
    handlePageSizeChange,
    goToNextPage,
    goToPreviousPage,
  };
}
