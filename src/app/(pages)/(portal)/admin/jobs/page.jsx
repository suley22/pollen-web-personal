"use client";

import { Plus } from "lucide-react";

import { useJobManagement } from "./_hooks/jobs-page-hook";
import Filters from "./_components/filters";
import JobListSection from "./_components/JobListSection";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "../router";
import { PageHeader } from "@/components/design-system/page-header";
import { PrimaryButton, PageContainer } from "@/components/design-system";

export default function JobsManagmentPage() {
  const router = useRouter();
  const { form } = useJobManagement();

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
      <div className="flex flex-col w-full mx-auto">
        <Filters form={form} />

        <JobListSection form={form} />
      </div>
    </PageContainer>
  );
}
