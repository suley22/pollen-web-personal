"use client";

import { Button } from "@/components/ui/button";
import { ListSkeleton } from "@/app/(pages)/(portal)/admin/employers/_components/employers-page-list-skeleton";
import { useRouter } from "next/navigation";
import { useHome } from "@/app/(pages)/(portal)/admin/home/_hooks/home-page-hook";
import { AdminRoutes } from "@/admin/router";
import { HomeJobsSkeleton } from "./jobs-skeleton";
import { JobCardItem } from "@/admin/jobs/_components/jobs-page-card-item";
import { EmptyState } from "@/components/design-system/empty-state";
import { BriefcaseBusiness } from "lucide-react";

export function HomeJobs() {
  const router = useRouter();
  const { homeState } = useHome();

  if (homeState.loading) {
    return <HomeJobsSkeleton />;
  }

  return (
    <div className="flex flex-col h-full bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="pl-1 mb-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-gray-900">
            My Assigned Jobs
          </div>
          <Button
            variant="outline"
            className="justify-start"
            size="sm"
            onClick={() => router.push(AdminRoutes.jobs)}
          >
            View All Jobs
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        {homeState.loading ? (
          <ListSkeleton />
        ) : homeState.jobs && homeState.jobs.length > 0 ? (
          homeState.jobs.map((job) => {
            return (
              <JobCardItem key={job.id} job={job} showAdminBadge={false} />
            );
          })
        ) : (
          <div className="h-full grid place-items-center">
            <EmptyState
              icon={BriefcaseBusiness}
              title="No Jobs Assigned"
              description="You have not been assigned any jobs yet."
              fill
            />
          </div>
        )}
      </div>
    </div>
  );
}
