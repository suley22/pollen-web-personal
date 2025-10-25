"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchEmployerById } from "@/employers/_services/employers-service";
import { useEmployers, useEmployerStatistics } from "./use-employers-query";

export function useEmployersPageWithQuery() {
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

  // Use React Query hooks
  const { data, isLoading, error } = useEmployers(filters);
  const { data: statistics } = useEmployerStatistics();

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

  const getEmployerById = useCallback(async (id: string) => {
    return await fetchEmployerById(id);
  }, []);

  return {
    selectedStatus,
    searchTerm,
    employers: data?.employers || [],
    statistics: statistics || {
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
    getEmployerById,
    handlePageChange,
    handlePageSizeChange,
    goToNextPage,
    goToPreviousPage,
  };
}
