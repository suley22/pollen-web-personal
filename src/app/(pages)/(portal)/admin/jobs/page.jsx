"use client";

import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useJobManagement } from "./useJobManagement";
import {
  Users,
  Eye,
  Search,
  Star,
  Building2,
  Calendar,
  UserCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "../router";

export default function JobsManagmentPage() {
  const router = useRouter();
  const { form } = useJobManagement();

  return (
    <div className="min-h-screen bg-gray-50 admin-compact-mode">
      {/* Header */}

      <div className="flex flex-1 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold">Jobs Management</h1>

                <p className="text-muted-foreground mt-2">
                  Manage job postings and track application progress
                </p>
              </div>
            </div>
            <Button
              // TODO: agregar función onClick
              // onClick={() => setLocation("/admin/job-creation-flow")}
              className="flex items-center gap-2"
              style={{
                height: "40px",
                minHeight: "40px",
                fontSize: "14px",
                fontWeight: "500",
                padding: "0 16px",
              }}
              onClick={() => {
                router.push(`/admin/jobs-management/create`);
              }}
            >
              <Plus className="w-4 h-4" />
              Create Job
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Tab Toggle Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-1 mb-6">
          <div className="flex">
            <button
              onClick={() => form.setActiveTab("all")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                form.activeTab === "all"
                  ? "text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={
                form.activeTab === "all" ? { backgroundColor: "#E2007A" } : {}
              }
            >
              <Users className="h-4 w-4" />
              All Jobs
              <Badge
                variant="outline"
                className="ml-1 text-xs"
                style={
                  form.activeTab === "all"
                    ? {
                        backgroundColor: "white",
                        color: "#E2007A",
                        borderColor: "white",
                      }
                    : {}
                }
              >
                {form.jobs.length}
              </Badge>
            </button>
            <button
              onClick={() => form.setActiveTab("management")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                form.activeTab === "management"
                  ? "text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={
                form.activeTab === "management"
                  ? { backgroundColor: "#E2007A" }
                  : {}
              }
            >
              <Eye className="h-4 w-4" />
              Live Jobs
              <Badge
                variant="outline"
                className="ml-1 text-xs"
                style={
                  form.activeTab === "management"
                    ? {
                        backgroundColor: "white",
                        color: "#E2007A",
                        borderColor: "white",
                      }
                    : {}
                }
              >
                {form.jobs.length}
              </Badge>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              value={form.searchTerm}
              onChange={(e) => form.setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={form.selectedAssignment}
            onChange={(e) => form.setSelectedAssignment(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="all">All Jobs</option>
            <option value="mine">My Assigned Jobs</option>
            <option value="karen">Karen's Jobs</option>
            <option value="sophie">Sophie's Jobs</option>
          </select>
          <select
            value={form.selectedStatus}
            onChange={(e) => form.setSelectedStatus(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="draft">In Draft</option>
            <option value="live">Live</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        {/* Jobs Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {form.activeTab === "management"
                ? `Live Jobs (${form.jobs.length})`
                : `All Jobs (${form.jobs.length})`}
            </h3>

            {form.activeTab === "management" && form.jobs.length > 0 && (
              <div className="text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <Eye className="h-4 w-4 inline mr-1" />
                {
                  form.jobs.filter(
                    (j) =>
                      j.newApplicationsToReview > 0 ||
                      j.pollenInterviewsBooked > 0,
                  ).length
                }{" "}
                job
                {form.jobs.filter(
                  (j) =>
                    j.newApplicationsToReview > 0 ||
                    j.pollenInterviewsBooked > 0,
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
              className="cursor-pointer hover:shadow-lg transition-shadow border border-gray-200 bg-white hover:bg-gray-50"
              //TODO: habilitar navegación a detalles del trabajo real
              onClick={() => {
                router.push(AdminRoutes.jobReview(job.id));
              }}

              //   sessionStorage.setItem('previousPage', '/admin/assigned-jobs');
              //   if (job.status === 'draft') {
              //     setLocation(`/admin/job-review/${job.id}?source=assigned-jobs`);
              //   } else {
              //     setLocation(`/admin/job-review/${job.id}?source=assigned-jobs`);
              //   }
              // }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">
                        {form.hasActionRequired(job) && (
                          <Star className="w-4 h-4 text-pink-600 fill-pink-600 inline mr-2" />
                        )}
                        {job.job_title}
                      </h3>
                      {form.getStatusBadge(job.status)}
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Building2 className="h-4 w-4 mr-1 text-pink-600" />
                      {job.company_name}
                      {job.assigned_date && (
                        <>
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-1 text-pink-600" />
                          Published{" "}
                          {new Date(job.assigned_date).toLocaleDateString()}
                        </>
                      )}
                    </div>

                    {/* Assignment Info */}
                    <div className="flex items-center space-x-2 mb-3">
                      {job.assigned_to ? (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                        >
                          <UserCircle className="h-3 w-3 mr-1" />
                          {job.assigned_to}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200 text-xs"
                        >
                          <UserCircle className="h-3 w-3 mr-1" />
                          Unassigned
                        </Badge>
                      )}
                    </div>

                    {/* Application Summary - Total Count */}
                    <div className="mb-2">
                      <div className="inline-block px-3 py-1 bg-pink-50 text-pink-900 rounded-md font-semibold text-sm border border-pink-200">
                        {job.total_applications} Total Applications
                      </div>
                    </div>

                    {/* Status Breakdown */}
                    <div className="flex gap-2 text-sm mb-3">
                      {job.new_applications_to_review > 0 && (
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          {job.new_applications_to_review} New
                        </span>
                      )}

                      {job.pollen_interviews_booked > 0 && (
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          {job.pollen_interviews_booked} In Progress
                        </span>
                      )}

                      {job.candidates_matched_to_employer > 0 && (
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          {job.candidates_matched_to_employer} Matched
                        </span>
                      )}

                      {job.feedback_sent > 0 && (
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-gray-500 rounded-full" />
                          {job.feedbackSent} Complete
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {job.need_approval ? (
                      // Review action for pending jobs
                      <Button
                        size="sm"
                        // TODO: habilitar navegación a detalles del trabajo
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(AdminRoutes.jobReview(job.id));
                        }}
                        //    sessionStorage.setItem('previousPage', '/admin/assigned-jobs');
                        //    if (job.status === 'draft') {
                        //      setLocation(`/admin/job-review/${job.id}?source=assigned-jobs`);
                        //    } else {
                        //      setLocation(`/admin/job-review/${job.id}?source=assigned-jobs`);
                        //    }
                        //  }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Review Job
                      </Button>
                    ) : (
                      <>
                        {/* Standard actions for assigned/live jobs */}
                        {job.status !== "draft" && (
                          <Button
                            size="sm"
                            variant="outline"
                            // TODO: habilitar navegación a candidatos del trabajo
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(AdminRoutes.jobApplicants(job.id));
                            }}
                            className="border-pink-200 text-pink-700 hover:bg-pink-50"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Candidates
                          </Button>
                        )}

                        {/* Job Posting Link */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-50 h-7 px-2 font-normal"
                          // TODO: habilitar navegación a detalles del trabajo
                          // onClick={(e) => {
                          //   e.stopPropagation();
                          //   sessionStorage.setItem(
                          //     "previousPage",
                          //     "/admin/assigned-jobs",
                          //   );
                          //   setLocation(`/admin/job-review/${job.id}`);
                          // }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Job Details
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
