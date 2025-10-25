"use client";

import { Filters } from "@/admin/employers/_components/filters";
import { StatisticsCards } from "@/admin/employers/_components/cards";
import { ResultsCount } from "@/admin/employers/_components/results-count";
import { List } from "@/admin/employers/_components/list";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { AdminRoutes } from "@/admin/router";
import { PageHeader } from "@/components/design-system/page-header";
import { PrimaryButton } from "@/components/design-system/primary-button";
import { PageContainer } from "@/components/design-system";
import { useEmployersPage } from "./_hooks/employers-page-hook";

export default function AdminEmployers() {
  const router = useRouter();

  const {
    statistics,
    selectedStatus,
    setSelectedStatus,
    loading,
    searchTerm,
    setSearchTerm,
    employers,
    pagination,
    handlePageChange,
    handlePageSizeChange,
  } = useEmployersPage();

  const onCreate = () => {
    startTransition(() => {
      router.push(AdminRoutes.employersCreate);
    });
  };

  return (
    <PageContainer>
      <PageHeader
        title="Employers"
        subtitle="Manage and review employer company profiles"
      >
        <PrimaryButton icon={<Plus />} text="Create" onClick={onCreate} />
      </PageHeader>

      <StatisticsCards
        statistics={statistics}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        loading={loading}
      />
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <div className="flex flex-col gap-4">
        <ResultsCount
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />

        <List employers={employers} loading={loading} />

        <ResultsCount
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </div>
    </PageContainer>
  );
}
