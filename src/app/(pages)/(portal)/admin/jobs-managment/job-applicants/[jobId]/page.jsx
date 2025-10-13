"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useJobData } from "./hooks/useJobData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Eye,
  Search,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  Kanban,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent } from "@/components/ui/card";

export default function JobApplicantsPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { candidates, job } = useJobData(unwrappedParams.jobId);

  const [searchTerm, setSearchTerm] = useState(() => {
    const saved = sessionStorage.getItem(`${unwrappedParams.jobId}-searchTerm`);
    return saved || "";
  });
  const [primaryStatusFilter, setPrimaryStatusFilter] = useState(() => {
    const saved = sessionStorage.getItem(
      `job-${unwrappedParams.jobId}-primaryStatusFilter`,
    );
    return saved ? JSON.parse(saved) : [];
  });
  const [subStatusFilter, setSubStatusFilter] = useState(() => {
    const saved = sessionStorage.getItem(
      `job-${unwrappedParams.jobId}-subStatusFilter`,
    );
    return saved ? JSON.parse(saved) : [];
  });
  const [scoreFilter, setScoreFilter] = useState(() => {
    const saved = sessionStorage.getItem(
      `job-${unwrappedParams.jobId}-scoreFilter`,
    );
    return saved ? JSON.parse(saved) : [];
  });
  const [sortBy, setSortBy] = useState(() => {
    const saved = sessionStorage.getItem(`job-${unwrappedParams.jobId}-sortBy`);
    return saved || "default";
  });
  const [sortOrder, setSortOrder] = useState(() => {
    const saved = sessionStorage.getItem(
      `job-${unwrappedParams.jobId}-sortOrder`,
    );
    return saved || "desc";
  });
  const [viewMode, setViewMode] = useState(() => {
    const saved = sessionStorage.getItem(
      `job-${unwrappedParams.jobId}-viewMode`,
    );
    return saved || "grid";
  });
  const [assessmentSplitViewOpen, setAssessmentSplitViewOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isMobileFullPage, setIsMobileFullPage] = useState(false);
  const [scoresApproved, setScoresApproved] = useState(() => {
    if (selectedAssessment) {
      // Check if candidate already has approved status
      const approvedStatuses = [
        "invited_to_pollen_interview",
        "pollen_interview_complete",
        "awaiting_employer",
        "interview_requested",
        "interview_booked",
        "interview_complete",
        "offer_issued",
        "hired",
        "not_progressing",
      ];
      return approvedStatuses.includes(selectedAssessment.subStatus);
    }
    return false;
  });
  const [scoresLocked, setScoresLocked] = useState(() => {
    if (selectedAssessment) {
      // Scores are locked if candidate has been actioned (beyond invited_to_pollen_interview)
      const lockedStatuses = [
        "pollen_interview_complete",
        "awaiting_employer",
        "interview_requested",
        "interview_booked",
        "interview_complete",
        "offer_issued",
        "hired",
        "not_progressing",
      ];
      return lockedStatuses.includes(selectedAssessment.subStatus);
    }
    return false;
  });

  const openAssessmentSplitView = (candidate) => {
    console.log("🔍 Opening assessment for candidate:", {
      id: candidate.id,
      name: candidate.name,
      hasAssessment: !!candidate.assessmentSubmission,
      assessmentQuestions:
        candidate.assessmentSubmission?.responses?.length || 0,
    });

    setSelectedAssessment(candidate);
    // Check if mobile and switch to full page mode
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsMobileFullPage(true);
    } else {
      setAssessmentSplitViewOpen(true);
    }

    // Dynamic locking based on candidate status
    const isInterviewComplete =
      candidate.subStatus === "pollen_interview_complete" ||
      candidate.subStatus === "awaiting_employer" ||
      candidate.subStatus === "interview_requested" ||
      candidate.subStatus === "interview_booked" ||
      candidate.subStatus === "interview_complete" ||
      candidate.subStatus === "offer_issued" ||
      candidate.subStatus === "hired";

    if (isInterviewComplete) {
      setScoresApproved(true); // Scores are automatically approved for completed interviews
      setScoresLocked(true); // Lock scores for completed interviews
    } else {
      setScoresApproved(false); // Reset approval state for new assessment
      setScoresLocked(false); // Reset lock state for new assessment
    }
  };
  // Sub-status to primary status mapping - EXACT list from user
  const subStatusToPrimaryStatus = {
    Unopened: "new_applicants",
    "Under Review": "new_applicants",
    "Invited to Pollen Interview": "in_progress",
    "Pollen Interview Complete": "in_progress",
    "Awaiting Employer": "matched_to_employer",
    "Interview Requested": "matched_to_employer",
    "Interview Complete": "matched_to_employer",
    "Interview Booked": "matched_to_employer",
    "Offer Issued": "matched_to_employer",
    Hired: "complete",
    "Not Progressing": "complete",
  };

  // Get available sub-statuses for selected primary statuses
  const getAvailableSubStatuses = () => {
    if (primaryStatusFilter.length === 0) {
      // If no primary status selected, return all sub-statuses
      return Object.keys(subStatusToPrimaryStatus);
    }
    // Return only sub-statuses that belong to the selected primary statuses
    return Object.keys(subStatusToPrimaryStatus).filter((subStatus) =>
      primaryStatusFilter.includes(subStatusToPrimaryStatus[subStatus]),
    );
  };
  // Filter candidates
  // Status mapping functions
  const getStatusLabel = (status) => {
    switch (status) {
      case "new_applicants":
        return "New";
      case "in_progress":
        return "In Progress";
      case "matched_to_employer":
        return "Matched to Employer";
      case "complete":
        return "Complete";
      default:
        return status;
    }
  };
  const getSubStatusLabel = (subStatus) => {
    switch (subStatus) {
      case "under_review":
        return "Under Review";
      case "unopened":
        return "Unopened";
      case "invited_to_pollen_interview":
        return "Invited to Pollen Interview";
      case "pollen_interview_complete":
        return "Pollen Interview Complete";
      case "awaiting_employer":
        return "Awaiting Employer";
      case "interview_requested":
        return "Interview Requested";
      case "interview_booked":
        return "Interview Booked";
      case "interview_complete":
        return "Interview Complete";
      case "offer_issued":
        return "Offer Issued";
      case "not_progressing":
        return "Not Progressing";
      case "hired":
        return "Hired";
      default:
        return subStatus
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    }
  };

  // Group candidates by status and maintain sorting within each group
  const applySorting = (candidateList) => {
    return candidateList.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "applicationDate":
          comparison =
            new Date(a.applicationDate).getTime() -
            new Date(b.applicationDate).getTime();
          break;
        case "score":
          comparison = a.overallSkillsScore - b.overallSkillsScore;
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });
  };
  const getSubStatusDetails = (subStatus) => {
    const statusMap = {
      // New - Blue badges to match primary status
      Unopened: {
        label: "Unopened",
        cta: "Review Application",
        color: "bg-blue-100 text-blue-800",
      },
      "Under Review": {
        label: "Under Review",
        cta: "Review Application",
        color: "bg-blue-100 text-blue-800",
      },

      // In Progress - Yellow badges to match primary status
      "Invited to Pollen Interview": {
        label: "Invited to Pollen Interview",
        cta: "Send Reminder",
        color: "bg-yellow-100 text-yellow-800",
      },
      "Pollen Interview Complete": {
        label: "Pollen Interview Complete",
        cta: "Match to Employer",
        color: "bg-yellow-100 text-yellow-800",
      },

      // Matched to Employer - Green badges to match primary status
      "Awaiting Employer": {
        label: "Awaiting Employer",
        cta: "View Profile",
        color: "bg-green-100 text-green-800",
      },
      "Interview Requested": {
        label: "Interview Requested",
        cta: "View Profile",
        color: "bg-green-100 text-green-800",
      },
      "Interview Booked": {
        label: "Interview Booked",
        cta: "View Profile",
        color: "bg-green-100 text-green-800",
      },
      "Interview Complete": {
        label: "Interview Complete",
        cta: "View Profile",
        color: "bg-green-100 text-green-800",
      },
      "Offer Issued": {
        label: "Offer Issued",
        cta: "View Profile",
        color: "bg-green-100 text-green-800",
      },

      // Complete - Gray badges to match primary status
      Hired: { label: "Hired", cta: "View", color: "bg-gray-800 text-white" },
      "Not Progressing": {
        label: "Not Progressing",
        cta: "View",
        color: "bg-gray-100 text-gray-800",
      },
    };

    // Fallback for any status not in the map - format it nicely
    const fallbackLabel = subStatus
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return (
      statusMap[subStatus] || {
        label: fallbackLabel,
        cta: "View",
        color: "bg-gray-100 text-gray-800",
      }
    );
  };

  const finalCandidates = candidates.map((candidate) => ({
    ...candidate,
    statusLabel: getStatusLabel(candidate.status),
    subStatusLabel: getSubStatusLabel(candidate.subStatus),
  }));

  // Advanced filtering and sorting
  const filteredCandidates = finalCandidates
    .filter((candidate) => {
      // Search filter
      const searchMatch =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Primary status filter
      const primaryStatusMatch =
        primaryStatusFilter.length === 0 ||
        primaryStatusFilter.includes(candidate.status);

      // Sub status filter
      const subStatusMatch =
        subStatusFilter.length === 0 ||
        subStatusFilter.includes(candidate.subStatus);

      // Score filter
      const scoreMatch =
        scoreFilter.length === 0 ||
        scoreFilter.some((range) => {
          const threshold = parseInt(range);
          return candidate.overallSkillsScore >= threshold;
        });

      return searchMatch && primaryStatusMatch && subStatusMatch && scoreMatch;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "applicationDate":
          comparison =
            new Date(a.applicationDate).getTime() -
            new Date(b.applicationDate).getTime();
          break;
        case "score":
          comparison = a.overallSkillsScore - b.overallSkillsScore;
          break;
        case "default":
          // Default sorting: primary status first, then application date within each status
          const statusPriority = {
            new_applicants: 1,
            in_progress: 2,
            matched_to_employer: 3,
            complete: 4,
          };
          const aPriority = statusPriority[a.status] ?? 5;
          const bPriority = statusPriority[b.status] ?? 5;
          const statusComparison = aPriority - bPriority;
          if (statusComparison !== 0) {
            comparison = statusComparison;
          } else {
            // Within same status, sort by application date (newest first)
            comparison =
              new Date(b.applicationDate).getTime() -
              new Date(a.applicationDate).getTime();
          }
          break;
        default:
          comparison = 0;
      }

      return sortBy === "default"
        ? comparison
        : sortOrder === "desc"
          ? -comparison
          : comparison;
    });

  const candidatesByStatus = {
    new_applicants: applySorting(
      filteredCandidates.filter((c) => c.status === "new_applicants"),
    ),
    in_progress: applySorting(
      filteredCandidates.filter((c) => c.status === "in_progress"),
    ),
    matched_to_employer: applySorting(
      filteredCandidates.filter((c) => c.status === "matched_to_employer"),
    ),
    complete: applySorting(
      filteredCandidates.filter((c) => c.status === "complete"),
    ),
  };
  // Dynamic column layout based on which statuses have candidates
  const visibleColumns = [
    {
      key: "new_applicants",
      label: "New",
      count: candidatesByStatus.new_applicants.length,
      bgColor: "bg-blue-50",
      textColor: "text-blue-900",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      key: "in_progress",
      label: "In Progress",
      count: candidatesByStatus.in_progress.length,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-900",
      badgeColor: "bg-yellow-600 text-white",
    },
    {
      key: "matched_to_employer",
      label: "Matched to Employer",
      count: candidatesByStatus.matched_to_employer.length,
      bgColor: "bg-green-50",
      textColor: "text-green-900",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      key: "complete",
      label: "Complete",
      count: candidatesByStatus.complete.length,
      bgColor: "bg-gray-50",
      textColor: "text-gray-900",
      badgeColor: "bg-gray-100 text-gray-800",
    },
  ].filter((column) => column.count > 0);

  return (
    <div className="min-h-screen bg-gray-50 admin-compact-mode">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className=" flex flex-row items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {job?.job_title}
                </h1>
                <p className="text-gray-600">
                  {job?.company_name} • {candidates.length} Applicants
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/admin/jobs-managment/${job.id}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white border-gray-200 text-sm"
            >
              <Eye className="h-4 w-4" />
              <span>View Job Details</span>
            </Button>
          </div>
          {/* Search, Filters and View Toggle */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Primary Status Filter */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="px-3 py-2 h-9 text-sm border-gray-300 hover:border-gray-400"
                  >
                    Primary Status
                    {primaryStatusFilter.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-2 px-1.5 py-0.5 text-xs"
                      >
                        {primaryStatusFilter.length}
                      </Badge>
                    )}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => {
                      const isChecked =
                        primaryStatusFilter.includes("new_applicants");
                      const newValues = isChecked
                        ? primaryStatusFilter.filter(
                            (v) => v !== "new_applicants",
                          )
                        : [...primaryStatusFilter, "new_applicants"];
                      setPrimaryStatusFilter(newValues);
                      if (isChecked) setSubStatusFilter([]);
                    }}
                  >
                    <Checkbox
                      checked={primaryStatusFilter.includes("new_applicants")}
                      className="pointer-events-none"
                    />
                    <span>New</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => {
                      const isChecked =
                        primaryStatusFilter.includes("in_progress");
                      const newValues = isChecked
                        ? primaryStatusFilter.filter((v) => v !== "in_progress")
                        : [...primaryStatusFilter, "in_progress"];
                      setPrimaryStatusFilter(newValues);
                      if (isChecked) setSubStatusFilter([]);
                    }}
                  >
                    <Checkbox
                      checked={primaryStatusFilter.includes("in_progress")}
                      className="pointer-events-none"
                    />
                    <span>In Progress</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => {
                      const isChecked = primaryStatusFilter.includes(
                        "matched_to_employer",
                      );
                      const newValues = isChecked
                        ? primaryStatusFilter.filter(
                            (v) => v !== "matched_to_employer",
                          )
                        : [...primaryStatusFilter, "matched_to_employer"];
                      setPrimaryStatusFilter(newValues);
                      if (isChecked) setSubStatusFilter([]);
                    }}
                  >
                    <Checkbox
                      checked={primaryStatusFilter.includes(
                        "matched_to_employer",
                      )}
                      className="pointer-events-none"
                    />
                    <span>Matched to Employer</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => {
                      const isChecked =
                        primaryStatusFilter.includes("complete");
                      const newValues = isChecked
                        ? primaryStatusFilter.filter((v) => v !== "complete")
                        : [...primaryStatusFilter, "complete"];
                      setPrimaryStatusFilter(newValues);
                      if (isChecked) setSubStatusFilter([]);
                    }}
                  >
                    <Checkbox
                      checked={primaryStatusFilter.includes("complete")}
                      className="pointer-events-none"
                    />
                    <span>Complete</span>
                  </DropdownMenuItem>
                  {primaryStatusFilter.length > 0 && (
                    <>
                      <div className="border-t my-1" />
                      <DropdownMenuItem
                        className="flex items-center justify-center text-blue-600 cursor-pointer"
                        onClick={() => {
                          setPrimaryStatusFilter([]);
                          setSubStatusFilter([]);
                        }}
                      >
                        Clear All
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Sub Status Filter */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="px-3 py-2 h-9 text-sm border-gray-300 hover:border-gray-400"
                    disabled={getAvailableSubStatuses().length === 0}
                  >
                    Sub Status
                    {subStatusFilter.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-2 px-1.5 py-0.5 text-xs"
                      >
                        {subStatusFilter.length}
                      </Badge>
                    )}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {getAvailableSubStatuses().length === 0 ? (
                    <DropdownMenuItem disabled className="text-gray-500">
                      Select primary status first
                    </DropdownMenuItem>
                  ) : (
                    <>
                      {getAvailableSubStatuses().map((subStatus) => (
                        <DropdownMenuItem
                          key={subStatus}
                          className="flex items-center space-x-2 cursor-pointer"
                          onSelect={(e) => e.preventDefault()}
                          onClick={() => {
                            const isChecked =
                              subStatusFilter.includes(subStatus);
                            const newValues = isChecked
                              ? subStatusFilter.filter((v) => v !== subStatus)
                              : [...subStatusFilter, subStatus];
                            setSubStatusFilter(newValues);
                          }}
                        >
                          <Checkbox
                            checked={subStatusFilter.includes(subStatus)}
                            className="pointer-events-none"
                          />
                          <span>{getSubStatusLabel(subStatus)}</span>
                        </DropdownMenuItem>
                      ))}
                      {subStatusFilter.length > 0 && (
                        <>
                          <div className="border-t my-1" />
                          <DropdownMenuItem
                            className="flex items-center justify-center text-[#E2007A] cursor-pointer"
                            onClick={() => setSubStatusFilter([])}
                          >
                            Clear All
                          </DropdownMenuItem>
                        </>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Score Filter */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="px-3 py-2 h-9 text-sm border-gray-300 hover:border-gray-400"
                  >
                    {scoreFilter.length === 0
                      ? "All Scores"
                      : `${scoreFilter.length} Score Range${scoreFilter.length !== 1 ? "s" : ""}`}
                    {scoreFilter.length > 0 && (
                      <Badge className="ml-2 bg-[#E2007A] text-white text-xs min-w-[18px] h-4 rounded-full flex items-center justify-center p-0">
                        {scoreFilter.length}
                      </Badge>
                    )}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40">
                  {["90+", "80+", "70+", "60+", "50+"].map((scoreRange) => (
                    <DropdownMenuItem
                      key={scoreRange}
                      className="flex items-center space-x-2 cursor-pointer"
                      onSelect={(e) => e.preventDefault()}
                      onClick={() => {
                        const isChecked = scoreFilter.includes(scoreRange);
                        const newValues = isChecked
                          ? scoreFilter.filter((v) => v !== scoreRange)
                          : [...scoreFilter, scoreRange];
                        setScoreFilter(newValues);
                      }}
                    >
                      <Checkbox
                        checked={scoreFilter.includes(scoreRange)}
                        className="pointer-events-none"
                      />
                      <span>{scoreRange}% Score</span>
                    </DropdownMenuItem>
                  ))}
                  {scoreFilter.length > 0 && (
                    <>
                      <div className="border-t my-1" />
                      <DropdownMenuItem
                        className="flex items-center justify-center text-blue-600 cursor-pointer"
                        onClick={() => setScoreFilter([])}
                      >
                        Clear All
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="default">Default Order</option>
                <option value="applicationDate">Sort by Date Applied</option>
                <option value="name">Sort by Name</option>
                <option value="score">Sort by Score</option>
              </select>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-2 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
              >
                {sortOrder === "asc" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>

            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => value && setViewMode(value)}
              className="bg-gray-100 rounded-lg p-1"
            >
              <ToggleGroupItem
                value="kanban"
                className="flex items-center gap-2 px-3 py-2"
              >
                <Kanban className="h-4 w-4" />
                Kanban
              </ToggleGroupItem>
              <ToggleGroupItem
                value="grid"
                className="flex items-center gap-2 px-3 py-2"
              >
                <LayoutGrid className="h-4 w-4" />
                Grid
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      {/* Content Area */}
      <div
        className={`${assessmentSplitViewOpen ? "h-[calc(100vh-140px)]" : "min-h-[calc(100vh-140px)]"} relative`}
      >
        {/* Main Content */}
        <div
          className={`w-full ${viewMode === "kanban" ? `grid ${gridColsClass} gap-4 p-4 h-full` : "p-4 overflow-y-auto"}`}
        >
          {viewMode === "kanban" ? (
            // Kanban View - Dynamic columns based on visible data
            <>
              {visibleColumns.map((column) => (
                <div key={column.key} className="min-h-0">
                  <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
                    <div className={`p-3 border-b ${column.bgColor}`}>
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-medium text-sm ${column.textColor}`}
                        >
                          {column.label}
                        </h3>
                        <Badge
                          className={`${column.badgeColor} text-xs min-w-[24px] justify-center`}
                        >
                          {column.count}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                      {candidatesByStatus[column.key].map((candidate) => {
                        const subStatusDetails = getSubStatusDetails(
                          candidate.subStatus,
                        );
                        return (
                          <Card
                            key={candidate.id}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => openAssessmentSplitView(candidate)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <img
                                  src={candidate.profilePicture}
                                  alt={candidate.name}
                                  className="w-10 h-10 rounded-full border border-gray-200"
                                />
                                <div>
                                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                    {candidate.name}
                                    {(() => {
                                      const candidateData = getCandidateData(
                                        candidate.id,
                                      );
                                      return (
                                        candidateData.hasPollenInteraction && (
                                          <span className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-xs text-white font-bold">
                                            ✓
                                          </span>
                                        )
                                      );
                                    })()}
                                  </h4>
                                  <div
                                    className={`text-sm flex items-center font-medium ${
                                      isScoreApproved(candidate)
                                        ? "text-pink-600"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {candidate.overallSkillsScore}% Score
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 mb-3">
                                <div className="text-xs text-gray-500 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Applied{" "}
                                  {new Date(
                                    candidate.applicationDate,
                                  ).toLocaleDateString("en-GB")}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  <Badge
                                    className={
                                      subStatusDetails.color + " text-xs"
                                    }
                                  >
                                    {subStatusDetails.label}
                                  </Badge>
                                  {getStoppedAtStage(candidate.id) && (
                                    <Badge className="bg-white text-gray-700 border border-gray-300 text-xs">
                                      Stopped at{" "}
                                      {getStoppedAtStage(candidate.id)}
                                    </Badge>
                                  )}
                                  {hasUnreviewedEmployerFeedback(
                                    candidate.id,
                                  ) && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const candidateData = getCandidateData(
                                          candidate.id,
                                        );
                                        setSelectedFeedback(
                                          candidateData.employerFeedback,
                                        );
                                        setShowFeedbackReview(true);
                                      }}
                                      className="ml-1"
                                      title="Review employer feedback"
                                    >
                                      <AlertTriangle className="h-4 w-4 text-red-500" />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Action buttons at the bottom */}
                              {(() => {
                                // Check if any filters are active
                                const hasActiveFilters =
                                  primaryStatusFilter.length > 0 ||
                                  subStatusFilter.length > 0 ||
                                  scoreFilter.length > 0 ||
                                  searchTerm.length > 0;

                                if (hasActiveFilters) {
                                  // Filtered view: Subtle buttons with text
                                  return (
                                    <div className="flex gap-2 flex-wrap">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          sessionStorage.setItem(
                                            "previousPage",
                                            `/admin/job-applicants-grid/${jobId}`,
                                          );
                                          setLocation(
                                            `/admin/consolidated-candidate-profile/${candidate.id}`,
                                          );
                                        }}
                                        className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-xs px-3 py-1 h-7 flex items-center gap-1"
                                      >
                                        <User className="h-3 w-3" />
                                        Profile
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openAssessmentSplitView(candidate);
                                        }}
                                        className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-xs px-3 py-1 h-7 flex items-center gap-1"
                                      >
                                        <FileText className="h-3 w-3" />
                                        Assessment
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          sessionStorage.setItem(
                                            "previousPage",
                                            `/admin/job-applicants-kanban/${jobId}`,
                                          );
                                          setLocation(
                                            `/admin/candidate-message/${candidate.id}`,
                                          );
                                        }}
                                        className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-xs px-3 py-1 h-7 flex items-center gap-1"
                                      >
                                        <MessageCircle className="h-3 w-3" />
                                        Message
                                      </Button>
                                    </div>
                                  );
                                } else {
                                  // Unfiltered view: Subtle buttons aligned left
                                  return (
                                    <div className="flex gap-2 justify-start">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          sessionStorage.setItem(
                                            "previousPage",
                                            `/admin/job-applicants-grid/${jobId}`,
                                          );
                                          setLocation(
                                            `/admin/consolidated-candidate-profile/${candidate.id}`,
                                          );
                                        }}
                                        className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-xs px-2 py-1 h-7"
                                      >
                                        <User className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openAssessmentSplitView(candidate);
                                        }}
                                        className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-xs px-2 py-1 h-7"
                                      >
                                        <FileText className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          sessionStorage.setItem(
                                            "previousPage",
                                            `/admin/job-applicants-kanban/${jobId}`,
                                          );
                                          setLocation(
                                            `/admin/candidate-message/${candidate.id}`,
                                          );
                                        }}
                                        className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-xs px-2 py-1 h-7"
                                      >
                                        <MessageCircle className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  );
                                }
                              })()}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            // Grid View
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-900">
                        Candidate
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-900">
                        Score
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-900">
                        Primary Status
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-900">
                        Applied
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-900">
                        Sub Status
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.map((candidate) => {
                      const subStatusDetails = getSubStatusDetails(
                        candidate.subStatus,
                      );
                      return (
                        <tr
                          key={candidate.id}
                          className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => openAssessmentSplitView(candidate)}
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={candidate.profilePicture}
                                alt={candidate.name}
                                className="w-8 h-8 rounded-full border"
                              />
                              <div>
                                <div className="font-medium text-gray-900 flex items-center gap-2">
                                  {candidate.name}
                                  {getCandidateData(candidate.id)
                                    .hasPollenInteraction && (
                                    <span className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-xs text-white font-bold">
                                      ✓
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span
                              className={`font-bold ${
                                candidate.status === "in_progress" ||
                                candidate.status === "matched_to_employer" ||
                                candidate.status === "complete"
                                  ? "text-pink-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {candidate.overallSkillsScore}%
                            </span>
                          </td>
                          <td className="p-3">
                            <Badge
                              className={`text-xs min-w-[80px] justify-center ${
                                candidate.status === "new_applicants"
                                  ? "bg-blue-600 text-white"
                                  : candidate.status === "in_progress"
                                    ? "bg-yellow-600 text-white"
                                    : candidate.status === "matched_to_employer"
                                      ? "bg-green-600 text-white"
                                      : "bg-gray-600 text-white"
                              }`}
                            >
                              {getStatusLabel(candidate.status)}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-gray-600">
                            {new Date(
                              candidate.applicationDate,
                            ).toLocaleDateString("en-GB")}
                          </td>
                          <td className="p-3">
                            <div className="flex justify-start">
                              <div className="flex flex-wrap gap-1">
                                <Badge
                                  className={`${subStatusDetails.color} text-xs min-w-[100px] justify-start`}
                                >
                                  {subStatusDetails.label}
                                </Badge>
                                {getStoppedAtStage(candidate.id) && (
                                  <Badge className="bg-white text-gray-700 border border-gray-300 text-xs">
                                    Stopped at {getStoppedAtStage(candidate.id)}
                                  </Badge>
                                )}
                                {hasUnreviewedEmployerFeedback(
                                  candidate.id,
                                ) && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const candidateData = getCandidateData(
                                        candidate.id,
                                      );
                                      setSelectedFeedback(
                                        candidateData.employerFeedback,
                                      );
                                      setShowFeedbackReview(true);
                                    }}
                                    className="ml-1"
                                    title="Review employer feedback"
                                  >
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  sessionStorage.setItem(
                                    "previousPage",
                                    `/admin/job-applicants-grid/${jobId}`,
                                  );
                                  setLocation(
                                    `/admin/consolidated-candidate-profile/${candidate.id}`,
                                  );
                                }}
                                className="text-xs"
                              >
                                <User className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openAssessmentSplitView(candidate);
                                }}
                                className="text-xs"
                              >
                                <FileText className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  sessionStorage.setItem(
                                    "previousPage",
                                    `/admin/job-applicants-grid/${jobId}`,
                                  );
                                  setLocation(
                                    `/admin/candidate-message/${candidate.id}`,
                                  );
                                }}
                                className="text-xs"
                              >
                                <MessageCircle className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
