"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { getLoggedInUserId } from "@/services/userService";
import {
  Assessment,
  AssessmentQuestion,
  AssessmentCategory,
  CreateAssessmentInput,
  AssessmentType,
  AssessmentStatus,
} from "@/types/assessment-types";

const supabase = createClient();
const assessmentsQueryKey = "assessments";

export interface AssessmentFilters {
  status?: string;
  type?: string;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export interface AssessmentPaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  from: number;
  to: number;
}

// Re-export types for convenience
export type {
  Assessment,
  AssessmentQuestion,
  AssessmentCategory,
  CreateAssessmentInput,
};

// React Query Hooks
export function useAssessmentsList(filters: AssessmentFilters) {
  return useQuery({
    queryKey: [assessmentsQueryKey, "list", filters],
    queryFn: async () => {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 10;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      // Count query
      let countQuery = supabase
        .from("assessments")
        .select("*", { count: "exact", head: true })
        .filter("deleted_at", "is", null);

      if (filters.status && filters.status !== "all") {
        countQuery = countQuery.eq("status", filters.status);
      }

      if (filters.type && filters.type !== "all") {
        countQuery = countQuery.eq("type", filters.type);
      }

      if (filters.searchTerm) {
        countQuery = countQuery.or(
          `title.ilike.%${filters.searchTerm}%,subtitle.ilike.%${filters.searchTerm}%,internal_pollen_title.ilike.%${filters.searchTerm}%`,
        );
      }

      const { count, error: countError } = await countQuery;

      if (countError) {
        throw new Error(countError.message);
      }

      // Data query
      let query = supabase
        .from("assessments")
        .select("*")
        .order("created_at", { ascending: false })
        .filter("deleted_at", "is", null)
        .range(from, to);

      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      if (filters.type && filters.type !== "all") {
        query = query.eq("type", filters.type);
      }

      if (filters.searchTerm) {
        query = query.or(
          `title.ilike.%${filters.searchTerm}%,subtitle.ilike.%${filters.searchTerm}%,internal_pollen_title.ilike.%${filters.searchTerm}%`,
        );
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      const totalPages = Math.ceil((count || 0) / pageSize);

      // Get user information from profile table
      const userIds = [
        ...new Set(
          data
            ?.map((a) => [a.user_id, a.updated_by])
            .flat()
            .filter(Boolean) || [],
        ),
      ];

      let usersMap: Record<
        string,
        {
          email: string;
          full_name: string;
          first_name: string;
          last_name: string;
        }
      > = {};

      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profile")
          .select("id, first_name, last_name, email")
          .in("id", userIds);

        if (profilesData && profilesData.length > 0) {
          usersMap = Object.fromEntries(
            profilesData.map((p) => [
              p.id,
              {
                email: p.email,
                full_name:
                  `${p.first_name || ""} ${p.last_name || ""}`.trim() ||
                  p.email,
                first_name: p.first_name,
                last_name: p.last_name,
              },
            ]),
          );
        }
      }

      const assessmentsWithUserInfo =
        data?.map((assessment) => ({
          ...assessment,
          created_by: usersMap[assessment.user_id as string] || null,
          updated_by_user: usersMap[assessment.updated_by as string] || null,
        })) || [];

      return {
        assessments: assessmentsWithUserInfo,
        pagination: {
          currentPage: page,
          pageSize,
          totalItems: count || 0,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          from: from + 1,
          to: Math.min(to + 1, count || 0),
        },
      };
    },
  });
}

