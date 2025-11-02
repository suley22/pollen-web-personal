"use client";

import { useState } from "react";
import {
  useAssessmentsList,
  useAssessmentsStatistics,
} from "../_services/assessments-page-service";

export function useAssessmentsPage() {
  // Filter states
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Build filters object
  const filters = {
    status: selectedStatus === "all" ? undefined : selectedStatus,
    type: selectedType === "all" ? undefined : selectedType,
    searchTerm: debouncedSearchTerm,
    page: currentPage,
    pageSize,
  };

  // Fetch data
  const {
    data: listData,
    isLoading: isLoadingList,
    error: listError,
  } = useAssessmentsList(filters);

  const {
    data: statsData,
    isLoading: isLoadingStats,
    error: statsError,
  } = useAssessmentsStatistics();

  // Handlers
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    // Debouncing will be handled by the parent component
  };

  const handleDebouncedSearchChange = (search: string) => {
    setDebouncedSearchTerm(search);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const handleClearFilters = () => {
    setSelectedStatus("all");
    setSelectedType("all");
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setCurrentPage(1);
  };

  return {
    // Data
    assessments: listData?.assessments || [],
    pagination: listData?.pagination || {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      from: 0,
      to: 0,
    },
    statistics: statsData || {
      total: 0,
      draft: 0,
      live: 0,
      paused: 0,
      archived: 0,
      multiple_choice: 0,
      free_input: 0,
      file_upload: 0,
    },

    // Loading states
    isLoading: isLoadingList || isLoadingStats,
    isLoadingList,
    isLoadingStats,

    // Error states
    error: listError || statsError,
    listError,
    statsError,

    // Filter states
    selectedStatus,
    selectedType,
    searchTerm,
    debouncedSearchTerm,

    // Handlers
    handleStatusChange,
    handleTypeChange,
    handleSearchChange,
    handleDebouncedSearchChange,
    handlePageChange,
    handlePageSizeChange,
    handleClearFilters,
  };
}
