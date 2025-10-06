"use client";

import {
  Bell,
  Badge,
  MessageSquare,
  BarChart3,
  Building2,
  FileText,
  Plus,
  Eye,
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useHome } from "./useHome";

export default function AdminHomePage() {
  const { homeState } = useHome();
  const router = useRouter();
  const notifications = [];
  const stats = {
    totalCommunityMembers: 1247,
    newSignupsToday: 8,
    totalEmployers: 184,
    newEmployersRequiringApproval: 11,
    liveJobs: 23,
    pendingJobApprovals: 7,
  };

  const myAssignedJobs = homeState.jobs;
  // const myAssignedJobs = [
  //   {
  //     id: "ffb9511f-48ce-4272-87bd-cbb90ddb40f2",
  //     jobTitle: "Marketing Assistant",
  //     companyName: "TechFlow Solutions",
  //     status: "draft",
  //     assignedDate: "2025-01-10",
  //     totalApplications: 0,
  //     newApplicationsToReview: 0,
  //     pollenInterviewsBooked: 0,
  //     feedbackSent: 0,
  //     candidatesMatchedToEmployer: 0,
  //     assignedTo: "Holly (You)",
  //   },
  //   {
  //     id: 2,
  //     jobTitle: "Marketing Specialist",
  //     companyName: "Creative Studios",
  //     status: "live",
  //     assignedDate: "2025-01-08",
  //     totalApplications: 12,
  //     newApplicationsToReview: 2,
  //     pollenInterviewsBooked: 1,
  //     feedbackSent: 8,
  //     candidatesMatchedToEmployer: 2,
  //     assignedTo: "Holly (You)",
  //   },
  //   {
  //     id: 3,
  //     jobTitle: "Digital Marketing Coordinator",
  //     companyName: "Digital Media Co",
  //     status: "paused",
  //     assignedDate: "2025-01-12",
  //     totalApplications: 8,
  //     newApplicationsToReview: 3,
  //     pollenInterviewsBooked: 2,
  //     feedbackSent: 3,
  //     candidatesMatchedToEmployer: 0,
  //     assignedTo: "Holly (You)",
  //   },
  // ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 status-badge-compact">
            Draft
          </Badge>
        );
      case "live":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 status-badge-compact">
            Live
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200 status-badge-compact">
            Paused
          </Badge>
        );
      case "complete":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200 status-badge-medium">
            Complete
          </Badge>
        );
      case "pending_approval":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 inline-flex items-center justify-center px-2 text-xs">
            Pending Approval
          </Badge>
        );
      case "needs_attention":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200 inline-flex items-center justify-center px-2 text-xs">
            Needs Attention
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="status-badge-compact">
            Unknown
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 admin-compact-mode pb-16">
      {/* Header with Alerts */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="font-bold text-gray-900 welcome-message">
              Welcome back, Holly 💛
            </h1>

            {/* Notification and Message Alerts */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                //TODO:
                // onClick={() => setLocation("/admin/notifications")}
                className="relative"
              >
                <Bell className="h-4 w-4 mr-1" />
                Notifications
                <Badge className="ml-2 bg-red-100 text-red-800 text-xs">
                  1
                </Badge>
              </Button>

              <Button
                variant="outline"
                size="sm"
                //TODO:
                //  onClick={() => setLocation("/admin/messages")}
                className="relative"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Messages
                <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">
                  8
                </Badge>
              </Button>

              {/* User Profile Icon */}
              <Button
                variant="outline"
                size="sm"
                //TODO:
                //  onClick={() => setLocation("/admin/settings")}
                className="relative p-1"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-sm bg-purple-500 text-white font-medium">
                    HS
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>

            {/* Notification Alerts */}
            {notifications.length > 0 && (
              <div className="pb-4 space-y-2">
                {notifications.map((notification) => (
                  <Alert
                    key={notification.id}
                    className={`cursor-pointer transition-colors ${
                      notification.type === "urgent"
                        ? "border-orange-200 bg-orange-50"
                        : "border-blue-200 bg-blue-50"
                    }`}
                    //TODO:
                    // onClick={() => setLocation(notification.route)}
                  >
                    <Bell className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                      <span>{notification.message}</span>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Review →
                      </Button>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Top Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Job Seekers Card */}
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-blue-50 shadow-md p-6"
              onClick={() => router.push("/admin/all-job-seekers")}
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className="text-sm font-medium text-gray-900 flex items-center"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats?.totalCommunityMembers.toLocaleString()}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs p-1"
                      //TODO:
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/admin/community/members");
                      }}
                    >
                      <Users className="h-3 w-3 mr-1" />
                      View All
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs p-1"
                      //TODO:
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/admin/community/analytics/");
                      }}
                    >
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    +{stats?.newSignupsToday} today
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Company Profiles Card */}
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-orange-50 shadow-md p-6"
              onClick={() => router.push("/admin/employers-managment")}
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className="text-sm font-medium text-gray-900 flex items-center"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Company Profiles
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs p-1"
                      //TODO:
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   router.push();
                      // }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Create
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs p-1"
                      //TODO:
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/admin/employers-managment");
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Jobs Card */}
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-pink-50 shadow-md p-6"
              //TODO:
              onClick={() => router.push("/admin/jobs-managment")}
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className="text-sm font-medium text-gray-900 flex items-center"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Jobs
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats?.liveJobs}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs p-1"
                      //TODO:
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   router.push();
                      // }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Create
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs p-1"
                      //TODO:
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/admin/jobs-managment");
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Assigned Jobs Section */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  My Assigned Jobs
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/admin/jobs-managment")}
                >
                  View All Jobs
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* TODO: */}
              {myAssignedJobs?.map((job) => (
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
                          {getStatusBadge(job.status)}
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
                          variant={
                            job.status === "draft" ? "default" : "outline"
                          }
                          onClick={(e) => {
                            e.stopPropagation();

                            // /admin/jobs-managment/review/ffb9511f-48ce-4272-87bd-cbb90ddb40f2
                            router.push(
                              `/admin/jobs-managment/review/${job.id}`,
                            );
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

          {/* Quick Actions Section */}
          <div className="bg-white rounded-lg shadow-sm border mt-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="justify-start h-12"
                  //  onClick={() => setLocation("/admin/comprehensive-analytics")}
                >
                  <BarChart3 className="w-5 h-5 mr-3 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium">Analytics Dashboard</div>
                    <div className="text-xs text-gray-500">
                      View comprehensive insights
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-12"
                  //  onClick={() => setLocation("/admin/hidden-jobs")}
                >
                  <Eye className="w-5 h-5 mr-3 text-purple-600" />
                  <div className="text-left">
                    <div className="font-medium">Hidden Jobs Board</div>
                    <div className="text-xs text-gray-500">
                      Manage exclusive opportunities
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-12"
                  //  onClick={() => setLocation("/admin/all-job-seekers")}
                >
                  <Users className="w-5 h-5 mr-3 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium">Community</div>
                    <div className="text-xs text-gray-500">
                      Manage user profiles
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
