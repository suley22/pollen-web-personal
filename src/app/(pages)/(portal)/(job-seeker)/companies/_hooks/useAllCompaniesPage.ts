"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { INDUSTRY_OPTIONS } from "@/lib/configs/constants/industries";
import { COMPANY_SIZE_OPTIONS } from "@/lib/configs/constants/company-size";
import { useCompaniesList } from "@/job-seeker/companies/_services/companies-page-service";
import type { FilterConfig } from "@/types/filters";

export function useAllCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [industry, setIndustry] = useState("all");
  const [size, setSize] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, industry, size]);

  const fetchFilters = useMemo(
    () => ({
      searchTerm: searchTerm.trim(),
      industry,
      size,
      page: currentPage,
      pageSize,
    }),
    [searchTerm, industry, size, currentPage, pageSize],
  );

  const { data, isLoading, error } = useCompaniesList(fetchFilters);
  const companies = data?.companies || [];
  const pagination = data?.pagination || null;

  // Build filter configs for the design-system Filters
  const filterConfigs: FilterConfig[] = useMemo(
    () => [
      {
        name: "industry",
        placeholder: "Industry",
        defaultValue: industry,
        options: ["all", ...INDUSTRY_OPTIONS].map((v) => ({
          value: v,
          label: v === "all" ? "All Industries" : v,
        })),
        onValueChange: setIndustry,
      },
      {
        name: "size",
        placeholder: "Company Size",
        defaultValue: size,
        options: ["all", ...COMPANY_SIZE_OPTIONS].map((v) => ({
          value: v,
          label: v === "all" ? "All Sizes" : v,
        })),
        onValueChange: setSize,
      },
    ],
    [industry, size],
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  return {
    companies,
    loading: isLoading,
    error: error?.message || null,
    pagination,
    filterConfigs,
    onSearchChange: setSearchTerm,
    handlePageChange,
    handlePageSizeChange,
  } as const;
}
