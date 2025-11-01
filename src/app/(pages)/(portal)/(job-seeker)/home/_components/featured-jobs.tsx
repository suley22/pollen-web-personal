"use client";

import { Star, ChevronRight } from "lucide-react";
import { FeatureJobCards } from "./featured-jobs-cards";
import { useRouter } from "next/navigation";

import { useFeaturedJobs } from "../_hooks/useFeaturedJobs";
import { FormCard } from "@/components/design-system";
import { SecondaryButton } from "@/components/design-system/primary-button";

export function FeaturedJobs() {
  const { jobs, loading, saveFavoriteJob, hiddenJobs } = useFeaturedJobs();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-rows items-center justify-between">
        <div className="text-lg font-medium text-gray-900">
          My Assigned Jobs
        </div>
        <SecondaryButton
          text="View All Jobs"
          onClick={() => router.push("/jobs")}
          icon={<ChevronRight className="h-4 w-4" />}
        />
      </div>

      <div className="flex flex-col gap-4">
        <FeatureJobCards
          jobs={jobs}
          loading={loading}
          saveFavoriteJob={saveFavoriteJob}
        />

        <FeatureJobCards
          jobs={hiddenJobs}
          loading={loading}
          saveFavoriteJob={saveFavoriteJob}
        />
      </div>
    </>
  );
}
