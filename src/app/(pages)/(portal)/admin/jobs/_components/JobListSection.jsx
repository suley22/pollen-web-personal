import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Star,
  Building2,
  Calendar,
  UserCircle,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "../../router";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

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
                        {form.hasActionRequired(job) && (
                          <Star className="w-4 h-4 text-pink-600 fill-pink-600 inline mr-2" />
                        )}
                        {job.job_title}
                      </h3>
                      {form.getStatusBadge(job.status)}
                    </div>

                    <div className="flex flex-row items-center gap-3">
                      {/* Assigned admin */}
                      <div className="space-y-2 text-sm">
                        <div className="flex flex-row items-start gap-4">
                          {/* Assignment Badge arriba del título */}
                          {job.assigned_to ? (
                            <Badge
                              variant="outline"
                              className="bg-pink-50 text-pink-700 border-pink-200 text-xs"
                            >
                              <UserCircle className="h-3 w-3 mr-1" />
                              {job.assigned_to}
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-gray-100 text-gray-500 border-gray-300 text-xs"
                            >
                              <UserCircle className="h-3 w-3 mr-1" />
                              Unassigned
                            </Badge>
                          )}
                        </div>
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
                        {job.new_applications_to_review} New
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200 font-medium gap-1.5"
                      >
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        {job.pollen_interviews_booked} In Progress
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 font-medium gap-1.5"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        {job.candidates_matched_to_employer} Matched
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
                            router.push(AdminRoutes.jobApplicants(job.id));
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
  );
}
