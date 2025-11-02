"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useCalendlyEvents } from "../_services/calendly-service";

export function useCalendlyEventsPage(debouncedSearchTerm: string) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState("active");

  // Reset page when search term or status changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, statusFilter]);

  // Build filters for React Query
  const fetchFilters = useMemo(
    () => ({
      searchTerm: debouncedSearchTerm.trim(),
      status: statusFilter,
      page: currentPage,
      pageSize: pageSize,
    }),
    [debouncedSearchTerm, statusFilter, currentPage, pageSize],
  );

  // React Query: Fetch events list
  const { data, isLoading, error, refetch } = useCalendlyEvents(fetchFilters);
  const events = data?.events || [];
  const pagination = data?.pagination || null;

  // Pagination functions
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  // Status filter function
  const handleStatusChange = useCallback((status: string) => {
    setStatusFilter(status);
  }, []);

  // Refresh events
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    events: events || [],
    loading: isLoading,
    error: error?.message || null,
    pagination: pagination || null,
    currentPage,
    pageSize,
    statusFilter,
    handlePageChange,
    handlePageSizeChange,
    handleStatusChange,
    handleRefresh,
  };
}
