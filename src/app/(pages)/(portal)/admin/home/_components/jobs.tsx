"use client";

import { Button } from "@/components/ui/button";
import { ListSkeleton } from "@/app/(pages)/(portal)/admin/employers/_components/employers-page-list-skeleton";
import { useRouter } from "next/navigation";
import { useHome } from "@/admin/home/useHome";
import { AdminRoutes } from "@/admin/router";
import { HomeJobsSkeleton } from "./jobs-skeleton";
import JobCardItem from "@/components/design-system/job-card-item";

export function HomeJobs() {
  const router = useRouter();
  const { homeState } = useHome();

  if (homeState.loading) {
    return <HomeJobsSkeleton />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">
            My Assigned Jobs
          </h2>
          <Button
            variant="outline"
            className="justify-start h-12"
            size="sm"
            onClick={() => router.push(AdminRoutes.jobs)}
          >
            View All Jobs
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {homeState.loading ? (
          <ListSkeleton />
        ) : homeState.jobs && homeState.jobs.length > 0 ? (
          homeState.jobs.map((job) => {
            return (
              <JobCardItem
                key={job.id}
                job={job}
                form={homeState}
                router={router}
                routes={AdminRoutes}
                showAdminBadge={false}
              />
            );
          })
        ) : (
          <div className="text-center text-gray-400 py-8">
            No jobs assigned.
          </div>
        )}
      </div>
    </div>
  );
}
