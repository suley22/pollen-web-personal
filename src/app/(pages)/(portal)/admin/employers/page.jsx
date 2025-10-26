"use client";

import { Filters } from "@/admin/employers/_components/filters";
import { StatisticsCards } from "@/admin/employers/_components/cards";
import { List } from "@/admin/employers/_components/list";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "@/admin/router";
import { PageHeader } from "@/components/design-system/page-header";
import { PrimaryButton } from "@/components/design-system/primary-button";
import { PageContainer } from "@/components/design-system";
import { useEmployersPage } from "./_hooks/employers-page-hook";
import { useCallback, useState } from "react";

export default function AdminEmployers() {
  const router = useRouter();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const {
    statistics,
    selectedStatus,
    setSelectedStatus,
    loading,
    employers,
    pagination,
    handlePageChange,
    handlePageSizeChange,
  } = useEmployersPage(debouncedSearchTerm);

  const onCreate = useCallback(() => {
    router.push(AdminRoutes.employersCreate);
  }, [router]);

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
        onSearchChange={setDebouncedSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <div className="flex flex-col gap-4">
        <List
          employers={employers}
          loading={loading}
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </div>
    </PageContainer>
  );
}
