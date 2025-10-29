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