export function useAssessmentById(id: string) {
  return useQuery({
    queryKey: [assessmentsQueryKey, "detail", id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("assessments")
        .select("*")
        .eq("id", id)
        .filter("deleted_at", "is", null)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Get both creator and updater information in a single query
      let createdBy = null;
      let updatedBy = null;

      const userIds = [data.user_id, data.updated_by].filter(Boolean);

      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profile")
          .select("id, first_name, last_name, email")
          .in("id", userIds);

        if (profilesData && profilesData.length > 0) {
          // Map creator
          const creatorProfile = profilesData.find(
            (p) => p.id === data.user_id,
          );
          if (creatorProfile) {
            createdBy = {
              id: creatorProfile.id,
              email: creatorProfile.email,
              full_name:
                `${creatorProfile.first_name || ""} ${creatorProfile.last_name || ""}`.trim() ||
                creatorProfile.email,
              first_name: creatorProfile.first_name,
              last_name: creatorProfile.last_name,
            };
          }

          // Map updater
          const updaterProfile = profilesData.find(
            (p) => p.id === data.updated_by,
          );
          if (updaterProfile) {
            updatedBy = {
              id: updaterProfile.id,
              email: updaterProfile.email,
              full_name:
                `${updaterProfile.first_name || ""} ${updaterProfile.last_name || ""}`.trim() ||
                updaterProfile.email,
              first_name: updaterProfile.first_name,
              last_name: updaterProfile.last_name,
            };
          }
        }
      }

      return {
        ...data,
        created_by: createdBy,
        updated_by: updatedBy,
      };
    },
    enabled: !!id,
  });
}

export function useAssessmentsStatistics(filters?: AssessmentFilters) {
  return useQuery({
    queryKey: [assessmentsQueryKey, "statistics", filters],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assessments")
        .select("status, type")
        .filter("deleted_at", "is", null);

      if (error) {
        throw new Error(error.message);
      }

      const assessments = data || [];

      const stats = {
        total: assessments.length,
        draft: assessments.filter((a) => a.status === "draft").length,
        live: assessments.filter((a) => a.status === "live").length,
        paused: assessments.filter((a) => a.status === "paused").length,
        archived: assessments.filter((a) => a.status === "archived").length,
        multiple_choice: assessments.filter((a) => a.type === "multiple_choice")
          .length,
        free_input: assessments.filter((a) => a.type === "free_input").length,
        file_upload: assessments.filter((a) => a.type === "file_upload").length,
      };

      return stats;
    },
  });
}

export function useCreateAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateAssessmentInput) => {
      const userId = await getLoggedInUserId();

      const { data, error } = await supabase
        .from("assessments")
        .insert({
          internal_pollen_title: input.internal_pollen_title || null,
          title: input.title,
          subtitle: input.subtitle || null,
          type: input.type,
          status: "draft",
          estimated_duration: input.estimated_duration || null,
          instructions_title: input.instructions_title || null,
          instructions_description: input.instructions_description || null,
          questions: input.questions || [],
          categories: input.categories || [],
          questions_count: input.questions?.length || 0,
          total_submissions: 0,
          user_id: userId,
          updated_by: userId,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message || "Failed to create assessment");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [assessmentsQueryKey] });
    },
  });
}

export function useUpdateAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: Partial<CreateAssessmentInput>;
    }) => {
      const userId = await getLoggedInUserId();

      const updateData: any = {
        updated_at: new Date().toISOString(),
        updated_by: userId,
      };

      if (input.internal_pollen_title !== undefined) {
        updateData.internal_pollen_title = input.internal_pollen_title || null;
      }
      if (input.title !== undefined) updateData.title = input.title;
      if (input.subtitle !== undefined) {
        updateData.subtitle = input.subtitle || null;
      }
      if (input.type !== undefined) updateData.type = input.type;
      if (input.estimated_duration !== undefined) {
        updateData.estimated_duration = input.estimated_duration || null;
      }
      if (input.instructions_title !== undefined) {
        updateData.instructions_title = input.instructions_title || null;
      }
      if (input.instructions_description !== undefined) {
        updateData.instructions_description =
          input.instructions_description || null;
      }
      if (input.questions !== undefined) {
        updateData.questions = input.questions;
        updateData.questions_count = input.questions.length;
      }
      if (input.categories !== undefined) {
        updateData.categories = input.categories;
      }

      const { data, error } = await supabase
        .from("assessments")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message || "Failed to update assessment");
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [assessmentsQueryKey, "detail", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: [assessmentsQueryKey] });
    },
  });
}

export function useDeleteAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("assessments")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id);

      if (error) {
        throw new Error(error.message || "Failed to delete assessment");
      }

      return { id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [assessmentsQueryKey] });
    },
  });
}
