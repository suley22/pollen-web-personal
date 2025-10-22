"use client";

import { Star, ChevronRight } from "lucide-react";
import { FeatureJobCards } from "./featured-jobs-cards";

import { useFeaturedJobs } from "../_hooks/useFeaturedJobs";
import { FormCard } from "@/components/design-system";
import { SecondaryButton } from "@/components/design-system/primary-button";

export function FeaturedJobs() {
  const { jobs, loading, saveFavoriteJob, hiddenJobs } = useFeaturedJobs();

  return (
    <FormCard
      title="This Week's Featured Jobs"
      icon={<Star className="h-5 w-5" />}
      titleButtons={
        <SecondaryButton
          text="View All Jobs"
          onClick={() => (window.location.href = "/jobs")}
          icon={<ChevronRight className="h-4 w-4" />}
        />
      }
    >
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
    </FormCard>
  );
}
