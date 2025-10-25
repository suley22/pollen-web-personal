"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchEmployers,
  fetchEmployerById,
  fetchEmployerStatistics,
  EmployerPaginationInfo,
} from "@/employers/_services/employers-service";

export function useEmployersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [employers, setEmployers] = useState([]);

  const [statistics, setStatistics] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState<EmployerPaginationInfo | null>(
    null,
  );

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

  // Load employers when filters change
  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const statusToUse = debouncedSearchTerm.trim() ? "all" : selectedStatus;

        const result = await fetchEmployers({
          status: statusToUse,
          searchTerm: debouncedSearchTerm.trim(),
          page: currentPage,
          pageSize: pageSize,
        });

        if (cancelled) return;

        if (result.success) {
          setEmployers(result.data || []);
          setPagination(result.pagination || null);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError("Failed to load employers: " + err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [selectedStatus, debouncedSearchTerm, currentPage, pageSize]);

  // Load statistics on mount
  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      const statsResult = await fetchEmployerStatistics();

      if (!cancelled && statsResult.success && statsResult.data) {
        setStatistics(statsResult.data);
      }
    };

    loadStats();

    return () => {
      cancelled = true;
    };
  }, []); // Pagination functions
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
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

  const getEmployerById = useCallback(async (id) => {
    return await fetchEmployerById(id);
  }, []);

  return {
    selectedStatus,
    searchTerm,
    employers,
    statistics,
    loading,
    error,
    pagination,
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
