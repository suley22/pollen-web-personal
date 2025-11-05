"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  useAppSettingsList,
  useCreateAppSetting,
  useUpdateAppSetting,
  useDeleteAppSetting,
  CreateAppSettingInput,
  UpdateAppSettingInput,
} from "../_services/app-settings-service";

export function useAppSettingsPage(debouncedSearchTerm: string) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  // Build filters for React Query
  const fetchFilters = useMemo(
    () => ({
      searchTerm: debouncedSearchTerm.trim(),
      page: currentPage,
      pageSize: pageSize,
    }),
    [debouncedSearchTerm, currentPage, pageSize],
  );

  // React Query: Fetch settings list
  const { data, isLoading, error } = useAppSettingsList(fetchFilters);
  const settings = data?.settings || [];
  const pagination = data?.pagination || null;

  // React Query: Create setting mutation
  const createSettingMutation = useCreateAppSetting();

  // React Query: Update setting mutation
  const updateSettingMutation = useUpdateAppSetting();

  // React Query: Delete setting mutation
  const deleteSettingMutation = useDeleteAppSetting();

  // Pagination functions
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  // Create setting function
  const handleCreateSetting = useCallback(
    (input: CreateAppSettingInput) => {
      return createSettingMutation.mutateAsync(input);
    },
    [createSettingMutation],
  );

  // Update setting function
  const handleUpdateSetting = useCallback(
    (input: UpdateAppSettingInput) => {
      return updateSettingMutation.mutateAsync(input);
    },
    [updateSettingMutation],
  );

  // Delete setting function
  const handleDeleteSetting = useCallback(
    (id: string) => {
      return deleteSettingMutation.mutateAsync({ id });
    },
    [deleteSettingMutation],
  );

  return {
    settings: settings || [],
    loading: isLoading,
    error: error?.message || null,
    pagination: pagination || null,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    handleCreateSetting,
    isCreatingSetting: createSettingMutation.isPending,
    handleUpdateSetting,
    isUpdatingSetting: updateSettingMutation.isPending,
    handleDeleteSetting,
    isDeletingSetting: deleteSettingMutation.isPending,
  };
}
