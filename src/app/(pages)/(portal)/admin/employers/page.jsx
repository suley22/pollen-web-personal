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

export default function AdminEmployers() {
  const router = useRouter();

  const onCreate = () => {
    startTransition(() => {
      router.push(AdminRoutes.employersCreate);
    });
  };

  return (
    <AmdinEmployersProvider>
      <div className="flex flex-col w-full mx-auto py-6 gap-6">
        <PageHeader
          title="Employers"
          description="Manage and review employer company profiles"
        >
          <PrimaryButton icon={<Plus />} text="Create" onClick={onCreate} />
        </PageHeader>

        <StatisticsCards />
        <Filters />
        <ResultsCount />
        <List />
      </div>
    </AmdinEmployersProvider>
  );
}
