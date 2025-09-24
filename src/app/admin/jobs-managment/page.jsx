"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

export default function JobsManagmentPage() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusBadge = (status) => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-green-100 text-green-800 status-badge-compact">
            Live
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-orange-100 text-orange-800 status-badge-compact">
            Paused
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 status-badge-medium">
            Cancelled
          </Badge>
        );
      case "complete":
        return (
          <Badge className="bg-blue-100 text-blue-800 status-badge-medium">
            Complete
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 status-badge-compact">
            Draft
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="status-badge-compact">
            {status}
          </Badge>
        );
    }
  };

  const hasActionRequired = (job) => {
    return (
      job.newApplicationsToReview > 0 ||
      job.pollenInterviewsBooked > 0 ||
      job.needsApproval
    );
  };

  const assignedJobs = [
    // Holly's assigned jobs
    {
      id: "1",
      jobTitle: "Marketing Assistant",
      companyName: "TechFlow Solutions",
      status: "draft",
      assignedDate: "2024-01-10",
      assignedTo: "Holly (You)",
      totalApplications: 0,
      newApplicationsToReview: 0,
      pollenInterviewsBooked: 0,
      feedbackSent: 0,
      candidatesMatchedToEmployer: 0,
      interviewsCompleted: 0,
      candidatesInProgress: 0,
    },
    {
      id: "2",
      jobTitle: "Marketing Assistant",
      companyName: "Creative Studios",
      status: "live",
      assignedDate: "2024-01-08",
      assignedTo: "Holly (You)",
      totalApplications: 12,
      newApplicationsToReview: 2,
      pollenInterviewsBooked: 1,
      feedbackSent: 8,
      candidatesMatchedToEmployer: 2,
      interviewsCompleted: 6,
      candidatesInProgress: 3,
    },
    // Karen's assigned jobs
    {
      id: "3",
      jobTitle: "Digital Marketing Coordinator",
      companyName: "StartupCo",
      status: "paused",
      assignedDate: "2024-01-05",
      assignedTo: "Karen Whitelaw",
      totalApplications: 18,
      newApplicationsToReview: 0,
      pollenInterviewsBooked: 0,
      feedbackSent: 10,
      candidatesMatchedToEmployer: 2,
      interviewsCompleted: 8,
      candidatesInProgress: 0,
    },
    {
      id: "4",
      jobTitle: "Marketing Manager",
      companyName: "Digital Agency",
      status: "complete",
      assignedDate: "2024-01-02",
      assignedTo: "Karen Whitelaw",
      totalApplications: 22,
      newApplicationsToReview: 0,
      pollenInterviewsBooked: 0,
      feedbackSent: 22,
      candidatesMatchedToEmployer: 1,
      interviewsCompleted: 8,
      candidatesInProgress: 0,
    },
    // Sophie's assigned jobs
    {
      id: "5",
      jobTitle: "Sales Coordinator",
      companyName: "SalesForce Pro",
      status: "live",
      assignedDate: "2024-01-12",
      assignedTo: "Sophie O'Brien",
      totalApplications: 8,
      newApplicationsToReview: 3,
      pollenInterviewsBooked: 1,
      feedbackSent: 4,
      candidatesMatchedToEmployer: 0,
      interviewsCompleted: 2,
      candidatesInProgress: 3,
    },
    {
      id: "6",
      jobTitle: "Data Analyst",
      companyName: "Analytics Hub",
      status: "live",
      assignedDate: "2024-01-15",
      assignedTo: "Sophie O'Brien",
      totalApplications: 11,
      newApplicationsToReview: 4,
      pollenInterviewsBooked: 2,
      feedbackSent: 5,
      candidatesMatchedToEmployer: 0,
      interviewsCompleted: 3,
      candidatesInProgress: 5,
    },
    // Jobs in draft status - being created but not yet published
    {
      id: "7",
      jobTitle: "Social Media Manager",
      companyName: "Brand Builders Ltd",
      status: "draft",
      assignedDate: "2025-01-17",
      assignedTo: "Holly (You)",
      totalApplications: 0,
      newApplicationsToReview: 0,
      pollenInterviewsBooked: 0,
      feedbackSent: 0,
      candidatesMatchedToEmployer: 0,
      interviewsCompleted: 0,
      candidatesInProgress: 0,
      submittedDate: "2025-01-17",
      submittedBy: "Brand Builders Ltd",
      needsApproval: true,
    },
    {
      id: "8",
      jobTitle: "Junior Accountant",
      companyName: "Finance First",
      status: "draft",
      assignedDate: "2025-01-16",
      assignedTo: "Sophie O'Brien",
      totalApplications: 0,
      newApplicationsToReview: 0,
      pollenInterviewsBooked: 0,
      feedbackSent: 0,
      candidatesMatchedToEmployer: 0,
      interviewsCompleted: 0,
      candidatesInProgress: 0,
      submittedDate: "2025-01-16",
      submittedBy: "Finance First",
      needsApproval: true,
    },
    {
      id: "9",
      jobTitle: "Customer Success Representative",
      companyName: "TechSupport Pro",
      status: "draft",
      assignedDate: "2025-01-15",
      assignedTo: "Karen Whitelaw",
      totalApplications: 0,
      newApplicationsToReview: 0,
      pollenInterviewsBooked: 0,
      feedbackSent: 0,
      candidatesMatchedToEmployer: 0,
      interviewsCompleted: 0,
      candidatesInProgress: 0,
      submittedDate: "2025-01-15",
      submittedBy: "TechSupport Pro",
      needsApproval: true,
    },
    {
      id: "10",
      jobTitle: "Project Coordinator",
      companyName: "StartupCo",
      status: "draft",
      assignedDate: "2025-01-13",
      assignedTo: "Holly (You)",
      totalApplications: 0,
      newApplicationsToReview: 0,
      pollenInterviewsBooked: 0,
      feedbackSent: 0,
      candidatesMatchedToEmployer: 0,
      interviewsCompleted: 0,
      candidatesInProgress: 0,
      submittedDate: "2025-01-13",
      submittedBy: "People Solutions",
      needsApproval: true,
    },
    {
      id: "11",
      jobTitle: "Operations Coordinator",
      companyName: "Logistics Pro",
      status: "draft",
      assignedDate: "2025-01-12",
      assignedTo: "Karen Whitelaw",
      totalApplications: 0,
      newApplicationsToReview: 0,
      pollenInterviewsBooked: 0,
      feedbackSent: 0,
      candidatesMatchedToEmployer: 0,
      interviewsCompleted: 0,
      candidatesInProgress: 0,
      submittedDate: "2025-01-12",
      submittedBy: "Logistics Pro",
      needsApproval: true,
    },
    {
      id: "12",
      jobTitle: "Digital Marketing Specialist",
      companyName: "Marketing Masters",
      status: "draft",
      assignedDate: "2025-01-11",
      assignedTo: "Sophie O'Brien",
      totalApplications: 0,
      newApplicationsToReview: 0,
      pollenInterviewsBooked: 0,
      feedbackSent: 0,
      candidatesMatchedToEmployer: 0,
      interviewsCompleted: 0,
      candidatesInProgress: 0,
      submittedDate: "2025-01-11",
      submittedBy: "Marketing Masters",
      needsApproval: true,
    },
  ];

  // Get counts for tab badges
  const managementCount = assignedJobs.filter(
    (job) => job.status === "live",
  ).length;

  const filteredJobs = assignedJobs.filter((job) => {
    const matchesSearch =
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || job.status === selectedStatus;
    const matchesAssignment =
      selectedAssignment === "all" ||
      (selectedAssignment === "mine" && job.assignedTo === "Holly (You)") ||
      (selectedAssignment === "karen" && job.assignedTo === "Karen Whitelaw") ||
      (selectedAssignment === "sophie" && job.assignedTo === "Sophie O'Brien");

    // Tab-based filtering
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "management" && job.status === "live");

    return matchesSearch && matchesStatus && matchesAssignment && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 admin-compact-mode">
      {/* Header */}
      <div className="flex flex-1 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
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
            >
              <Plus className="w-4 h-4" />
              Create Job
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Toggle Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-1 mb-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={activeTab === "all" ? { backgroundColor: "#E2007A" } : {}}
            >
              <Users className="h-4 w-4" />
              All Jobs
              <Badge
                variant="outline"
                className="ml-1 text-xs"
                style={
                  activeTab === "all"
                    ? {
                        backgroundColor: "white",
                        color: "#E2007A",
                        borderColor: "white",
                      }
                    : {}
                }
              >
                {assignedJobs.length}
              </Badge>
            </button>
            <button
              onClick={() => setActiveTab("management")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "management"
                  ? "text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={
                activeTab === "management" ? { backgroundColor: "#E2007A" } : {}
              }
            >
              <Eye className="h-4 w-4" />
              Live Jobs
              <Badge
                variant="outline"
                className="ml-1 text-xs"
                style={
                  activeTab === "management"
                    ? {
                        backgroundColor: "white",
                        color: "#E2007A",
                        borderColor: "white",
                      }
                    : {}
                }
              >
                {managementCount}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="all">All Jobs</option>
            <option value="mine">My Assigned Jobs</option>
            <option value="karen">Karen's Jobs</option>
            <option value="sophie">Sophie's Jobs</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
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
              {activeTab === "management"
                ? `Live Jobs (${filteredJobs.length})`
                : `All Jobs (${filteredJobs.length})`}
            </h3>

            {activeTab === "management" && filteredJobs.length > 0 && (
              <div className="text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <Eye className="h-4 w-4 inline mr-1" />
                {
                  filteredJobs.filter(
                    (j) =>
                      j.newApplicationsToReview > 0 ||
                      j.pollenInterviewsBooked > 0,
                  ).length
                }{" "}
                job
                {filteredJobs.filter(
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

          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="cursor-pointer hover:shadow-lg transition-shadow border border-gray-200 bg-white hover:bg-gray-50"

              //TODO: habilitar navegación a detalles del trabajo real
              onClick={() => {
                router.push(`/admin/jobs-managment/review`);
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
                        {hasActionRequired(job) && (
                          <Star className="w-4 h-4 text-pink-600 fill-pink-600 inline mr-2" />
                        )}
                        {job.jobTitle}
                      </h3>
                      {getStatusBadge(job.status)}
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Building2 className="h-4 w-4 mr-1 text-pink-600" />
                      {job.companyName}
                      {job.assignedDate && (
                        <>
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-1 text-pink-600" />
                          Published{" "}
                          {new Date(job.assignedDate).toLocaleDateString()}
                        </>
                      )}
                    </div>

                    {/* Assignment Info */}
                    <div className="flex items-center space-x-2 mb-3">
                      {job.assignedTo ? (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                        >
                          <UserCircle className="h-3 w-3 mr-1" />
                          {job.assignedTo}
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
                        {job.totalApplications} Total Applications
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
                    {job.needsApproval ? (
                      // Review action for pending jobs
                      <Button
                        size="sm"
                        // TODO: habilitar navegación a detalles del trabajo
                        //  onClick={(e) => {
                        //    e.stopPropagation();
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
                            //  onClick={(e) => {
                            //    e.stopPropagation();
                            //    setLocation(`/admin/job-applicants-grid/${job.id}`);
                            //  }}
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
