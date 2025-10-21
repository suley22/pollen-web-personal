"use client";

import { Filters } from "@/admin/employers/_components/filters";
import { StatisticsCards } from "@/admin/employers/_components/cards";
import { ResultsCount } from "@/admin/employers/_components/results-count";
import { List } from "@/admin/employers/_components/list";
import { AmdinEmployersProvider } from "@/admin/employers/_context/admin-employers-context";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { AdminRoutes } from "@/admin/router";
import { PageHeader } from "@/components/design-system/page-header";
import { PrimaryButton } from "@/components/design-system/primary-button";
import { PageContainer } from "@/components/design-system";

export default function AdminEmployers() {
  const router = useRouter();

  const onCreate = () => {
    startTransition(() => {
      router.push(AdminRoutes.employersCreate);
    });
  };

  return (
    <AmdinEmployersProvider>
      <PageContainer>
        <PageHeader
          title="Employers"
          subtitle="Manage and review employer company profiles"
        >
          <PrimaryButton icon={<Plus />} text="Create" onClick={onCreate} />
        </PageHeader>

        <StatisticsCards />
        <Filters />
        <div className="flex flex-col gap-2">
          <ResultsCount />
          <List />
        </div>
      </PageContainer>
    </AmdinEmployersProvider>
  );
}
