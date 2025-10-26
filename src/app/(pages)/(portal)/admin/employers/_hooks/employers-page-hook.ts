"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchEmployers,
  fetchEmployerStatistics,
  EmployerFilters,
} from "../_services/employers-page-service";
import { EMPLOYERS_QUERY_KEYS as QueryKeys } from "@/employers/_queries/employers-query-keys";

export function useEmployersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filters para la query
  const filters: EmployerFilters = {
    status: searchTerm.trim() ? "all" : selectedStatus,
    searchTerm: searchTerm.trim(),
    page: currentPage,
    pageSize: pageSize,
  };

  // Query para employers list
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: QueryKeys.list(filters),
    queryFn: () => fetchEmployers(filters),
  });

  // Query para statistics
  const { data: statistics } = useQuery({
    queryKey: QueryKeys.statistics,
    queryFn: fetchEmployerStatistics,
    initialData: {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
    },
  });

  const employers = data?.employers || [];
  const pagination = data?.pagination || null;

  // Handlers
  const handleStatusChange = useCallback((status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
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

  return {
    selectedStatus,
    searchTerm,
    employers,
    statistics,
    loading,
    error: error?.message || null,
    pagination,
    currentPage,
    pageSize,
    handleStatusChange,
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
    goToNextPage,
    goToPreviousPage,
  };
}
