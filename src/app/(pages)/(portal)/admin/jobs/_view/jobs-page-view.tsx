"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useJobManagement } from "../_hooks/jobs-page-hook";
import { Filters } from "@/components/design-system";
import JobListSection from "../_components/JobListSection";
import { AdminRoutes } from "../../router";
import { PageHeader } from "@/components/design-system/page-header";
import { PrimaryButton, PageContainer } from "@/components/design-system";

export default function JobsPageView() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    jobs,
    loading,

    pagination,
    filterConfigs,
    handlePageChange,
    handlePageSizeChange,
  } = useJobManagement(debouncedSearchTerm);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <PageContainer>
      <PageHeader title="Jobs" subtitle="Manage your job listings">
        <PrimaryButton
          icon={<Plus />}
          text="Create"
          onClick={() => router.push(AdminRoutes.jobsCreate)}
        />
      </PageHeader>

      {/* Main Content */}
      <div className="flex flex-col w-full gap-4">
        <Filters
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search jobs..."
          filters={filterConfigs}
        />

        <JobListSection
          jobs={jobs}
          isLoading={loading}
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </div>
    </PageContainer>
  );
}
