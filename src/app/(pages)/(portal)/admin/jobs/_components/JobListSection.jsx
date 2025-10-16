import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "../../router";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import JobCardItem from "@/components/design-system/job-card-item";

export default function JobListSection({ form }) {
  const router = useRouter();
  if (form.loading) {
    // Skeleton loading state
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48 bg-gray-200" />
        </div>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-1/2 bg-gray-200" />
                  <Skeleton className="h-4 w-1/3 bg-gray-200" />
                  <Skeleton className="h-4 w-1/4 bg-gray-200" />
                  <Skeleton className="h-4 w-1/2 bg-gray-200" />
                </div>
                <div className="flex flex-col space-y-2 ml-4 w-32">
                  <Skeleton className="h-8 w-full bg-gray-200" />
                  <Skeleton className="h-7 w-full bg-gray-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex pl-1 items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {form.jobs.length}
            </span>{" "}
            {form.jobs.length === 1 ? "job" : "jobs"}
          </p>
        </div>

        {form.activeTab === "management" && form.jobs.length > 0 && (
          <div className="text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <Eye className="h-4 w-4 inline mr-1" />
            {
              form.jobs.filter(
                (j) =>
                  j.newApplicationsToReview > 0 || j.pollenInterviewsBooked > 0,
              ).length
            }{" "}
            job
            {form.jobs.filter(
              (j) =>
                j.newApplicationsToReview > 0 || j.pollenInterviewsBooked > 0,
            ).length !== 1
              ? "s"
              : ""}{" "}
            need attention
          </div>
        )}
      </div>

      {form.jobs.map((job) => (
        <JobCardItem
          key={job.id}
          job={job}
          form={form}
          router={router}
          routes={AdminRoutes}
        />
      ))}
    </div>
  );
}
