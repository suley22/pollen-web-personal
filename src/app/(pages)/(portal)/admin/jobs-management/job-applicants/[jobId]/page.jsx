"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AdminRoutes } from "../../../router";
import {
  ArrowLeft,
  Eye,
  Search,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  Kanban,
  AlertTriangle,
  User,
  FileText,
  MessageCircle,
  TrendingUp,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  X,
  Lightbulb,
  BarChart3,
  ThumbsUp,
  Check,
  Edit3,
  Lock,
  UserCheck,
  UserX,
  SplitSquareHorizontal,
  Building2,
} from "lucide-react";
import { useToast } from "@/lib/hooks/use-toast";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent } from "@/components/ui/card";
import { useJobData } from "./hooks/useJobData";
import {
  getUnifiedCandidateData,
  getInteractionDisplayText,
} from "./candidateUtils";
import { apiRequest } from "@/lib/query-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@radix-ui/react-dialog";

export default function JobApplicantsPage({ params }) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const { candidates, job, loading, error, refetch } = useJobData(
    resolvedParams.jobId,
  );

  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(
        `${resolvedParams.jobId}-searchTerm`,
      );
      return saved || "";
    }
    return "";
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [primaryStatusFilter, setPrimaryStatusFilter] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(
        `job-${resolvedParams.jobId}-primaryStatusFilter`,
      );
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [subStatusFilter, setSubStatusFilter] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(
        `job-${resolvedParams.jobId}-subStatusFilter`,
      );
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [scoreFilter, setScoreFilter] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(
        `job-${resolvedParams.jobId}-scoreFilter`,
      );
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [sortBy, setSortBy] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(
        `job-${resolvedParams.jobId}-sortBy`,
      );
      return saved || "default";
    }
    return "default";
  });
  const [sortOrder, setSortOrder] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(
        `job-${resolvedParams.jobId}-sortOrder`,
      );
      return saved || "desc";
    }
    return "desc";
  });
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(
        `job-${resolvedParams.jobId}-viewMode`,
      );
      return saved || "grid";
    }
    return "grid";
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
      const isInterviewComplete =
        selectedAssessment.subStatus === "pollen_interview_complete" ||
        selectedAssessment.subStatus === "awaiting_employer" ||
        selectedAssessment.subStatus === "interview_requested" ||
        selectedAssessment.subStatus === "interview_booked" ||
        selectedAssessment.subStatus === "interview_complete" ||
        selectedAssessment.subStatus === "offer_issued" ||
        selectedAssessment.subStatus === "hired";
      return isInterviewComplete;
    }
    return false;
  });
  const [editedScores, setEditedScores] = useState({
    creative: 8,
    dataAnalysis: 8,
    communication: 7,
    strategic: 8,
  });
  const [pendingAction, setPendingAction] = useState();
  const [isExecutingAction, setIsExecutingAction] = useState(false);

  const { toast } = useToast();

  // Estados adicionales faltantes
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showFeedbackReview, setShowFeedbackReview] = useState(false);

  // Variable para jobId
  const jobId = resolvedParams.jobId;

  const handleSaveScores = () => {
    // In a real app, this would make an API call to save the scores
    toast({
      title: "Scores updated",
      description: "Assessment scores have been saved successfully.",
    });
    setIsEditing(false);
    setScoresApproved(false); // Reset approval status when scores are edited
  };
  const handleCandidateAction = (action) => {
    if (action === "interview") {
      // Skip confirmation dialog for interview invitations and proceed directly
      executeCandidateAction(action);
    } else {
      // Show confirmation dialog for reject/match actions
      setPendingAction(action);
      setConfirmDialogOpen(true);
    }
  };

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

  const closeAssessmentSplitView = () => {
    setAssessmentSplitViewOpen(false);
    setIsMobileFullPage(false);
    setSelectedAssessment(null);
    setScoresApproved(false); // Reset state when closing
    setScoresLocked(false); // Reset state when closing
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

  // Status mapping functions
  const getStatusLabel = (status) => {
    // Handle undefined, null, or empty status
    if (!status || typeof status !== "string") {
      return "Unknown";
    }

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
    // Handle undefined, null, or empty subStatus
    if (!subStatus || typeof subStatus !== "string") {
      return "Unknown Status";
    }

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

    // Handle undefined, null, or empty subStatus
    if (!subStatus || typeof subStatus !== "string") {
      return {
        label: "Unknown Status",
        cta: "View",
        color: "bg-gray-100 text-gray-800",
      };
    }

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
    // Map job_seeker data to expected structure (based on actual DB schema)
    name: candidate.job_seeker?.name || "Unknown",
    email: candidate.job_seeker?.email || "",
    location: candidate.job_seeker?.location || "",
    experience_level: candidate.job_seeker?.experience_level || "",
    overall_skills_score: candidate.job_seeker?.overall_skills_score || 0,
    profile_picture: candidate.job_seeker?.profile_picture || "",
    // Now use real status fields from job_applications (after migration)
    status: candidate.status || "new_applicants",
    subStatus: candidate.sub_status || "Unopened",
    statusLabel: getStatusLabel(candidate.status || "new_applicants"),
    subStatusLabel: getSubStatusLabel(candidate.sub_status || "Unopened"),
    // Add application date for sorting
    applied_at: candidate.created_at,
    // Map additional fields from job_applications
    overall_score: candidate.overall_score || 0,
    scores_approved: candidate.scores_approved || false,
    scores_locked: candidate.scores_locked || false,
    last_interaction_date: candidate.last_interaction_date,
    last_pollen_team_member: candidate.last_pollen_team_member,
    is_fast_track: candidate.is_fast_track || false,
    ai_scores: candidate.ai_scores || {},
    assessment_data: candidate.assessment_data || null,
    employer_feedback: candidate.employer_feedback || null,
  }));

  // Advanced filtering and sorting
  const filteredCandidates = finalCandidates
    .filter((candidate) => {
      // Search filter (data is now safely mapped)
      const searchMatch =
        (candidate.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (candidate.email || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

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
        case "default": {
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
        }
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

  const columnCount = Math.max(visibleColumns.length, 1); // Ensure at least 1 column
  const gridColsClass =
    columnCount === 1
      ? "grid-cols-1"
      : columnCount === 2
        ? "grid-cols-2"
        : columnCount === 3
          ? "grid-cols-3"
          : "grid-cols-4";

  // Funciones auxiliares que parecen estar faltando
  const isScoreApproved = (candidate) => {
    // Implementar lógica para determinar si el score está aprobado
    return candidate.overallSkillsScore >= 70;
  };

  const getStoppedAtStage = (candidateId) => {
    // Implementar lógica para obtener en qué etapa se detuvo
    return null; // Por ahora retornar null
  };

  const hasUnreviewedEmployerFeedback = (candidateId) => {
    // Implementar lógica para verificar feedback no revisado
    return false; // Por ahora retornar false
  };

  const getCandidateData = (candidateId) => {
    // Implementar lógica para obtener datos del candidato
    return candidates.find((c) => c.id === candidateId);
  };
  const [isEditing, setIsEditing] = useState(false);

  // TODO: REVISAR Función para ejecutar acciones sobre candidatos
  const executeCandidateAction = async (action) => {
    setIsExecutingAction(true);
    try {
      await apiRequest(
        "PUT",
        `/api/admin/candidates/${selectedAssessment?.id}/status`,
        {
          action,
          reviewedBy: "Holly",
          reviewedAt: new Date().toISOString(),
        },
      );

      // Refrescar los datos después de la acción
      await refetch();

      setConfirmDialogOpen(false);
      setPendingAction(null);
      setScoresLocked(true); // Lock scores after final action

      // Route to interview availability page for interview invitations (no toast needed)
      if (action === "interview" && selectedAssessment) {
        // Directly navigate to interview availability without showing a toast
        router.push(`/admin/interview-availability/${selectedAssessment.id}`);
      } else {
        // Show toast for other actions only
        const actionLabels = {
          reject: "marked as not progressing",
          match: "matched to employer",
          interview: "invited to interview",
        };
        toast({
          title: "Candidate Updated",
          description: `Candidate has been ${actionLabels[action]} successfully`,
        });
        closeAssessmentSplitView();
      }
    } catch (error) {
      console.error("Error executing candidate action:", error);
      toast({
        title: "Error",
        description: "Failed to update candidate status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExecutingAction(false);
    }
  };

  // Navigate between candidates within filtered view (respects all filters)
  const navigateToCandidate = (direction) => {
    if (!selectedAssessment) return;

    // Use filtered candidates instead of status group - respects all current filters
    const currentIndex = filteredCandidates.findIndex(
      (c) => c.id === selectedAssessment.id,
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredCandidates.length - 1;
    } else {
      newIndex =
        currentIndex < filteredCandidates.length - 1 ? currentIndex + 1 : 0;
    }

    const newCandidate = filteredCandidates[newIndex];
    setSelectedAssessment(newCandidate);

    // Dynamic locking based on new candidate status
    const isInterviewComplete =
      newCandidate.subStatus === "pollen_interview_complete" ||
      newCandidate.subStatus === "awaiting_employer" ||
      newCandidate.subStatus === "interview_requested" ||
      newCandidate.subStatus === "interview_booked" ||
      newCandidate.subStatus === "interview_complete" ||
      newCandidate.subStatus === "offer_issued" ||
      newCandidate.subStatus === "hired";

    if (isInterviewComplete) {
      setScoresApproved(true); // Scores are automatically approved for completed interviews
      setScoresLocked(true); // Lock scores for completed interviews
    } else {
      setScoresApproved(false); // Reset approval state for new assessment
      setScoresLocked(false); // Reset lock state for new assessment
    }
    setIsEditing(false);
  };

  const confirmCandidateAction = () => {
    if (pendingAction) {
      executeCandidateAction(pendingAction);
    }
  };

  // Estados de loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading job applicants...</p>
        </div>
      </div>
    );
  }

  // Manejo de errores
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <AlertTriangle className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error loading data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={refetch} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Si no hay datos
  if (!candidates || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

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
              onClick={() => router.push(AdminRoutes.jobReview(job.id))}
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

            {/* TODO:check filters */}

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
                                <Avatar className="h-16 w-16">
                                  <AvatarImage
                                    src={candidate.profile_picture}
                                    alt={candidate.name}
                                  />
                                  <AvatarFallback>
                                    <Building2 className="h-8 w-8" />
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                    {candidate.name}
                                    {(() => {
                                      const candidateData = candidates.map(
                                        (c) => ({
                                          id: c.id,
                                        }),
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
                              <Avatar className="h-16 w-16">
                                <AvatarImage
                                  src={candidate.profile_picture}
                                  alt={candidate.name}
                                />
                                <AvatarFallback>
                                  <Building2 className="h-8 w-8" />
                                </AvatarFallback>
                              </Avatar>
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

        {/* Assessment Split View - Overlay */}
        {assessmentSplitViewOpen && selectedAssessment && (
          <div className="fixed top-0 right-0 w-2/3 h-full border-l border-gray-200 bg-white z-50 shadow-xl flex flex-col min-w-[800px]">
            <div
              style={{
                backgroundColor: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
                width: "100%",
                margin: 0,
                padding: "12px 16px",
                boxSizing: "border-box",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "auto",
                  margin: 0,
                  padding: 0,
                  position: "relative",
                }}
              >
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Image
                    src={selectedAssessment.profile_picture}
                    alt={selectedAssessment.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border"
                  />
                  <h3 className="font-semibold text-sm">
                    {selectedAssessment.name} - Assessment
                  </h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    flexShrink: 0,
                  }}
                >
                  {/* Provide Update button for candidates who completed Pollen interviews */}
                  {selectedAssessment.subStatus ===
                    "Pollen Interview Complete" && (
                    <Button
                      variant="default"
                      size="sm"
                      // TODO: Enable navigation when the page is ready
                      // onClick={() =>
                      //   setLocation(
                      //     buildUrlWithCurrentState(
                      //       `/admin/provide-update/${selectedAssessment.id}`,
                      //     ),
                      //   )
                      // }
                      className="text-xs px-1 py-1 bg-[#E2007A] hover:bg-[#E2007A]/90 text-white"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Provide Update
                    </Button>
                  )}

                  {/* Review Feedback button for candidates who stopped at employer */}
                  {(() => {
                    const apiCandidate = candidates.find(
                      (c) => c.id === selectedAssessment.id,
                    );
                    return (
                      apiCandidate?.subStatus === "stopped_at_employer" &&
                      hasUnreviewedEmployerFeedback(selectedAssessment.id)
                    );
                  })() && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        const apiCandidate = candidates.find(
                          (c) => c.id === selectedAssessment.id,
                        );
                        const feedbackData =
                          apiCandidate?.employerFeedback ||
                          getCandidateData(selectedAssessment.id)
                            .employerFeedback;
                        setSelectedFeedback(feedbackData);
                        setShowFeedbackReview(true);
                      }}
                      className="text-xs px-1 py-1 bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Review Feedback
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Store current page context for proper back navigation
                      sessionStorage.setItem(
                        "previousPage",
                        `@/admin/job-applicants/${jobId}`,
                      );
                      router.push(
                        `@/admin/job-applicants/candidate-profile/${selectedAssessment.id}`,
                      );
                    }}
                    className="text-xs px-1 py-1"
                  >
                    <User className="h-3 w-3 mr-1" />
                    Profile
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      sessionStorage.setItem(
                        "previousPage",
                        `@/admin/job-applicants/${jobId}`,
                      );
                      router.push(
                        `@/admin/job-applicants/candidate-profile/${selectedAssessment.id}`,
                      );
                    }}
                    className="text-xs px-1 py-1"
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Message
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentIndex = filteredCandidates.findIndex(
                        (c) => c.id === selectedAssessment?.id,
                      );
                      const prevIndex = currentIndex - 1;
                      if (prevIndex >= 0) {
                        setSelectedAssessment(filteredCandidates[prevIndex]);
                      }
                    }}
                    disabled={
                      filteredCandidates.findIndex(
                        (c) => c.id === selectedAssessment?.id,
                      ) === 0
                    }
                    className="text-xs px-1 py-1"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Button>

                  <span className="text-xs text-gray-600 px-1">
                    {filteredCandidates.findIndex(
                      (c) => c.id === selectedAssessment?.id,
                    ) + 1}{" "}
                    of {filteredCandidates.length}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentIndex = filteredCandidates.findIndex(
                        (c) => c.id === selectedAssessment?.id,
                      );
                      const nextIndex = currentIndex + 1;
                      if (nextIndex < filteredCandidates.length) {
                        setSelectedAssessment(filteredCandidates[nextIndex]);
                      }
                    }}
                    disabled={
                      filteredCandidates.findIndex(
                        (c) => c.id === selectedAssessment?.id,
                      ) ===
                      filteredCandidates.length - 1
                    }
                    className="text-xs px-1 py-1"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Ensure we preserve the selected assessment when switching to full page
                      if (selectedAssessment) {
                        setAssessmentSplitViewOpen(false);
                        setIsMobileFullPage(true);
                        // Force a re-render by briefly clearing and setting the assessment
                        setTimeout(() => {
                          setSelectedAssessment(selectedAssessment);
                        }, 10);
                      }
                    }}
                    className="text-xs px-1 py-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Full Page
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeAssessmentSplitView}
                    className="p-0 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 bg-white flex-shrink-0">
              <div className="text-sm text-gray-600 flex items-center justify-between">
                {getCandidateData(selectedAssessment.id)
                  .hasPollenInteraction ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      ✓
                    </span>
                    <span className="text-sm">
                      Spoke to{" "}
                      {
                        getCandidateData(selectedAssessment.id)
                          .lastPollenTeamMember
                      }{" "}
                      on{" "}
                      {
                        getCandidateData(selectedAssessment.id)
                          .lastInteractionDate
                      }
                    </span>
                  </div>
                ) : (
                  <span className="text-sm">
                    {getInteractionDisplayText(
                      getCandidateData(selectedAssessment.id),
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Overall Score */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#E2007A] mb-1">
                    {Math.round(
                      ((editedScores.creative +
                        editedScores.dataAnalysis +
                        editedScores.communication +
                        editedScores.strategic) /
                        4) *
                        10,
                    )}
                    %
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    Overall Score
                  </div>
                </div>
                <div className="w-6" />
                <div>
                  <span className="text-gray-600 text-sm">
                    Submission Date:
                  </span>
                  <div className="font-medium text-gray-900">16/01/2025</div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0">
              {/* Assessment Content Wrapper */}
              <div className="p-3 space-y-4">
                {/* Authentic Assessment Q&A Section - Using Real Assessment Data */}
                <div className="space-y-4">
                  {selectedAssessment.assessmentSubmission?.responses?.map(
                    (response, index) => {
                      // Remove duplicate numbering from question text (e.g., "Q1. Describe..." becomes "Describe...")
                      const cleanQuestion = response.question.replace(
                        /^Q\d+\.\s*/,
                        "",
                      );

                      return (
                        <div
                          key={index}
                          className="border rounded-lg p-4 bg-white"
                        >
                          <div className="font-medium text-sm mb-3 text-gray-700">
                            Q{index + 1}: {cleanQuestion}
                          </div>
                          <div className="text-sm text-gray-600 mb-3 leading-relaxed">
                            {response.response}
                          </div>
                          <div className="text-xs text-gray-500">
                            Word count: {response.wordCount}
                          </div>
                        </div>
                      );
                    },
                  ) || (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No assessment responses available
                      </p>
                    </div>
                  )}
                </div>

                {/* Individual Scores Section - Moved below Q&A */}
                <div className="border rounded-lg bg-gray-50">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Individual Assessment Scores
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Rate performance across key areas (1-10 scale)
                    </p>
                  </div>
                  <div className="p-6 pb-8 space-y-6">
                    {/* Creative Campaign Development */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-sm">
                          Creative Campaign Development
                        </span>
                        <span className="ml-auto text-lg font-bold text-[#E2007A]">
                          {editedScores.creative}/10
                        </span>
                      </div>
                      {isEditing ? (
                        <div className="px-2">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={editedScores.creative}
                            onChange={(e) =>
                              setEditedScores((prev) => ({
                                ...prev,
                                creative: parseInt(e.target.value),
                              }))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                          </div>
                        </div>
                      ) : (
                        <div className="px-2">
                          <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                            <div
                              className="h-full bg-[#E2007A] rounded-lg"
                              style={{
                                width: `${editedScores.creative * 10}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Data Analysis & Insights */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-sm">
                          Data Analysis & Insights
                        </span>
                        <span className="ml-auto text-lg font-bold text-[#E2007A]">
                          {editedScores.dataAnalysis}/10
                        </span>
                      </div>
                      {isEditing ? (
                        <div className="px-2">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={editedScores.dataAnalysis}
                            onChange={(e) =>
                              setEditedScores((prev) => ({
                                ...prev,
                                dataAnalysis: parseInt(e.target.value),
                              }))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                          </div>
                        </div>
                      ) : (
                        <div className="px-2">
                          <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                            <div
                              className="h-full bg-[#E2007A] rounded-lg"
                              style={{
                                width: `${editedScores.dataAnalysis * 10}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Communication & Presentation */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-sm">
                          Communication & Presentation
                        </span>
                        <span className="ml-auto text-lg font-bold text-[#E2007A]">
                          {editedScores.communication}/10
                        </span>
                      </div>
                      {isEditing ? (
                        <div className="px-2">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={editedScores.communication}
                            onChange={(e) =>
                              setEditedScores((prev) => ({
                                ...prev,
                                communication: parseInt(e.target.value),
                              }))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                          </div>
                        </div>
                      ) : (
                        <div className="px-2">
                          <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                            <div
                              className="h-full bg-[#E2007A] rounded-lg"
                              style={{
                                width: `${editedScores.communication * 10}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Strategic Thinking */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-sm">
                          Strategic Thinking
                        </span>
                        <span className="ml-auto text-lg font-bold text-[#E2007A]">
                          {editedScores.strategic}/10
                        </span>
                      </div>
                      {isEditing ? (
                        <div className="px-2">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={editedScores.strategic}
                            onChange={(e) =>
                              setEditedScores((prev) => ({
                                ...prev,
                                strategic: parseInt(e.target.value),
                              }))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                          </div>
                        </div>
                      ) : (
                        <div className="px-2">
                          <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                            <div
                              className="h-full bg-[#E2007A] rounded-lg"
                              style={{
                                width: `${editedScores.strategic * 10}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Next Steps Section */}
                <div className="border rounded-lg bg-gray-50">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Next Steps
                    </h3>
                  </div>

                  <div className="p-6 pb-8 space-y-6">
                    {/* Step 1 - Score Review */}
                    <div className="border rounded-lg p-6 bg-white">
                      <div className="space-y-4">
                        <h4 className="text-xs sm:text-sm font-medium text-gray-900">
                          Step 1: Assessment Score Review
                        </h4>
                        <p className="text-xs text-gray-600 mb-4">
                          Review AI-generated scores and make adjustments if
                          needed before proceeding.
                        </p>
                        {!isScoreApproved(selectedAssessment) ? (
                          <div className="flex flex-wrap gap-4 items-center">
                            {!scoresApproved ? (
                              <Button
                                onClick={handleApproveAIScores}
                                size="default"
                                className="bg-green-600 hover:bg-green-700 h-12 px-6 text-base font-medium"
                              >
                                <ThumbsUp className="h-5 w-5 mr-2" />
                                Approve Scores
                              </Button>
                            ) : (
                              <div className="bg-green-100 border border-green-200 rounded-lg p-4 inline-flex items-center gap-3 text-green-700">
                                <Check className="h-5 w-5" />
                                <span className="font-medium text-base">
                                  Scores Approved
                                </span>
                              </div>
                            )}

                            {isEditing ? (
                              <>
                                <Button
                                  onClick={handleSaveScores}
                                  size="default"
                                  className="bg-green-600 hover:bg-green-700 h-12 px-6 text-base font-medium"
                                >
                                  <Check className="h-5 w-5 mr-2" />
                                  Save Changes
                                </Button>
                                <Button
                                  variant="outline"
                                  size="default"
                                  onClick={() => setIsEditing(false)}
                                  className="h-12 px-6 text-base font-medium"
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="outline"
                                size="default"
                                onClick={() => setIsEditing(true)}
                                className="h-12 px-6 text-base font-medium"
                              >
                                <Edit3 className="h-5 w-5 mr-2" />
                                Edit Scores
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-gray-700">
                              <Lock className="h-4 w-4" />
                              <span className="font-medium">
                                Scores Locked - Candidate Progressed
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {["Unopened", "Under Review"].includes(
                      selectedAssessment.subStatus,
                    ) &&
                      !scoresApproved &&
                      !isScoreApproved(selectedAssessment) && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-amber-800">
                            <AlertTriangle className="h-5 w-5" />
                            <span className="text-base font-medium">
                              Approve assessment scores before making candidate
                              decision
                            </span>
                          </div>
                        </div>
                      )}

                    {/* Step 2 - Candidate Decision - Lock for completed statuses */}
                    {["Unopened", "Under Review"].includes(
                      selectedAssessment.subStatus,
                    ) ? (
                      <div className="border rounded-lg p-6 bg-white">
                        <div className="space-y-4 pb-18">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2">
                            Step 2: Candidate Decision
                          </h4>
                          <p className="text-xs text-gray-600 mb-3">
                            Choose next action for this candidate. This will
                            lock scores and update their status.
                          </p>
                          <div className="flex gap-4 flex-wrap">
                            {/* Interview button only for unopened/under review */}
                            <Button
                              onClick={() => handleCandidateAction("interview")}
                              disabled={
                                !(
                                  scoresApproved ||
                                  isScoreApproved(selectedAssessment)
                                ) || isExecutingAction
                              }
                              size="default"
                              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 h-12 px-6 text-base font-medium"
                            >
                              <Calendar className="h-5 w-5 mr-2" />
                              Invite to Pollen Interview
                            </Button>

                            <Button
                              onClick={() => handleCandidateAction("match")}
                              disabled={
                                !(
                                  scoresApproved ||
                                  isScoreApproved(selectedAssessment)
                                ) ||
                                isExecutingAction ||
                                !canFastTrackToEmployer
                              }
                              size="default"
                              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 h-12 px-6 text-base font-medium"
                            >
                              <UserCheck className="h-5 w-5 mr-2" />
                              Match to Employer
                            </Button>

                            <Button
                              onClick={() => handleCandidateAction("reject")}
                              disabled={
                                !(
                                  scoresApproved ||
                                  isScoreApproved(selectedAssessment)
                                ) || isExecutingAction
                              }
                              variant="outline"
                              size="default"
                              className="h-12 px-6 text-base font-medium"
                            >
                              <X className="h-5 w-5 mr-2" />
                              Not Progressing
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="border rounded-lg p-6 bg-gray-100">
                        <div className="flex items-center justify-center gap-3 text-gray-700 mb-2">
                          <Lock className="h-5 w-5" />
                          <span className="font-medium text-lg">
                            Step 2: Candidate Decision Completed
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 text-center mb-4">
                          This candidate has progressed beyond initial review
                          stage. Use "Provide Update" for further actions.
                        </p>

                        {/* Show Provide Update button for completed Pollen interview candidates */}
                        {selectedAssessment?.subStatus ===
                          "Pollen Interview Complete" && (
                          <div className="flex justify-center">
                            <Button
                              onClick={() => {
                                setLocation(
                                  buildUrlWithCurrentState(
                                    `/admin/provide-update/${selectedAssessment.id}`,
                                  ),
                                );
                              }}
                              size="default"
                              className="bg-[#E2007A] hover:bg-[#E2007A]/90 text-white h-12 px-6 text-base font-medium"
                            >
                              <MessageCircle className="h-5 w-5 mr-2" />
                              Provide Update
                            </Button>
                          </div>
                        )}

                        {/* Show Review Feedback button for candidates who stopped at employer */}
                        {(() => {
                          const apiCandidate = candidates.find(
                            (c) => c.id === selectedAssessment?.id,
                          );
                          return (
                            apiCandidate?.subStatus === "stopped_at_employer" &&
                            hasUnreviewedEmployerFeedback(selectedAssessment.id)
                          );
                        })() && (
                          <div className="flex justify-center">
                            <Button
                              onClick={() => {
                                const apiCandidate = candidates.find(
                                  (c) => c.id === selectedAssessment.id,
                                );
                                const feedbackData =
                                  apiCandidate?.employerFeedback ||
                                  getCandidateData(selectedAssessment.id)
                                    .employerFeedback;
                                setSelectedFeedback(feedbackData);
                                setShowFeedbackReview(true);
                              }}
                              size="default"
                              className="bg-orange-600 hover:bg-orange-700 text-white h-12 px-6 text-base font-medium"
                            >
                              <MessageSquare className="h-5 w-5 mr-2" />
                              Review Feedback
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              {pendingAction === "interview" &&
                "Are you sure you want to invite this candidate to a Pollen interview?"}
              {pendingAction === "match" &&
                "Are you sure you want to match this candidate to an employer?"}
              {pendingAction === "reject" &&
                "Are you sure you want to mark this candidate as not progressing?"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setConfirmDialogOpen(false);
                setPendingAction(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmCandidateAction}
              disabled={isExecutingAction}
              className={
                pendingAction === "reject"
                  ? "bg-red-600 hover:bg-red-700"
                  : pendingAction === "interview"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-green-600 hover:bg-green-700"
              }
            >
              {isExecutingAction ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Full Page Assessment Modal */}
      {isMobileFullPage && selectedAssessment && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
            {/* Header Section */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {selectedAssessment.name} - Assessment
                    </h2>
                    {/* Provide Update button for candidates who completed Pollen interviews */}
                    {selectedAssessment.subStatus ===
                      "Pollen Interview Complete" && (
                      <Button
                        variant="default"
                        size="sm"
                        // TODO:
                        // onClick={() =>
                        //   setLocation(
                        //     buildUrlWithCurrentState(
                        //       `/admin/provide-update/${selectedAssessment.id}`,
                        //     ),
                        //   )
                        //}
                        className="text-xs px-2 py-1 bg-[#E2007A] hover:bg-[#E2007A]/90 text-white"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Provide Update
                      </Button>
                    )}

                    {/* Review Feedback button for candidates who stopped at employer */}
                    {(() => {
                      const apiCandidate = candidates.find(
                        (c) => c.id === selectedAssessment.id,
                      );
                      return (
                        apiCandidate?.subStatus === "stopped_at_employer" &&
                        hasUnreviewedEmployerFeedback(selectedAssessment.id)
                      );
                    })() && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => {
                          const apiCandidate = candidates.find(
                            (c) => c.id === selectedAssessment.id,
                          );
                          const feedbackData =
                            apiCandidate?.employerFeedback ||
                            getCandidateData(selectedAssessment.id)
                              .employerFeedback;
                          setSelectedFeedback(feedbackData);
                          setShowFeedbackReview(true);
                        }}
                        className="text-xs px-2 py-1 bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Review Feedback
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Profile and Message buttons moved to right side */}
                  <Button
                    variant="outline"
                    size="sm"
                    //TODO:
                    // onClick={() => {
                    //   sessionStorage.setItem(
                    //     "previousPage",
                    //     `/admin/job-applicants-grid/${jobId}`,
                    //   );
                    //   setLocation(
                    //     `/admin/consolidated-candidate-profile/${selectedAssessment.id}`,
                    //   );
                    // }}
                    className="text-xs px-2 py-1"
                  >
                    <User className="h-3 w-3" />
                    Profile
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    // TODO:
                    // onClick={() => {
                    //   sessionStorage.setItem(
                    //     "previousPage",
                    //     `/admin/job-applicants-grid/${jobId}`,
                    //   );
                    //   setLocation(
                    //     `/admin/candidate-message/${selectedAssessment.id}`,
                    //   );
                    // }}
                    className="text-xs px-2 py-1"
                  >
                    <MessageSquare className="h-3 w-3" />
                    Message
                  </Button>

                  {/* Navigation buttons */}
                  <div className="flex items-center gap-2 ml-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateToCandidate("prev")}
                      disabled={
                        filteredCandidates.findIndex(
                          (c) => c.id === selectedAssessment?.id,
                        ) === 0
                      }
                      className="text-xs px-2 py-1"
                    >
                      <ChevronLeft className="h-3 w-3" />
                    </Button>

                    <span className="text-xs text-gray-600 px-2">
                      {filteredCandidates.findIndex(
                        (c) => c.id === selectedAssessment?.id,
                      ) + 1}{" "}
                      of {filteredCandidates.length}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateToCandidate("next")}
                      disabled={
                        filteredCandidates.findIndex(
                          (c) => c.id === selectedAssessment?.id,
                        ) ===
                        filteredCandidates.length - 1
                      }
                      className="text-xs px-2 py-1"
                    >
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsMobileFullPage(false);
                      setAssessmentSplitViewOpen(true);
                    }}
                    className="text-xs px-2 py-1"
                  >
                    <SplitSquareHorizontal className="h-3 w-3 mr-1" />
                    Split Screen
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsMobileFullPage(false);
                      setAssessmentSplitViewOpen(false);
                      setSelectedAssessment(null);
                    }}
                    className="p-2 hover:bg-gray-100 border border-gray-300"
                    title="Close Assessment"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Overall Score Section - Part of same sticky container */}
            <div className="border-t border-gray-200 px-4 py-3">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#E2007A] mb-1">
                    {Math.round(
                      ((editedScores.creative +
                        editedScores.dataAnalysis +
                        editedScores.communication +
                        editedScores.strategic) /
                        4) *
                        10,
                    )}
                    %
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    Overall Score
                  </div>
                </div>
                <div className="h-10 w-px bg-gray-300" />
                <div>
                  <span className="text-gray-600 text-sm">
                    Submission Date:
                  </span>
                  <div className="font-medium text-gray-900">16/01/2025</div>
                </div>
              </div>
            </div>

            {/* Interaction Info Section - Positioned beneath top panel like split screen */}
            <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
              {(() => {
                const candidateData = getCandidateData(selectedAssessment.id);
                return candidateData.hasPollenInteraction ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      ✓
                    </span>
                    <span className="text-sm text-gray-600">
                      Spoke to {candidateData.lastPollenTeamMember} on{" "}
                      {candidateData.lastInteractionDate}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    {candidateData.applicationCount} previous{" "}
                    {candidateData.applicationCount === 1
                      ? "application"
                      : "applications"}
                  </div>
                );
              })()}
            </div>
          </div>
          <div className="p-4 space-y-6">
            {/* Assessment Q&A Section */}
            <div className="space-y-4">
              {selectedAssessment.assessmentSubmission?.responses?.map(
                (response, index) => {
                  const cleanQuestion = response.question.replace(
                    /^Q\d+\.\s*/,
                    "",
                  );

                  return (
                    <div key={index} className="border rounded-lg p-4 bg-white">
                      <div className="font-medium text-sm mb-3 text-gray-700">
                        Q{index + 1}: {cleanQuestion}
                      </div>
                      <div className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {response.response}
                      </div>
                      <div className="text-xs text-gray-500">
                        Word count: {response.wordCount}
                      </div>
                    </div>
                  );
                },
              ) || (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No assessment responses available
                  </p>
                </div>
              )}
            </div>

            {/* Individual Scores Section - Same as split screen */}
            <div className="border rounded-lg bg-gray-50">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Individual Assessment Scores
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Rate performance across key areas (1-10 scale)
                </p>
              </div>
              <div className="p-6 pb-8 space-y-6">
                {/* Creative Campaign Development */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-sm">
                      Creative Campaign Development
                    </span>
                    <span className="ml-auto text-lg font-bold text-[#E2007A]">
                      {editedScores.creative}/10
                    </span>
                  </div>
                  {isEditing ? (
                    <div className="px-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={editedScores.creative}
                        onChange={(e) =>
                          setEditedScores((prev) => ({
                            ...prev,
                            creative: parseInt(e.target.value),
                          }))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                      </div>
                    </div>
                  ) : (
                    <div className="px-2">
                      <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                        <div
                          className="h-full bg-[#E2007A] rounded-lg"
                          style={{
                            width: `${editedScores.creative * 10}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Data Analysis & Insights */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-sm">
                      Data Analysis & Insights
                    </span>
                    <span className="ml-auto text-lg font-bold text-[#E2007A]">
                      {editedScores.dataAnalysis}/10
                    </span>
                  </div>
                  {isEditing ? (
                    <div className="px-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={editedScores.dataAnalysis}
                        onChange={(e) =>
                          setEditedScores((prev) => ({
                            ...prev,
                            dataAnalysis: parseInt(e.target.value),
                          }))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                      </div>
                    </div>
                  ) : (
                    <div className="px-2">
                      <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                        <div
                          className="h-full bg-[#E2007A] rounded-lg"
                          style={{
                            width: `${editedScores.dataAnalysis * 10}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Communication & Presentation */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-sm">
                      Communication & Presentation
                    </span>
                    <span className="ml-auto text-lg font-bold text-[#E2007A]">
                      {editedScores.communication}/10
                    </span>
                  </div>
                  {isEditing ? (
                    <div className="px-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={editedScores.communication}
                        onChange={(e) =>
                          setEditedScores((prev) => ({
                            ...prev,
                            communication: parseInt(e.target.value),
                          }))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                      </div>
                    </div>
                  ) : (
                    <div className="px-2">
                      <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                        <div
                          className="h-full bg-[#E2007A] rounded-lg"
                          style={{
                            width: `${editedScores.communication * 10}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Strategic Thinking */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-sm">
                      Strategic Thinking
                    </span>
                    <span className="ml-auto text-lg font-bold text-[#E2007A]">
                      {editedScores.strategic}/10
                    </span>
                  </div>
                  {isEditing ? (
                    <div className="px-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={editedScores.strategic}
                        onChange={(e) =>
                          setEditedScores((prev) => ({
                            ...prev,
                            strategic: parseInt(e.target.value),
                          }))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                      </div>
                    </div>
                  ) : (
                    <div className="px-2">
                      <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                        <div
                          className="h-full bg-[#E2007A] rounded-lg"
                          style={{
                            width: `${editedScores.strategic * 10}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Next Steps Section for full page */}
            <div className="border rounded-lg bg-gray-50">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Next Steps
                </h3>
              </div>

              <div className="p-6 pb-8 space-y-6">
                {/* Step 1 - Score Review */}
                {["Unopened", "Under Review"].includes(
                  selectedAssessment.subStatus,
                ) ? (
                  <div className="border rounded-lg p-6 bg-white">
                    <div className="space-y-4">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-900">
                        Step 1: Assessment Score Review
                      </h4>
                      <p className="text-xs text-gray-600 mb-4">
                        Review AI-generated scores and make adjustments if
                        needed before proceeding.
                      </p>
                      <div className="flex flex-wrap gap-4 items-center">
                        {!(
                          scoresApproved || isScoreApproved(selectedAssessment)
                        ) ? (
                          <Button
                            onClick={handleApproveAIScores}
                            size="default"
                            className="bg-green-600 hover:bg-green-700 h-12 px-6 text-base font-medium"
                          >
                            <ThumbsUp className="h-5 w-5 mr-2" />
                            Approve Scores
                          </Button>
                        ) : (
                          <div className="bg-green-100 border border-green-200 rounded-lg p-4 inline-flex items-center gap-3 text-green-700">
                            <Check className="h-5 w-5" />
                            <span className="font-medium text-base">
                              Scores Approved
                            </span>
                          </div>
                        )}

                        {isEditing ? (
                          <>
                            <Button
                              onClick={handleSaveScores}
                              size="default"
                              className="bg-green-600 hover:bg-green-700 h-12 px-6 text-base font-medium"
                            >
                              <Check className="h-5 w-5 mr-2" />
                              Save Changes
                            </Button>
                            <Button
                              variant="outline"
                              size="default"
                              onClick={() => setIsEditing(false)}
                              className="h-12 px-6 text-base font-medium"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="default"
                            onClick={() => setIsEditing(true)}
                            className="h-12 px-6 text-base font-medium"
                          >
                            <Edit3 className="h-5 w-5 mr-2" />
                            Edit Scores
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg p-6 bg-gray-100">
                    <div className="flex items-center justify-center gap-3 text-gray-700 mb-2">
                      <Lock className="h-5 w-5" />
                      <span className="font-medium text-lg">
                        Assessment Scores Locked
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Scores are automatically locked when candidates progress
                      beyond the initial review stage.
                    </p>
                  </div>
                )}

                {["Unopened", "Under Review"].includes(
                  selectedAssessment.subStatus,
                ) &&
                  !(scoresApproved || isScoreApproved(selectedAssessment)) && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-amber-800">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="text-base font-medium">
                          Approve assessment scores before making candidate
                          decision
                        </span>
                      </div>
                    </div>
                  )}

                {/* Step 2 - Candidate action buttons */}
                <div className="border rounded-lg p-6 bg-white">
                  <div className="space-y-4 pb-18">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2">
                      Step 2: Candidate Decision
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Choose next action for this candidate. This will lock
                      scores and update their status.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      {/* Show different buttons based on status */}
                      {["Unopened", "Under Review"].includes(
                        selectedAssessment.subStatus,
                      ) && (
                        <>
                          <Button
                            onClick={() => handleCandidateAction("interview")}
                            disabled={
                              !(
                                scoresApproved ||
                                isScoreApproved(selectedAssessment)
                              ) ||
                              isExecutingAction ||
                              scoresLocked
                            }
                            size="default"
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 h-12 px-6 text-base font-medium"
                          >
                            <Calendar className="h-5 w-5 mr-2" />
                            Invite to Pollen Interview
                          </Button>

                          {(() => {
                            const candidateData = getCandidateData(
                              selectedAssessment.id,
                            );
                            const canFastTrackToEmployer =
                              candidateData.hasPollenInteraction &&
                              candidateData.isFastTrack;

                            return canFastTrackToEmployer ? (
                              <Button
                                onClick={() => handleCandidateAction("match")}
                                disabled={
                                  !(
                                    scoresApproved ||
                                    isScoreApproved(selectedAssessment)
                                  ) ||
                                  isExecutingAction ||
                                  scoresLocked ||
                                  !canFastTrackToEmployer
                                }
                                size="default"
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 h-12 px-6 text-base font-medium"
                              >
                                <UserCheck className="h-5 w-5 mr-2" />
                                Match to Employer
                              </Button>
                            ) : null;
                          })()}

                          {/* Not progressing option always available */}
                          <Button
                            onClick={() => handleCandidateAction("reject")}
                            disabled={
                              !(
                                scoresApproved ||
                                isScoreApproved(selectedAssessment)
                              ) ||
                              isExecutingAction ||
                              scoresLocked
                            }
                            variant="outline"
                            size="default"
                            className="border-red-200 text-red-700 hover:bg-red-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 h-12 px-6 text-base font-medium"
                          >
                            <UserX className="h-5 w-5 mr-2" />
                            Not Progressing
                          </Button>
                        </>
                      )}

                      {/* Provide Update button for candidates who completed Pollen interviews */}
                      {selectedAssessment.subStatus ===
                        "Pollen Interview Complete" && (
                        <Button
                          //TODO:
                          // onClick={() =>
                          //  setLocation(
                          //    buildUrlWithCurrentState(
                          //      `/admin/provide-update/${selectedAssessment.id}`,
                          //    ),
                          //  )
                          //}
                          size="default"
                          className="bg-purple-600 hover:bg-purple-700 h-12 px-6 text-base font-medium"
                        >
                          <MessageCircle className="h-5 w-5 mr-2" />
                          Provide Update
                        </Button>
                      )}

                      {/* Review Feedback button for candidates who stopped at employer */}
                      {(() => {
                        const apiCandidate = candidates.find(
                          (c) => c.id === selectedAssessment.id,
                        );
                        return (
                          apiCandidate?.subStatus === "stopped_at_employer" &&
                          hasUnreviewedEmployerFeedback(selectedAssessment.id)
                        );
                      })() && (
                        <Button
                          onClick={() => {
                            const apiCandidate = candidates.find(
                              (c) => c.id === selectedAssessment.id,
                            );
                            const feedbackData =
                              apiCandidate?.employerFeedback ||
                              getCandidateData(selectedAssessment.id)
                                .employerFeedback;
                            setSelectedFeedback(feedbackData);
                            setShowFeedbackReview(true);
                          }}
                          size="default"
                          className="bg-orange-600 hover:bg-orange-700 h-12 px-6 text-base font-medium"
                        >
                          <MessageSquare className="h-5 w-5 mr-2" />
                          Review Feedback
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Feedback Review Dialog */}
      <Dialog open={showFeedbackReview} onOpenChange={setShowFeedbackReview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-pink-600" />
              Feedback from Employer
            </DialogTitle>
          </DialogHeader>

          {selectedFeedback && (
            <div className="space-y-6">
              {/* Header showing it's direct feedback */}
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-pink-600" />
                  <span className="font-medium text-pink-800">
                    Direct feedback from the employer
                  </span>
                </div>
                <p className="text-sm text-pink-700">
                  This feedback has been provided by the employer and reviewed
                  by our team. It includes their assessment of the candidate's
                  interview performance and specific insights about their fit
                  for the role.
                </p>
              </div>

              {/* Interview Scores */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Employer Interview Scores
                </h3>

                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Overall</div>
                    <div className="text-lg font-semibold text-purple-600">
                      {selectedFeedback.overallScore}/10
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-600">Skills</div>
                    <div className="text-lg font-semibold text-blue-600">
                      {selectedFeedback.skillsScore}/10
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-600">Communication</div>
                    <div className="text-lg font-semibold text-green-600">
                      {selectedFeedback.communicationScore}/10
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-600">Values Fit</div>
                    <div className="text-lg font-semibold text-pink-600">
                      {selectedFeedback.culturalFitScore}/10
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Notes */}
              <div className="space-y-3">
                <h4 className="font-medium text-purple-600">Notes:</h4>
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="text-gray-700">{selectedFeedback.notes}</p>
                </div>
              </div>

              {/* Approval Section */}
              {selectedFeedback.reviewStatus === "pending" && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowFeedbackReview(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      // Here you would typically make an API call to approve the feedback
                      toast({
                        title: "Feedback Approved",
                        description:
                          "The employer feedback has been approved and will be sent to the candidate.",
                      });
                      setShowFeedbackReview(false);
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Feedback
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
