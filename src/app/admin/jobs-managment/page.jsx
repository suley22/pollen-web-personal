"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, Search } from "lucide-react";


export default function JobsManagmentPage() {
     const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedAssignment, setSelectedAssignment] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
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
      </div>
    </div>
  );
}
