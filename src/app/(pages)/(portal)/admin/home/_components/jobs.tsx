"use client";

import { Building2, Eye, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useHome } from "@/admin/home/useHome";

export function HomeJobs() {
  const router = useRouter();
  const { homeState } = useHome();

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
            onClick={() => router.push("/admin/jobs-managment")}
          >
            View All Jobs
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* TODO: */}
        {homeState.jobs?.map((job) => (
          <Card
            key={job.id}
            className="cursor-pointer hover:shadow-lg transition-shadow border border-gray-200 bg-white hover:bg-gray-50"
            onClick={() => {
              router.push(`/admin/jobs-managment/review/${job.id}`);
            }}
            //   if (job.status === 'draft') {
            //     setLocation(`/admin/job-review/${job.id}?source=dashboard`);
            //   } else {
            //     setLocation(`/admin/job-review/${job.id}?source=dashboard`);
            //   }
            // }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-gray-900">
                      {job.job_title}
                    </h3>
                    {homeState.getStatusBadge(job.status)}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Building2 className="h-4 w-4 mr-1 text-pink-600" />
                    {job.company_name}
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1 text-pink-600" />
                    {job.status === "draft"
                      ? `Created ${new Date(job.assigned_date).toLocaleDateString()}`
                      : `Published ${new Date(job.assigned_date).toLocaleDateString()}`}
                  </div>

                  {/* Application Summary - Total Count */}
                  <div className="mb-2">
                    <div className="inline-block px-3 py-1 bg-pink-50 text-pink-900 rounded-md font-semibold text-sm border border-pink-200">
                      {/* TODO: Summary */}
                      {job.total_applications} Total Applications
                    </div>
                  </div>

                  {/* Status Breakdown */}
                  <div className="flex gap-2 text-sm mb-3">
                    {job.newApplicationsToReview > 0 && (
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        {job.newApplicationsToReview} New
                      </span>
                    )}
                    {job.pollenInterviewsBooked > 0 && (
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        {job.pollenInterviewsBooked} In Progress
                      </span>
                    )}
                    {job.candidatesMatchedToEmployer > 0 && (
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        {job.candidatesMatchedToEmployer} Matched
                      </span>
                    )}
                    {job.feedbackSent > 0 && (
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-gray-500 rounded-full" />
                        {job.feedbackSent} Complete
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {job.status !== "draft" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/admin/jobs-managment/job-applicants/${job.id}`,
                        );
                      }}
                      className="bg-pink-600 hover:bg-pink-700 text-white"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      View Candidates
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant={job.status === "draft" ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();

                      // /admin/jobs-managment/review/ffb9511f-48ce-4272-87bd-cbb90ddb40f2
                      router.push(`/admin/jobs-managment/review/${job.id}`);
                    }}
                    className={
                      job.status === "draft"
                        ? "bg-pink-600 hover:bg-pink-700 text-white"
                        : "border-pink-200 text-pink-700 hover:bg-pink-50"
                    }
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {job.status === "draft"
                      ? "Review & Approve"
                      : "Job Details"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
