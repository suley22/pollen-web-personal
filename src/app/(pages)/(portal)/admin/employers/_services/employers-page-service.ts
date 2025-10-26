"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { EmployerProfileHelper } from "@/types/employers-types";
import type { EmployerApprovalStatus } from "@/types/employers-types";
import { EMPLOYER_STATUS } from "@/constants/filters";
import { DateHelper } from "@/lib/helpers/date-helper";
import { getLoggedInUserId } from "@/services/userService";

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

const employersQueryKey = "employers";

// React Query Hooks
export function useEmployersList(filters: EmployerFilters) {
  return useQuery({
    queryKey: [employersQueryKey, "list", filters],
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
        draft:
          data?.filter((e) => e.approval_status === EMPLOYER_STATUS.DRAFT)
            .length || 0,
        live:
          data?.filter((e) => e.approval_status === EMPLOYER_STATUS.LIVE)
            .length || 0,
        hidden:
          data?.filter((e) => e.approval_status === EMPLOYER_STATUS.HIDDEN)
            .length || 0,
      };
    },
  });
}

export function useEmployerById(id: string) {
  return useQuery({
    queryKey: [employersQueryKey, "profile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employer_profile")
        .select("*")
        .eq("id", id)
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
        updated_at: DateHelper.formatDate(data.updated_at),
        created_at: DateHelper.formatDate(data.created_at),
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
      const userId = await getLoggedInUserId();

      const { data, error } = await supabase
        .from("employer_profile")
        .update({
          approval_status: status,
          updated_at: new Date().toISOString(),
          updated_by: userId,
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
        queryKey: [employersQueryKey, "profile", variables.id],
      });
      // Invalidate all employers lists and statistics
      queryClient.invalidateQueries({ queryKey: [employersQueryKey] });
    },
  });
}

export function useDeleteEmployer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const userId = await getLoggedInUserId();

      const { data, error } = await supabase
        .from("employer_profile")
        .update({
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          updated_by: userId,
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
      queryClient.invalidateQueries({ queryKey: [employersQueryKey] });
    },
  });
}

export function useCreateEmployer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const userId = await getLoggedInUserId();

      const transformedData = transformFormDataToDatabase(formData, userId);

      if (!transformedData.company_name?.toString().trim()) {
        throw new Error("Company name is required");
      }

      const { data, error } = await supabase
        .from("employer_profile")
        .insert({
          ...transformedData,
          approval_status: EMPLOYER_STATUS.DRAFT,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: userId,
          updated_by: userId,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message || "Failed to create company profile");
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate all employers queries to refresh the lists and statistics
      queryClient.invalidateQueries({ queryKey: [employersQueryKey] });
    },
  });
}

export function useUpdateEmployer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      const userId = await getLoggedInUserId();

      const transformedData = transformFormDataToDatabase(formData, userId);

      if (!transformedData.company_name?.toString().trim()) {
        throw new Error("Company name is required");
      }

      const { data, error } = await supabase
        .from("employer_profile")
        .update({
          ...transformedData,
          updated_at: new Date().toISOString(),
          updated_by: userId,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message || "Failed to update company profile");
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      // Invalidate the specific profile
      queryClient.invalidateQueries({
        queryKey: [employersQueryKey, "profile", variables.id],
      });
      // Invalidate all employers queries to refresh the lists and statistics
      queryClient.invalidateQueries({ queryKey: [employersQueryKey] });
    },
  });
}

// Helper function to transform FormData to database format
const transformFormDataToDatabase = (formData: FormData, userId: string) => {
  if (!formData || typeof formData.entries !== "function") {
    throw new Error(
      `Expected FormData object, but received: ${typeof formData}`,
    );
  }

  const formCompanyData = Object.fromEntries(formData.entries());

  // Get all industries and remove duplicates
  const industriesArray = formData.getAll("industries") as string[];
  const uniqueIndustries = Array.from(
    new Set(industriesArray.map((i) => i.trim()).filter(Boolean)),
  );

  const accolades = formCompanyData.company_accolades as string;

  // Get previous hiring methods and remove duplicates
  const hiringMethodsArray = formData.getAll(
    "previous_hiring_methods",
  ) as string[];
  const uniqueHiringMethods = Array.from(
    new Set(hiringMethodsArray.map((m) => m.trim()).filter(Boolean)),
  );

  // Parse social_medias JSON
  const socialMedias = formCompanyData.social_medias
    ? JSON.parse(formCompanyData.social_medias as string)
    : [];

  return {
    // Company Information
    company_name: formCompanyData.company_name,
    company_size: formCompanyData.company_size,
    founded_year: formCompanyData.founded_year,
    company_location: formCompanyData.location,
    website_url: formCompanyData.website,
    logo_url: formCompanyData.logo_url,
    industries: uniqueIndustries,

    // About & Culture
    company_about: formCompanyData.company_about,
    work_environment: formCompanyData.work_environment,
    company_loves: formCompanyData.company_loves,
    company_entry_level: formCompanyData.entry_level_support,

    // Accolades
    company_accolades: accolades
      ? JSON.parse(accolades).map((item: any) => item.name || item)
      : [],

    // Contact Information
    contact_name: formCompanyData.contact_name,
    job_title: formCompanyData.job_title,
    contact_email: formCompanyData.contact_email,
    contact_phone: formCompanyData.contact_phone,

    // Social Media (JSONB)
    social_medias: socialMedias,

    // Internal Pollen Data
    how_did_you_hear_about_us: formCompanyData.how_did_you_hear_about_us,
    more_info: formCompanyData.more_info,
    hiring_frequency: formCompanyData.hiring_frequency,
    additional_notes: formCompanyData.additional_notes,
    previous_hiring_methods: uniqueHiringMethods,

    // System Fields
    user_id: userId,
  };
};
