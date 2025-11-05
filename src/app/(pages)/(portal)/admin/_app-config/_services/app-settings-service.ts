"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import {
  createAppSettingAction,
  updateAppSettingAction,
  deleteAppSettingAction,
} from "../_actions/app-settings-actions";

const supabase = createClient();

export interface AppSettingFilters {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export interface AppSettingPaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  from: number;
  to: number;
}

export interface AppSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  is_sensitive: boolean;
  updated_at: string;
  updated_by: string | null;
}

export interface CreateAppSettingInput {
  key: string;
  value: string;
  description?: string;
  is_sensitive?: boolean;
}

export interface UpdateAppSettingInput {
  id: string;
  key?: string;
  value?: string;
  description?: string;
  is_sensitive?: boolean;
}

const appSettingsQueryKey = "app_setting";

// React Query Hooks
export function useAppSettingsList(filters: AppSettingFilters) {
  return useQuery({
    queryKey: [appSettingsQueryKey, "list", filters],
    queryFn: async () => {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 10;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("app_setting")
        .select("*", { count: "exact" })
        .order("key", { ascending: true })
        .range(from, to);

      // Apply search filter if provided
      if (filters.searchTerm && filters.searchTerm.trim() !== "") {
        query = query.or(
          `key.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`
        );
      }

      const { data, error, count } = await query;

      if (error) {
        throw new Error(error.message);
      }

      const totalCount = count || 0;
      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        settings: data || [],
        pagination: {
          currentPage: page,
          pageSize,
          totalItems: totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          from: from + 1,
          to: Math.min(to + 1, totalCount),
        },
      };
    },
  });
}

export function useCreateAppSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateAppSettingInput) => {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      const result = await createAppSettingAction({
        ...input,
        updated_by: user.id,
      });

      if (!result.success) {
        throw new Error(result.error || "Error creating app setting");
      }

      return result.data;
    },
    onSuccess: () => {
      // Invalidate all settings queries to refresh the lists
      queryClient.invalidateQueries({ queryKey: [appSettingsQueryKey] });
    },
    onError: (error) => {
      console.error("Error creating app setting:", error);
    },
  });
}

export function useUpdateAppSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateAppSettingInput) => {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      const result = await updateAppSettingAction({
        ...input,
        updated_by: user.id,
      });

      if (!result.success) {
        throw new Error(result.error || "Error updating app setting");
      }

      return result.data;
    },
    onSuccess: () => {
      // Invalidate all settings queries to refresh the lists
      queryClient.invalidateQueries({ queryKey: [appSettingsQueryKey] });
    },
    onError: (error) => {
      console.error("Error updating app setting:", error);
    },
  });
}

export function useDeleteAppSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const result = await deleteAppSettingAction(id);

      if (!result.success) {
        throw new Error(result.error || "Error deleting app setting");
      }

      return { success: true };
    },
    onSuccess: () => {
      // Invalidate all settings queries to refresh the lists
      queryClient.invalidateQueries({ queryKey: [appSettingsQueryKey] });
    },
    onError: (error) => {
      console.error("Error deleting app setting:", error);
    },
  });
}
