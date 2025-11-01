"use client";

import { useMemo, useState } from "react";
import { INDUSTRY_OPTIONS } from "@/lib/configs/constants/industries";
import { COMPANY_SIZE_OPTIONS } from "@/lib/configs/constants/company-size";
import { useCompanies } from "@/job-seeker/companies/_hooks/companies-page-hook";
import type { FilterConfig } from "@/types/filters";

export function useAllCompaniesFilters() {
  const { allCompanies, loading } = useCompanies();

  // UI filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [industry, setIndustry] = useState("all");
  const [size, setSize] = useState("all");

  const industryOptions = useMemo(() => ["all", ...INDUSTRY_OPTIONS], []);
  const sizeOptions = useMemo(() => ["all", ...COMPANY_SIZE_OPTIONS], []);

  // Assemble filter configs for the design-system <Filters /> component
  const filterConfigs: FilterConfig[] = useMemo(
    () => [
      {
        name: "industry",
        placeholder: "Industry",
        defaultValue: industry,
        options: industryOptions.map((v) => ({
          value: v,
          label: v === "all" ? "All Industries" : v,
        })),
        onValueChange: setIndustry,
      },
      {
        name: "size",
        placeholder: "Company Size",
        defaultValue: size,
        options: sizeOptions.map((v) => ({
          value: v,
          label: v === "all" ? "All Sizes" : v,
        })),
        onValueChange: setSize,
      },
    ],
    [industry, industryOptions, size, sizeOptions],
  );

  // Apply filters client-side over allCompanies
  const filteredCompanies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return (allCompanies || []).filter((c: any) => {
      const matchesSearch = term
        ? [c.name, c.industry, c.location]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(term))
        : true;

      const matchesIndustry = industry === "all" ? true : c.industry === industry;
      const matchesSize = size === "all" ? true : c.size === size;

      return matchesSearch && matchesIndustry && matchesSize;
    });
  }, [allCompanies, searchTerm, industry, size]);

  return {
    loading,
    filteredCompanies,
    filterConfigs,
    onSearchChange: setSearchTerm,
  } as const;
}
