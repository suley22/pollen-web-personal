"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { EmployerProfileHelper } from "@/types/employers-types";

const supabase = createClient();

export const companiesQueryKey = "companies";

// Shared mapping from raw employer row to UI card
const mapAdminCompanyToCardCompany = (company: any) => ({
  id: String(company.id),
  name: company.company_name,
  industry:
    Array.isArray(company.industries) && company.industries.length > 0
      ? company.industries[0]
      : "Not specified",
  rating: company.rating || 0,
  description: company.company_about || "No description available.",
  logo: company.logo_url || "🏢",
  openRoles: company.open_roles_count || 0,
  size: company.company_size || "Not specified",
  location: company.company_location || "Remote",
});

// Hook: fetch both recommended and all companies for the page
export function useCompaniesPageData() {
  return useQuery({
    queryKey: [companiesQueryKey, "page-data"],
    queryFn: async () => {
      const [recommendedRes, allRes] = await Promise.all([
        supabase
          .from("employer_profile")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(2),
        supabase
          .from("employer_profile")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (recommendedRes.error) {
        throw new Error(recommendedRes.error.message);
      }
      if (allRes.error) {
        throw new Error(allRes.error.message);
      }

      const recommended = (recommendedRes.data || []).map(
        mapAdminCompanyToCardCompany,
      );
      const all = (allRes.data || []).map(mapAdminCompanyToCardCompany);

      return { recommended, all } as const;
    },
  });
}

// Hook: fetch a single employer profile by id (for company profile page reuse)
export function useCompanyById(id: string | null) {
  return useQuery({
    enabled: !!id,
    queryKey: [companiesQueryKey, "profile", id],
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
        profile_completeness: EmployerProfileHelper.calculateProfileCompleteness(
          data,
        ),
      };
    },
  });
}

// ===============
// Paginated list
// ===============
export interface CompaniesFilters {
  searchTerm?: string;
  industry?: string; // specific industry label or 'all'
  size?: string; // company_size label or 'all'
  page?: number;
  pageSize?: number;
}

export interface CompaniesPaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  from: number;
  to: number;
}

export function useCompaniesList(filters: CompaniesFilters) {
  return useQuery({
    queryKey: [companiesQueryKey, "list", filters],
    queryFn: async () => {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 12;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      // Count query
      let countQuery = supabase
        .from("employer_profile")
        .select("*", { count: "exact", head: true })
        .filter("deleted_at", "is", null);

      if (filters.searchTerm) {
        countQuery = countQuery.or(
          `company_name.ilike.%${filters.searchTerm}%,company_location.ilike.%${filters.searchTerm}%`,
        );
      }
      if (filters.industry && filters.industry !== "all") {
        // industries is an array; contains works with JSONB arrays
        countQuery = countQuery.contains("industries", [filters.industry]);
      }
      if (filters.size && filters.size !== "all") {
        countQuery = countQuery.eq("company_size", filters.size);
      }

      const { count, error: countError } = await countQuery;
      if (countError) throw new Error(countError.message);

      // Data query
      let dataQuery = supabase
        .from("employer_profile")
        .select("*")
        .order("created_at", { ascending: false })
        .filter("deleted_at", "is", null)
        .range(from, to);

      if (filters.searchTerm) {
        dataQuery = dataQuery.or(
          `company_name.ilike.%${filters.searchTerm}%,company_location.ilike.%${filters.searchTerm}%`,
        );
      }
      if (filters.industry && filters.industry !== "all") {
        dataQuery = dataQuery.contains("industries", [filters.industry]);
      }
      if (filters.size && filters.size !== "all") {
        dataQuery = dataQuery.eq("company_size", filters.size);
      }

      const { data, error } = await dataQuery;
      if (error) throw new Error(error.message);

      const totalPages = Math.ceil((count || 0) / pageSize);
      const companies = (data || []).map(mapAdminCompanyToCardCompany);

      return {
        companies,
        pagination: {
          currentPage: page,
          pageSize,
          totalItems: count || 0,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          from: from + 1,
          to: Math.min(from + companies.length, count || 0),
        } as CompaniesPaginationInfo,
      } as const;
    },
  });
}
