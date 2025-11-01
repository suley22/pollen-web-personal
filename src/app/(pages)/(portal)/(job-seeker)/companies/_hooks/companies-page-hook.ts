"use client";

import { useCompaniesPageData, useCompanyById } from "@/job-seeker/companies/_services/companies-page-service";

// Drop-in replacement keeping the same return shape as before
export function useCompanies(id: string | null = null) {
  const {
    data: pageData,
    isLoading: isPageLoading,
    error: pageError,
  } = useCompaniesPageData();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useCompanyById(id);

  const loading = isPageLoading || (id ? isProfileLoading : false);
  const error = pageError?.message || profileError?.message || null;

  return {
    recommendedCompanies: pageData?.recommended || [],
    allCompanies: pageData?.all || [],
    profile: id ? profileData || null : null,
    loading,
    error,
  } as const;
}