"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  useUsersList,
  useUpdateUserRole,
  useDeleteUser,
} from "../_services/role-page-service";

export function useRolesPage(debouncedSearchTerm: string) {
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

  // React Query: Fetch users list
  const { data, isLoading, error } = useUsersList(fetchFilters);
  const users = data?.users || [];
  const pagination = data?.pagination || null;

  // React Query: Update user role mutation
  const updateUserRoleMutation = useUpdateUserRole();
  
  // React Query: Delete user mutation
  const deleteUserMutation = useDeleteUser();

  // Pagination functions
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  // Role change functions
  const handleRoleChange = useCallback(
    (userId: string, newRole: string) => {
      return updateUserRoleMutation.mutateAsync({ userId, newRole });
    },
    [updateUserRoleMutation],
  );

  // Delete user function
  const handleDeleteUser = useCallback(
    (userId: string) => {
      return deleteUserMutation.mutateAsync({ userId });
    },
    [deleteUserMutation],
  );

  return {
    users: users || [],
    loading: isLoading,
    error: error?.message || null,
    pagination: pagination || null,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    handleRoleChange,
    isUpdatingRole: updateUserRoleMutation.isPending,
    handleDeleteUser,
    isDeletingUser: deleteUserMutation.isPending,
  };
}