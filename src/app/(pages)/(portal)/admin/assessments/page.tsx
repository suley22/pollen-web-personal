"use client";

import {
  PageContainer,
  PageHeader,
  PrimaryButton,
  Filters,
} from "@/components/design-system";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "../router";
import { useCallback } from "react";
import { useAssessmentsPage } from "./_hooks/useAssessmentsPage";
import { AssessmentsStatisticsCards } from "./_components/assessments-page-cards";
import { AssessmentsList } from "./_components/assessments-page-list";

export default function AdminAssessmentsPage() {
  const router = useRouter();

  const {
    // Data
    assessments,
    pagination,
    statistics,

    // Loading states
    isLoading,
    isLoadingList,
    isLoadingStats,

    // Filter states
    selectedStatus,
    selectedType,
    searchTerm,

    // Handlers
    handleStatusChange,
    handleTypeChange,
    handleSearchChange,
    handleDebouncedSearchChange,
    handlePageChange,
    handlePageSizeChange,
    handleClearFilters,
  } = useAssessmentsPage();

  const onCreate = useCallback(() => {
    router.push(AdminRoutes.assessmentCreate);
  }, [router]);

  // Filter configurations
  const filterConfigs = [
    {
      name: "Type",
      placeholder: "All Types",
      defaultValue: selectedType,
      options: [
        { label: "All Types", value: "all" },
        { label: "Multiple Choice", value: "multiple_choice" },
        { label: "Free Input", value: "free_input" },
        { label: "File Upload", value: "file_upload" },
      ],
      onValueChange: handleTypeChange,
    },
  ];

  return (
    <PageContainer>
      <PageHeader title="Assessments" subtitle="Create and manage assessments">
        <PrimaryButton icon={<Plus />} text="Create" onClick={onCreate} />
      </PageHeader>

      <AssessmentsStatisticsCards
        statistics={statistics}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        isLoading={isLoadingStats}
      />

      <Filters
        onSearchChange={handleDebouncedSearchChange}
        searchPlaceholder="Search assessments..."
        filters={filterConfigs}
      />

      <AssessmentsList
        assessments={assessments}
        loading={isLoadingList}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </PageContainer>
  );
}
