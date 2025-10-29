"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { updateUserRoleAction, deleteUserAction } from "../_actions/user-role-actions";

const supabase = createClient();

export interface UserFilters {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export interface UserPaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  from: number;
  to: number;
}

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
}

const usersQueryKey = "profile";

// React Query Hooks
export function useUsersList(filters: UserFilters) {
  return useQuery({
    queryKey: [usersQueryKey, "list", filters],
    queryFn: async () => {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 10;

      // Get the current logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      // Use RPC function for search
      const { data, error } = await supabase.rpc('search_users', {
        search_term: filters.searchTerm || null,
        excluded_user_id: user.id,
        page_number: page,
        page_size: pageSize,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Get total count from first row (all rows have same total_count)
      const totalCount = data && data.length > 0 ? data[0].total_count : 0;
      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        users: data || [],
        pagination: {
          currentPage: page,
          pageSize,
          totalItems: totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          from: (page - 1) * pageSize + 1,
          to: Math.min((page - 1) * pageSize + (data?.length || 0), totalCount),
        },
      };
    },
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      newRole,
    }: {
      userId: string;
      newRole: string;
    }) => {
      // Update role in the profile table
      const { data, error: profileError } = await supabase
        .from("profile")
        .update({ role: newRole })
        .eq("id", userId)
        .select()
        .single();

      if (profileError) {
        throw new Error(`Error updating profile: ${profileError.message}`);
      }

      // Update user metadata using server action
      const result = await updateUserRoleAction(userId, newRole);

      if (!result.success) {
        throw new Error(result.error || "Error updating user metadata");
      }

      return { profile: data, user: result.data };
    },
    onSuccess: () => {
      // Invalidate all users queries to refresh the lists
      queryClient.invalidateQueries({ queryKey: [usersQueryKey] });
    },
    onError: (error) => {
      console.error("Error updating user role:", error);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      // Delete from profile table
      const { error: profileError } = await supabase
        .from("profile")
        .delete()
        .eq("id", userId);

      if (profileError) {
        throw new Error(`Error deleting profile: ${profileError.message}`);
      }

      const result = await deleteUserAction(userId);

      if (!result.success) {
        throw new Error(result.error || "Error updating user metadata");
      }

      // Delete from auth using admin client would require server action
      // For now, we'll just delete from profile table
      return { success: true };
    },
    onSuccess: () => {
      // Invalidate all users queries to refresh the lists
      queryClient.invalidateQueries({ queryKey: [usersQueryKey] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
}
