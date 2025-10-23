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
import { useEmployers } from "./_hooks/useEmployers";

export default function AdminEmployers() {
  const router = useRouter();

  const { statistics, 
          selectedStatus, 
          setSelectedStatus, 
          loading,
          searchTerm, 
          setSearchTerm,
          employers,
          getStatusBadge
        } = useEmployers();

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
        <div className="flex flex-col gap-2">
          <ResultsCount 
            employers={employers} 
            loading={loading} 
            selectedStatus={selectedStatus} 
            searchTerm={searchTerm} />
          <List 
            employers={employers} 
            getStatusBadge={getStatusBadge} 
            loading={loading} />
        </div>
      </PageContainer>
  );
}
