"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useJobManagement } from "../_hooks/jobs-page-hook";
import {
  Filters,
  FiltersSkeleton,
  SecondaryButton,
} from "@/components/design-system";
import { JobListSection } from "../_components/jobs-page-list-section";
import { AdminRoutes } from "../../router";
import { PageHeader } from "@/components/design-system/page-header";
import { PrimaryButton, PageContainer } from "@/components/design-system";
import { StatisticsCards } from "../_components/jobs-page-cards";

export default function JobsPageView() {
  const router = useRouter();

  const {
    jobs,
    loading,
    pagination,
    filterConfigs,
    handlePageChange,
    handlePageSizeChange,
    setSearchTerm,
    statistics,
    selectedStatus,
    setSelectedStatus,
  } = useJobManagement();

  return (
    <PageContainer>
      <PageHeader title="Jobs" subtitle="Manage your job listings">
        <PrimaryButton
          icon={<Plus />}
          text="Create"
          onClick={() => router.push(AdminRoutes.jobsCreate)}
        />
        <SecondaryButton
          icon={<Plus />}
          text="Create External Job"
          onClick={() => router.push(AdminRoutes.jobsCreateExternal)}
        />
      </PageHeader>

      <StatisticsCards
        statistics={statistics}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        loading={loading}
      />

      {/* Main Content */}
      <div className="flex flex-col w-full gap-6">
        {loading ? (
          <FiltersSkeleton />
        ) : (
          <Filters
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search jobs..."
            filters={filterConfigs}
          />
        )}

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
