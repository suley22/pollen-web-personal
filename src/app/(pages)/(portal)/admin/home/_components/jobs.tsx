"use client";

import { Building2, Eye, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useHome } from "@/admin/home/useHome";
import { AdminRoutes } from "@/admin/router";
import { HomeJobsSkeleton } from "./jobs-skeleton";

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
        {/* TODO: */}
        {homeState.jobs?.map((job) => (
          <Card
            key={job.id}
            className="hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer border-border/40"
            onClick={() => {
              router.push(AdminRoutes.jobView(job.id));
            }}
          >
            <CardContent className="px-5 py-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col flex-1">
                      {/* Job Title and Status */}
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {job.job_title}
                        </h3>
                        {homeState.getStatusBadge(job.status)}
                      </div>

                      {/* Job Details */}
                      <div className="space-y-2 text-sm">
                        {/* Company and Date */}
                        <div className="flex flex-row items-start gap-4">
                          <div className="flex justfy-center gap-2 text-muted-foreground">
                            <Building2 className="w-4 h-4 text-pink-600 mt-0.5" />
                            <span className="truncate">{job.company_name}</span>
                          </div>
                          <div className="flex justfy-center gap-2 text-muted-foreground mt-0.5">
                            <Calendar className="w-4 h-4 text-pink-600 " />
                            <span className="truncate">
                              {job.status === "draft"
                                ? `Created ${new Date(job.assigned_date).toLocaleDateString()}`
                                : `Published ${new Date(job.assigned_date).toLocaleDateString()}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Total Applications */}
                    <div className="flex flex-col justify-start">
                      <div className="text-right space-y-1 bg-pink-50 px-4 py-2 rounded-lg border border-pink-200">
                        <div className="text-xs text-pink-700 font-medium">
                          Total Applications
                        </div>
                        <div className="text-2xl font-bold text-pink-900">
                          {job.total_applications}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border/50 pt-3 mt-3">
                    {/* Status Breakdown and Actions */}
                    <div className="flex flex-row justify-between items-center">
                      {/* Status Badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 font-medium gap-1.5"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          {job.newApplicationsToReview} New
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200 font-medium gap-1.5"
                        >
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          {job.pollenInterviewsBooked} In Progress
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 font-medium gap-1.5"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          {job.candidatesMatchedToEmployer} Matched
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-gray-50 text-gray-700 border-gray-200 font-medium gap-1.5"
                        >
                          <div className="w-2 h-2 bg-gray-500 rounded-full" />
                          {job.feedbackSent} Complete
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1">
                        {job.status !== "draft" && (
                          <Button
                            variant="pollen"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(AdminRoutes.applicants(job.id));
                            }}
                          >
                            <Users className="h-4 w-4 mr-1" />
                            <span className="text-xs">View Candidates</span>
                          </Button>
                        )}
                        <Button
                          variant="pollen"
                          size="sm"
                          className={
                            job.status === "draft"
                              ? "h-8 px-2 bg-pink-600 hover:bg-pink-700 text-white"
                              : "h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(AdminRoutes.jobView(job.id));
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          <span className="text-xs">
                            {job.status === "draft"
                              ? "Review & Approve"
                              : "Job Details"}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
