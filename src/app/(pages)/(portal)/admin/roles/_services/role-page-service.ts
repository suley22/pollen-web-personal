"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { updateUserRoleAction } from "../_actions/user-role-actions";

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
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      // Get the current logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      // Count query
      let countQuery = supabase
        .from("profile")
        .select("*", { count: "exact", head: true })
        .neq("id", user.id); // Exclude current user

      if (filters.searchTerm) {
        countQuery = countQuery.or(
          `first_name.ilike.%${filters.searchTerm}%,last_name.ilike.%${filters.searchTerm}%,email.ilike.%${filters.searchTerm}%`,
        );
      }

      const { count, error: countError } = await countQuery;

      if (countError) {
        throw new Error(countError.message);
      }

      // Data query
      let query = supabase
        .from("profile")
        .select("*")
        .order("created_at", { ascending: false })
        .neq("id", user.id) // Exclude current user
        .range(from, to);

      if (filters.searchTerm) {
        query = query.or(
          `first_name.ilike.%${filters.searchTerm}%,last_name.ilike.%${filters.searchTerm}%,email.ilike.%${filters.searchTerm}%`,
        );
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      const totalPages = Math.ceil((count || 0) / pageSize);

      return {
        users: data || [],
        pagination: {
          currentPage: page,
          pageSize,
          totalItems: count || 0,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          from: from + 1,
          to: Math.min(from + (data?.length || 0), count || 0),
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
