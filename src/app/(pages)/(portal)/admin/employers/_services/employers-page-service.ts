"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { EmployerProfileHelper } from "@/types/employers-types";
import type { EmployerApprovalStatus } from "@/types/employers-types";

const supabase = createClient();

export interface EmployerFilters {
  status?: string;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export interface EmployerPaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  from: number;
  to: number;
}

// React Query Hooks
export function useEmployersList(filters: EmployerFilters) {
  return useQuery({
    queryKey: ["employers", "list", filters],
    queryFn: async () => {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 10;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      // Count query
      let countQuery = supabase
        .from("employer_profile")
        .select("*", { count: "exact", head: true })
        .filter("deleted_at", "is", null);

      if (filters.status && filters.status !== "all") {
        countQuery = countQuery.eq("approval_status", filters.status);
      }

      if (filters.searchTerm) {
        countQuery = countQuery.or(
          `company_name.ilike.%${filters.searchTerm}%,company_location.ilike.%${filters.searchTerm}%`,
        );
      }

      const { count, error: countError } = await countQuery;

      if (countError) {
        throw new Error(countError.message);
      }

      // Data query
      let query = supabase
        .from("employer_profile")
        .select("*")
        .order("created_at", { ascending: false })
        .filter("deleted_at", "is", null)
        .range(from, to);

      if (filters.status && filters.status !== "all") {
        query = query.eq("approval_status", filters.status);
      }

      if (filters.searchTerm) {
        query = query.or(
          `company_name.ilike.%${filters.searchTerm}%,company_location.ilike.%${filters.searchTerm}%`,
        );
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      const totalPages = Math.ceil((count || 0) / pageSize);

      const employersWithCompleteness =
        data?.map((employer) => ({
          ...employer,
          profile_completeness:
            EmployerProfileHelper.calculateProfileCompleteness(employer),
        })) || [];

      return {
        employers: employersWithCompleteness,
        pagination: {
          currentPage: page,
          pageSize,
          totalItems: count || 0,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          from: from + 1,
          to: Math.min(from + data.length, count || 0),
        },
      };
    },
  });
}

export function useEmployersStatistics(filters?: EmployerFilters) {
  return useQuery({
    queryKey: ["employers", "statistics", filters],
    queryFn: async () => {
      let query = supabase
        .from("employer_profile")
        .select("approval_status")
        .filter("deleted_at", "is", null);

      // Apply filters if provided
      if (filters?.status && filters.status !== "all") {
        query = query.eq("approval_status", filters.status);
      }

      if (filters?.searchTerm) {
        query = query.or(
          `company_name.ilike.%${filters.searchTerm}%,company_location.ilike.%${filters.searchTerm}%`,
        );
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return {
        total: data?.length || 0,
        approved:
          data?.filter((e) => e.approval_status === "approved").length || 0,
        pending:
          data?.filter((e) => e.approval_status === "pending").length || 0,
        rejected:
          data?.filter((e) => e.approval_status === "rejected").length || 0,
      };
    },
  });
}

export function useEmployerById(id: string) {
  return useQuery({
    queryKey: ["employers", "profile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employer_profile")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        ...data,
        profile_completeness:
          EmployerProfileHelper.calculateProfileCompleteness(data),
      };
    },
    enabled: !!id,
  });
}

export function useUpdateEmployerStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: EmployerApprovalStatus;
    }) => {
      const { data, error } = await supabase
        .from("employer_profile")
        .update({
          approval_status: status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      // Invalidate the specific profile
      queryClient.invalidateQueries({
        queryKey: ["employers", "profile", variables.id],
      });
      // Invalidate all employers lists and statistics
      queryClient.invalidateQueries({ queryKey: ["employers"] });
    },
  });
}

export function useDeleteEmployer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("employer_profile")
        .update({
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate all employers queries to refresh the lists and statistics
      queryClient.invalidateQueries({ queryKey: ["employers"] });
    },
  });
}
