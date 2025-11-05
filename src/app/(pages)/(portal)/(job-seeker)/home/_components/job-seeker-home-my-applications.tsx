"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SecondaryButton } from "@/components/design-system/primary-button";
import { useMyApplications } from "../_hooks/useMyApplications";
import { MyApplicationsCards } from "./my-applications-cards";

export default function MyApplications() {
  const { jobs, loading } = useMyApplications();
  const router = useRouter();

  // Don't show section if no applications
  if (!loading && jobs.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-rows items-center justify-between">
        <div className="text-2xl font-medium text-gray-900">
          My Applications
        </div>
        <SecondaryButton
          text="View All Applications"
          onClick={() => router.push("/jobs")}
          icon={<ChevronRight className="h-4 w-4" />}
        />
      </div>

      <div className="flex flex-col gap-4">
        <MyApplicationsCards jobs={jobs} loading={loading} />
      </div>
    </>
  );
}
