"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useJobManagement } from "@/admin/jobs/useJobManagement";
import { Briefcase, Plus, MapPin, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface Job {
  id: string;
  job_title: string;
  status: "live" | "draft" | "hidden" | "paused";
  location: string;
  applicationsCount?: number;
  salary_range?: string;
  createdAt: string;
}

interface JobPostingsProps {
  jobs: Job[];
  isLoading?: boolean;
  companyId?: string;
}

export function JobPostings({
  jobs,
  isLoading = false,
  companyId,
}: JobPostingsProps) {
  const router = useRouter();

  const { form } = useJobManagement();

  const liveJobsCount = jobs.filter((job) => job.status === "live").length;
  const draftJobsCount = jobs.filter((job) => job.status === "draft").length;
  const hiddenJobsCount = jobs.filter((job) => job.status === "hidden").length;
  const pausedJobsCount = jobs.filter((job) => job.status === "paused").length;

  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Job Postings</span>
            {jobs.length > 0 && (
              <div className="flex items-center gap-2">
                {liveJobsCount > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {liveJobsCount} Live
                  </Badge>
                )}
                {draftJobsCount > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    {draftJobsCount} Draft
                  </Badge>
                )}
                {hiddenJobsCount > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-gray-50 text-gray-700 border-gray-200"
                  >
                    {hiddenJobsCount} Hidden
                  </Badge>
                )}
                {pausedJobsCount > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-200"
                  >
                    {pausedJobsCount} Paused
                  </Badge>
                )}
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              if (companyId) {
                router.push(`/admin/companies/${companyId}/jobs/create`);
              }
            }}
          >
            <Plus className="h-4 w-4" />
            Create Job
          </Button>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
              <p className="text-sm text-muted-foreground">Loading jobs...</p>
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <Briefcase className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No job postings yet
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              This employer hasn&apos;t created any job postings yet. Click the
              &quot;Create Job&quot; button to get started.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer bg-white"
                  onClick={() => {
                    // Store current page so job review can navigate back correctly
                    sessionStorage.setItem(
                      "previousPage",
                      window.location.pathname,
                    );
                    router.push(`/admin/jobs-managment/review/${job.id}`);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-semibold text-gray-900">
                          {job.job_title}
                        </h4>
                        {form.getStatusBadge(job.status)}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1.5 text-gray-400" />
                          {job.applicationsCount || 0} applications
                        </span>
                        {job.salary_range && (
                          <span className="text-gray-600">
                            {job.salary_range}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-gray-500">
                        Created {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/admin/jobs")}
                className="gap-2"
              >
                Ver más
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
