"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Target,
  FileText,
  Badge,
  Lightbulb,
  Award,
  Pause,
  UserCheck,
  Briefcase,
  Brain,
  Building2,
  CheckCircle,
  Copy,
  Edit,
  Eye,
  Play,
  X,
  MapPin,
  Clock,
  Users,
  ArrowLeft
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function JobsManagmentReviewPage() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [submittedToEmployer, setSubmittedToEmployer] = useState(false);
  const [editedAssessment, setEditedAssessment] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isEditingAssessment, setIsEditingAssessment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const jobId = window.location.pathname.split("/").pop();
  const [currentJobStatus, setCurrentJobStatus] = useState(null);
  const router = useRouter();
  const [candidateCompletionData, setCandidateCompletionData] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  const getJobData = (id) => {
    const baseJob = {
      id: id,
      jobTitle: "Marketing Assistant",
      companyName: "TechCorp Solutions",
      location: "London, UK",
      jobType: "Full-time",
      salaryRange: "£25,000 - £30,000",
      workArrangement: "Hybrid",
      employmentType: "Permanent",
      employmentTypeDetails: "Standard employment contract",
      workAuthorisation: "UK work authorisation required",
      startDate: "ASAP",
      applicationDeadline: "2024-12-30",
      description:
        "This role involves supporting the marketing team with campaign coordination and digital marketing activities across various channels.",
      responsibilities: [
        "Support the marketing team with campaign planning and execution",
        "Create content for social media platforms and website",
        "Assist with market research and competitor analysis",
        "Help organise marketing events and webinars",
        "Monitor and report on campaign performance metrics",
      ],
      keyResponsibilities: [
        "Support the marketing team with campaign planning and execution",
        "Create content for social media platforms and website",
        "Assist with market research and competitor analysis",
        "Help organise marketing events and webinars",
        "Monitor and report on campaign performance metrics",
      ],
      requirements: [
        "Strong written and verbal communication skills",
        "Proficiency in social media platforms and basic design tools",
        "Excellent attention to detail and ability to multitask",
        "Enthusiasm for learning about digital marketing",
        "Comfortable working in a fast-paced environment",
      ],
      whoWouldLove: [
        "Someone who enjoys creating engaging content and telling stories",
        "A natural communicator who loves connecting with people",
        "Detail-oriented person who takes pride in producing quality work",
        "Creative thinker who brings fresh ideas to campaigns",
        "Team player who thrives in collaborative environments",
      ],

      successLooks:
        "Success in this role means consistently delivering high-quality marketing materials, contributing to campaign performance improvements, and effectively supporting team initiatives whilst building strong relationships across departments.",
      pollenApprovedRequirements: [
        "Valid UK driving licence",
        "Willingness to travel within London area",
        "Comfortable using social media platforms",
      ],
      internalNotes:
        "Entry-level role suitable for candidates with creative mindset and strong communication skills. Focus on behavioral fit over technical experience. Client specifically wants someone who can grow with the company.",
      reviewNotes:
        "Entry-level role suitable for candidates with creative mindset and strong communication skills. Focus on behavioral fit over technical experience.",
      assignedTo: "holly-saunders",
      candidateCounts: {
        total: 24,
        new: 8,
        inProgress: 12,
        complete: 3,
        hired: 1,
      },
    };

    // Determine status based on job ID to match assigned jobs data
    if (id === "1") {
      return {
        ...baseJob,
        status: "draft",
        jobTitle: "Marketing Assistant",
        companyName: "TechFlow Solutions",
      };
    } else if (id === "2") {
      return {
        ...baseJob,
        status: "live",
        jobTitle: "Marketing Assistant",
        companyName: "Creative Studios",
      };
    } else if (id === "3") {
      return {
        ...baseJob,
        status: "paused",
        jobTitle: "Digital Marketing Coordinator",
        companyName: "StartupCo",
      };
    } else if (id === "4") {
      return {
        ...baseJob,
        status: "complete",
        jobTitle: "Marketing Manager",
        companyName: "Digital Agency",
      };
    } else if (id === "5") {
      return {
        ...baseJob,
        status: "live",
        jobTitle: "Sales Coordinator",
        companyName: "SalesForce Pro",
      };
    } else if (id === "6") {
      return {
        ...baseJob,
        status: "live",
        jobTitle: "Data Analyst",
        companyName: "Analytics Hub",
      };
    } else if (id === "7") {
      return {
        ...baseJob,
        status: "draft",
        jobTitle: "Social Media Manager",
        companyName: "Brand Builders Ltd",
      };
    } else if (id === "8") {
      return {
        ...baseJob,
        status: "draft",
        jobTitle: "Junior Accountant",
        companyName: "FinanceFirst",
      };
    } else {
      // Default to draft for any other ID
      return { ...baseJob, status: "draft" };
    }
  };

  // Mock assessment data
  const assessmentData = {
    assessmentType: "Multiple Focused Tasks",
    estimatedDuration:
      "We recommend allowing approximately 45-60 minutes to complete this assessment, though it's not timed and you can take as long as you need.",
    generatedContent: `MARKETING ASSISTANT SKILLS ASSESSMENT

We recommend allowing approximately 45-60 minutes to complete this assessment, though it's not timed and you can take as long as you need.

WHY DID YOU APPLY TO THIS ROLE?
Please tell us what attracted you to this Marketing Assistant position and how it aligns with your career interests. (No word limit)

TASK 1: CONTENT CREATION
You've been asked to create social media content for TechCorp's new product launch.

Task: Write three different social media posts for the same product announcement:
1. LinkedIn post (professional tone, 150 words max)
2. Twitter post (engaging, 280 characters max) 
3. Instagram caption (creative, storytelling approach, 100 words max)

Product Details:
- New project management software called "TaskFlow"
- Key features: Real-time collaboration, AI-powered insights, mobile-first design
- Target audience: Small to medium businesses
- Launch date: Next month

Tips: Focus on the unique benefits for each platform's audience. LinkedIn users value professional efficiency, Twitter users want quick insights, and Instagram users appreciate visual storytelling.

TASK 2: CAMPAIGN ANALYSIS
Review the campaign performance data and provide your analysis:

1. What are the top 3 insights from this data?
2. What would you recommend to improve performance?
3. How would you present these findings to the marketing director?

Campaign Data:
- Email open rate: 18% (industry average: 21%)
- Click-through rate: 2.1% (industry average: 2.6%)
- Social media engagement: 150 likes, 23 shares, 8 comments per post
- Website traffic increase: 15% during campaign period

Tips: Look for patterns in the data and think about what actions could address the lower-performing metrics. Consider how to present both challenges and opportunities constructively.

Please provide your analysis with specific recommendations and reasoning.`,
    structuredQuestions: {
      openingQuestion: {
        title: "Why did you apply to this role?",
        subtitle:
          "Please tell us what attracted you to this Marketing Assistant position and how it aligns with your career interests.",
      },
      guidelines: {
        timeGuideline: "45-60 minutes (not timed - take as long as you need)",
        assessmentCriteria:
          "Your responses will be evaluated based on creativity, communication skills, analytical thinking, and understanding of marketing principles. We're looking for practical solutions and clear reasoning.",
      },
      tasks: [
        {
          title: "Content Creation Challenge",
          content: `You've been asked to create social media content for TechCorp's new product launch.

**Task:** Write three different social media posts for the same product announcement:
1. LinkedIn post (professional tone, 150 words max)
2. Twitter post (engaging, 280 characters max) 
3. Instagram caption (creative, storytelling approach, 100 words max)

**Product Details:**
- New project management software called "TaskFlow"
- Key features: Real-time collaboration, AI-powered insights, mobile-first design
- Target audience: Small to medium businesses
- Launch date: Next month

**Tips:** Focus on the unique benefits for each platform's audience. LinkedIn users value professional efficiency, Twitter users want quick insights, and Instagram users appreciate visual storytelling.`,
        },
        {
          title: "Campaign Performance Analysis",
          content: `Review the campaign performance data and provide your analysis:

1. What are the top 3 insights from this data?
2. What would you recommend to improve performance?
3. How would you present these findings to the marketing director?

**Campaign Data:**
- Email open rate: 18% (industry average: 21%)
- Click-through rate: 2.1% (industry average: 2.6%)
- Social media engagement: 150 likes, 23 shares, 8 comments per post
- Website traffic increase: 15% during campaign period

**Tips:** Look for patterns in the data and think about what actions could address the lower-performing metrics. Consider how to present both challenges and opportunities constructively.

Please provide your analysis with specific recommendations and reasoning.`,
        },
      ],
    },
    scoringCriteria: `1. Communication Skills: Excellent - Candidate uses clear, professional language with appropriate tone. Poor - Candidate provides unclear responses or inappropriate tone.

2. Problem-Solving Ability: Excellent - Candidate systematically identifies issues and provides practical solutions. Poor - Candidate fails to understand problems or offers vague solutions.

3. Organisation & Prioritisation: Excellent - Candidate demonstrates clear task management and logical sequencing. Poor - Candidate shows disorganised approach with poor time management.

4. Customer Focus & Values Alignment: Excellent - Candidate shows genuine care for customer experience. Poor - Candidate lacks customer empathy or understanding.`,
  };

  // Mock persona data
  const personaData = {
    primaryDisc: "Influencer (I/D)",
    traits: [
      "Enthusiastic",
      "People-focused",
      "Creative",
      "Collaborative",
      "Optimistic",
    ],
    workStyle:
      "Thrives in collaborative environments with opportunities for creativity and social interaction",
    idealEnvironment:
      "Dynamic, team-oriented workspace with variety and opportunities to present ideas",
    behavioralInsights:
      "This role is perfect for someone who enjoys building relationships, creating engaging content, and working in a fast-paced, collaborative environment. The ideal candidate will be naturally outgoing and comfortable with change.",
  };

  const baseJobData = getJobData(jobId || "1");
  const job = {
    ...baseJobData,
    status: currentJobStatus || baseJobData.status,
  };

  const canMarkComplete = () => {
    if (!candidateCompletionData) return false;
    return (
      candidateCompletionData.pendingFeedback === 0 &&
      candidateCompletionData.totalCandidates > 0
    );
  };

  const getStatusActions = () => {
    if (job.status === "live") {
      return (
        <>
          <Button
            onClick={() => handleStatusAction("pause")}
            variant="outline"
            size="sm"
            className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
          >
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
          <Button
            onClick={() => handleStatusAction("complete")}
            size="sm"
            disabled={!canMarkComplete()}
            className={`${
              canMarkComplete()
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            title={getCompleteButtonDisabledReason()}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Complete
          </Button>
        </>
      );
    } else if (job.status === "paused") {
      return (
        <>
          <Button
            onClick={() => handleStatusAction("go-live")}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Play className="h-4 w-4 mr-2" />
            Set Live
          </Button>
          <Button
            onClick={() => handleStatusAction("cancel")}
            variant="outline"
            size="sm"
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel Job
          </Button>
          <Button
            onClick={() => handleStatusAction("complete")}
            variant="outline"
            size="sm"
            disabled={!canMarkComplete()}
            className={`${
              canMarkComplete()
                ? "text-gray-600 border-gray-300 hover:bg-gray-50"
                : "text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
            title={getCompleteButtonDisabledReason()}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Complete
          </Button>
        </>
      );
    }
    return null;
  };

  const getCompleteButtonDisabledReason = () => {
    if (!candidateCompletionData) return "Loading candidate data...";
    if (candidateCompletionData.totalCandidates === 0)
      return "No candidates to complete";
    if (candidateCompletionData.pendingFeedback > 0) {
      return `${candidateCompletionData.pendingFeedback} candidate${
        candidateCompletionData.pendingFeedback !== 1 ? "s" : ""
      } still need feedback`;
    }
    return null;
  };

  const handleEditClick = () => {
    setEditedJob({ ...job });
    setEditedAssessment({ ...assessmentData });
    setIsEditing(true);
  };

  const handleStatusAction = (action) => {
    console.log(`Job ${action} action for job:`, jobId);

    if (action === "submit-to-employer") {
      console.log("Submitting job to employer for approval...");
      // In real app, would make API call to update job status to "pending_employer_approval"
      // Stay on current page to show the employer portal CTA
    } else if (action === "go-live") {
      console.log("Setting job live...");
      // In real app, would make API call to update job status
      setCurrentJobStatus("live");
    } else if (action === "pause") {
      console.log("Pausing job...");
      // In real app, would make API call to update job status
      setCurrentJobStatus("paused");
    } else if (action === "complete") {
      console.log("Completing job...");
      // In real app, would make API call to update job status
      router.push("/admin");
    } else if (action === "cancel") {
      setShowCancelDialog(true);
    }
  };

  const handleCancel = () => {
    setEditedJob({ ...job });
    setEditedAssessment({ ...assessmentData });
    setIsEditing(false);
  };

  const handleSave = async () => {
    console.log("Saving job changes:", editedJob);
    setIsEditing(false);
  };

  const handleSaveAssessment = () => {
    console.log("Saving assessment changes:", editedAssessment);
    setIsEditingAssessment(false);
  };

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const updateEditedJob = (field, value) => {
    setEditedJob((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field, index, value) => {
    setEditedJob((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const removeArrayItem = (field, index) => {
    setEditedJob((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addArrayItem = () => {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {job.jobTitle} at {job.companyName}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Draft Job Status Card */}
        {job.status === "draft" && (
          <Card className="mb-6 p-6">
            <CardHeader>
              <CardTitle className="flex items-center mb-6">
                <Building2 className="h-5 w-5 mr-2" />
                Job Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status Badge and Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-sm font-medium text-yellow-700">
                    Draft - Awaiting Approval
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!isEditing && !isEditingAssessment ? (
                    <>
                      <Button
                        onClick={() => setShowSubmitDialog(true)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Submit to Employer
                      </Button>
                      <Button
                        onClick={handleEditClick}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-300 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Job
                      </Button>
                      <Button
                        onClick={() => handleStatusAction("cancel")}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel Job
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={isEditing ? handleSave : handleSaveAssessment}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Draft Status Info */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-yellow-800">
                      <strong>Next Steps:</strong> Review all components below
                      and submit to employer for approval. Once approved, the
                      job will go live automatically.
                    </p>
                  </div>
                  <Button
                    //TODO: colocar función del click
                    ///        onClick={() =>
                    ///    setLocation(
                    ///      `/admin/job-creation-flow?step=action&jobId=${job.id}`
                    ///    )
                    ///  }
                    variant="outline"
                    size="sm"
                    className="ml-4 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit in Builder
                  </Button>
                </div>

                {/* Employer Portal View CTA - Only show after submission */}
                {submittedToEmployer && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-800 font-medium">
                          Job submitted to employer for approval
                        </span>
                      </div>
                      <Button
                        onClick={() =>
                          window.open(
                            `/employer-portal/jobs/${job.id}/review`,
                            "_blank",
                          )
                        }
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-300 hover:bg-blue-100"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View in Employer Portal
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Copy Link Button for Draft Jobs */}
              <div className="pt-2 border-t border-gray-100">
                <Button
                  onClick={handleCopyLink}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 h-8"
                >
                  <Copy className="h-3 w-3 mr-1.5" />
                  {copySuccess ? "Link Copied!" : "Copy Job Link"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Live Job Status Card */}
        {job.status !== "draft" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Job Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* First Row: Status Badge (left) and Action Buttons (right) */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    job.status === "live"
                      ? "bg-green-50 border border-green-200"
                      : job.status === "paused"
                        ? "bg-yellow-50 border border-yellow-200"
                        : job.status === "complete"
                          ? "bg-gray-50 border border-gray-200"
                          : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      job.status === "live"
                        ? "bg-green-500"
                        : job.status === "paused"
                          ? "bg-yellow-500"
                          : job.status === "complete"
                            ? "bg-gray-500"
                            : "bg-blue-500"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      job.status === "live"
                        ? "text-green-700"
                        : job.status === "paused"
                          ? "text-yellow-700"
                          : job.status === "complete"
                            ? "text-gray-700"
                            : "text-blue-700"
                    }`}
                  >
                    {job.status === "live"
                      ? "Live"
                      : job.status === "paused"
                        ? "Paused"
                        : job.status === "complete"
                          ? "Complete"
                          : job.status.charAt(0).toUpperCase() +
                            job.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleEditClick}
                    variant="outline"
                    size="sm"
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  {getStatusActions()}
                </div>
              </div>

              {/* Second Row: View Candidates Button */}
              {job.candidateCounts && (
                <div className="space-y-3">
                  <Button
                    //TODO: colocar función del click
                    // onClick={() =>
                    //   setLocation(`/admin/job-applicants-grid/${job.id}`)
                    // }
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Candidates ({job.candidateCounts.total})
                  </Button>

                  {/* Candidate Counts Below Button */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        {job.candidateCounts.new} New
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        {job.candidateCounts.inProgress} In Progress
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        {job.candidateCounts.complete} Matched
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full" />
                        {job.candidateCounts.hired} Complete
                      </span>
                    </div>

                    {/* Completion Status Indicator */}
                    {candidateCompletionData && (
                      <div
                        className={`text-xs px-2 py-1 rounded-full border ${
                          canMarkComplete()
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {canMarkComplete()
                          ? `✓ All ${candidateCompletionData.totalCandidates} candidates completed - Ready to mark job complete`
                          : getCompleteButtonDisabledReason()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Copy Link Button for Live Jobs */}
              <div className="pt-2 border-t border-gray-100">
                <Button
                  onClick={handleCopyLink}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 h-8"
                >
                  <Copy className="h-3 w-3 mr-1.5" />
                  {copySuccess ? "Link Copied!" : "Copy Job Link"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 3-Tab Structure for All Jobs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="description"
              className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Job Description
            </TabsTrigger>

            <TabsTrigger value="persona" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Persona Results
            </TabsTrigger>
            
            <TabsTrigger value="assessment" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Skills Assessment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-6">
            {/* Job Overview Card */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center pb-4">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Job Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  {!isEditing ? (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.jobTitle}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="link"
                          className="text-sm text-blue-600 hover:text-blue-800 p-0 h-auto"
                          //TODO: colocar función del click
                          // onClick={() =>
                          //   setLocation(`/admin/company-profiles/${job.id}`)
                          // }
                        >
                          <Building2 className="h-3 w-3 mr-1" />
                          {job.companyName}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          value={editedJob?.jobTitle || ""}
                          onChange={(e) =>
                            updateEditedJob("jobTitle", e.target.value)
                          }
                          placeholder="Enter job title..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Select
                          value={editedJob?.companyName || ""}
                          onValueChange={(value) =>
                            updateEditedJob("companyName", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select company" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="TechFlow Solutions">
                              TechFlow Solutions
                            </SelectItem>
                            <SelectItem value="Creative Studios">
                              Creative Studios
                            </SelectItem>
                            <SelectItem value="StartupCo">StartupCo</SelectItem>
                            <SelectItem value="Digital Agency">
                              Digital Agency
                            </SelectItem>
                            <SelectItem value="SalesForce Pro">
                              SalesForce Pro
                            </SelectItem>
                            <SelectItem value="Analytics Hub">
                              Analytics Hub
                            </SelectItem>
                            <SelectItem value="Brand Builders Ltd">
                              Brand Builders Ltd
                            </SelectItem>
                            <SelectItem value="FinanceFirst">
                              FinanceFirst
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                {!isEditing ? (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {job.jobType}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {job.salaryRange}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Building2 className="h-4 w-4 mr-2" />
                      {job.workArrangement}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editedJob?.location || ""}
                        onChange={(e) =>
                          updateEditedJob("location", e.target.value)
                        }
                        placeholder="Enter location..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobType">Working Hours</Label>
                      <Select
                        value={editedJob?.jobType || ""}
                        onValueChange={(value) =>
                          updateEditedJob("jobType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select working hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="salaryRange">Salary Range</Label>
                      <Input
                        id="salaryRange"
                        value={editedJob?.salaryRange || ""}
                        onChange={(e) =>
                          updateEditedJob("salaryRange", e.target.value)
                        }
                        placeholder="e.g. £25,000 - £30,000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="workArrangement">Work Arrangement</Label>
                      <Select
                        value={editedJob?.workArrangement || ""}
                        onValueChange={(value) =>
                          updateEditedJob("workArrangement", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select arrangement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Office-based">
                            Office-based
                          </SelectItem>
                          <SelectItem value="Remote">Remote</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                          <SelectItem value="Out and About">
                            Out and About
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h4 className="font-medium text-gray-900">
                    Employment Details
                  </h4>
                  {!isEditing ? (
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Type:</span>{" "}
                        {job.employmentType}
                      </div>
                      <div>
                        <span className="font-medium">Start Date:</span>{" "}
                        {job.startDate}
                      </div>
                      <div>
                        <span className="font-medium">
                          Application Deadline:
                        </span>{" "}
                        {job.applicationDeadline}
                      </div>
                      <div>
                        <span className="font-medium">Authorisation:</span>{" "}
                        {job.workAuthorisation}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employmentType">Employment Type</Label>
                        <Select
                          value={editedJob?.employmentType || ""}
                          onValueChange={(value) =>
                            updateEditedJob("employmentType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Permanent">Permanent</SelectItem>
                            <SelectItem value="Fixed term/temporary">
                              Fixed term/temporary
                            </SelectItem>
                            <SelectItem value="Contract/freelance">
                              Contract/freelance
                            </SelectItem>
                            <SelectItem value="Internship">
                              Internship
                            </SelectItem>
                            <SelectItem value="Apprenticeship">
                              Apprenticeship
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          value={editedJob?.startDate || ""}
                          onChange={(e) =>
                            updateEditedJob("startDate", e.target.value)
                          }
                          placeholder="e.g. ASAP, January 2025"
                        />
                      </div>
                      <div>
                        <Label htmlFor="applicationDeadline">
                          Application Deadline
                        </Label>
                        <Input
                          id="applicationDeadline"
                          type="date"
                          value={editedJob?.applicationDeadline || ""}
                          onChange={(e) =>
                            updateEditedJob(
                              "applicationDeadline",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="employmentTypeDetails">
                          Employment Type Details
                        </Label>
                        <Input
                          id="employmentTypeDetails"
                          value={editedJob?.employmentTypeDetails || ""}
                          onChange={(e) =>
                            updateEditedJob(
                              "employmentTypeDetails",
                              e.target.value,
                            )
                          }
                          placeholder="e.g. Standard employment contract"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="workAuthorisation">
                          Work Authorisation
                        </Label>
                        <Select
                          value={editedJob?.workAuthorisation || ""}
                          onValueChange={(value) =>
                            updateEditedJob("workAuthorisation", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select work authorisation requirement" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UK work authorisation required">
                              UK work authorisation required
                            </SelectItem>
                            <SelectItem value="EU work authorisation required">
                              EU work authorisation required
                            </SelectItem>
                            <SelectItem value="No work authorisation required">
                              No work authorisation required
                            </SelectItem>
                            <SelectItem value="Sponsorship available">
                              Sponsorship available
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* About This Role Card */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center pb-4">
                  <FileText className="h-5 w-5 mr-2" />
                  About This Role
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <p className="text-gray-700">{job.description}</p>
                ) : (
                  <Textarea
                    value={editedJob?.description || ""}
                    onChange={(e) =>
                      updateEditedJob("description", e.target.value)
                    }
                    className="min-h-[100px]"
                    placeholder="Enter job description..."
                  />
                )}
              </CardContent>
            </Card>

            {/* Key Responsibilities Card */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center pb-4">
                  <Target className="h-5 w-5 mr-2" />
                  Key Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-3">
                    {editedJob?.responsibilities?.map(
                      (responsibility, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={responsibility}
                            onChange={(e) =>
                              updateArrayField(
                                "responsibilities",
                                index,
                                e.target.value,
                              )
                            }
                            className="flex-1"
                            placeholder="Enter responsibility..."
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              removeArrayItem("responsibilities", index)
                            }
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ),
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("responsibilities")}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      + Add Responsibility
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Who Would Love This Job Card */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center pb-4">
                  <Users className="h-5 w-5 mr-2" />
                  Who Would Love This Job
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <ul className="space-y-2">
                    {job.whoWouldLove.map((trait, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{trait}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-3">
                    {editedJob?.whoWouldLove?.map((trait, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={trait}
                          onChange={(e) =>
                            updateArrayField(
                              "whoWouldLove",
                              index,
                              e.target.value,
                            )
                          }
                          className="flex-1"
                          placeholder="Enter ideal candidate trait..."
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("whoWouldLove", index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("whoWouldLove")}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      + Add Trait
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Success Metrics Card */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center pb-4">
                  <Target className="h-5 w-5 mr-2" />
                  Success In This Role Looks Like
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <p className="text-gray-700">{job.successLooks}</p>
                ) : (
                  <Textarea
                    value={editedJob?.successLooks || ""}
                    onChange={(e) =>
                      updateEditedJob("successLooks", e.target.value)
                    }
                    className="min-h-[80px]"
                    placeholder="Describe what success looks like in this role..."
                  />
                )}
              </CardContent>
            </Card>

            {/* Pollen Approved Requirements Card */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center pb-4">
                  <Award className="h-5 w-5 mr-2" />
                  Pollen Approved Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <ul className="space-y-2">
                    {job.pollenApprovedRequirements?.map(
                      (requirement, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ),
                    )}
                  </ul>
                ) : (
                  <div className="space-y-3">
                    {editedJob?.pollenApprovedRequirements?.map(
                      (requirement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={requirement}
                            onChange={(e) =>
                              updateArrayField(
                                "pollenApprovedRequirements",
                                index,
                                e.target.value,
                              )
                            }
                            className="flex-1"
                            placeholder="Enter requirement..."
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              removeArrayItem(
                                "pollenApprovedRequirements",
                                index,
                              )
                            }
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ),
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("pollenApprovedRequirements")}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      + Add Requirement
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Internal Notes Card */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center pb-4">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Internal Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <p className="text-gray-700">{job.internalNotes}</p>
                ) : (
                  <Textarea
                    value={editedJob?.internalNotes || ""}
                    onChange={(e) =>
                      updateEditedJob("internalNotes", e.target.value)
                    }
                    className="min-h-[80px]"
                    placeholder="Add internal notes about this role..."
                  />
                )}
              </CardContent>
            </Card>

            {/* Action Buttons - Only show when editing */}
            {isEditing && (
              <div className="flex justify-center items-center gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="px-6"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 px-6"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="persona" className="space-y-6">
            {/* Persona Results Card */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center pb-4">
                  <UserCheck className="h-5 w-5 mr-2" />
                  Employer Persona Questionnaire Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {personaData ? (
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        Ideal Candidate Profile
                      </h3>
                      <p className="text-sm text-blue-800 mb-3">
                        <strong>Primary Behavioral Type:</strong>{" "}
                        {personaData.primaryDisc}
                      </p>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-blue-900">
                            Key Traits:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {personaData.traits.map((trait, index) => (
                              <Badge
                                key={index}
                                className="bg-blue-100 text-blue-800"
                              >
                                {trait}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-900">
                            Work Style:
                          </span>
                          <p className="text-sm text-blue-700 mt-1">
                            {personaData.workStyle}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-900">
                            Ideal Environment:
                          </span>
                          <p className="text-sm text-blue-700 mt-1">
                            {personaData.idealEnvironment}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Behavioral Insights
                      </h4>
                      <p className="text-sm text-gray-700">
                        {personaData.behavioralInsights}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        // TODO: colocar función del click
                        onClick={() => {
                          router.push(`/admin/jobs-managment/persona-results`)
                        }}
                        //   setLocation(
                        //     "/admin/persona-results?job=" +
                        //       encodeURIComponent(job.jobTitle) +
                        //       "&company=" +
                        //       encodeURIComponent(job.companyName)
                        //   )
                        // }
                        className="text-blue-600 border-blue-300 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Persona Results
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Persona Data Available
                    </h3>
                    <p className="text-gray-600">
                      Persona questionnaire has not been completed yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessment" className="space-y-6">
            {/* Assessment Card */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center pb-4">
                  <Brain className="h-5 w-5 mr-2" />
                  Skills Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {assessmentData ? (
                  <>
                    <div className="bg-white border rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Assessment Content
                      </h4>
                      {isEditing ? (
                        <div className="space-y-4">
                          <textarea
                            value={
                              editedAssessment?.generatedContent ??
                              assessmentData.generatedContent ??
                              ""
                            }
                            onChange={(e) =>
                              setEditedAssessment((prev) => ({
                                ...(prev ?? {}),
                                generatedContent: e.target.value,
                              }))
                            }
                            className="w-full h-96 p-4 border border-gray-300 rounded-lg text-sm font-mono resize-vertical"
                            placeholder="Enter assessment content..."
                          />
                        </div>
                      ) : assessmentData.structuredQuestions ? (
                        <div className="space-y-6">
                          {/* Assessment Header - Simple like job seeker view */}
                          <div className="mb-6">
                            <p className="text-gray-600 text-sm">
                              <span className="text-purple-600">⏱</span>{" "}
                              Estimated time:{" "}
                              {assessmentData.structuredQuestions.guidelines
                                ?.timeGuideline || "45 minutes"}{" "}
                              (guideline only - not timed)
                            </p>
                          </div>

                          {/* Note on AI Usage - matching job seeker style */}
                          <div className="bg-orange-50 border border-orange-200 rounded p-4 text-sm">
                            <span className="font-semibold text-orange-800">
                              Note on AI usage:
                            </span>
                            <span className="text-orange-700">
                              {" "}
                              AI platforms, like Chat GPT, can be helpful for
                              job applications, but pretty please don't copy and
                              paste an answer for your application. We have
                              beady-eyes and will not accept anything that is
                              obviously AI generated. We want to know the real
                              you, not a robot. You've got this!
                            </span>
                          </div>

                          {/* Opening Question */}
                          {assessmentData.structuredQuestions
                            .openingQuestion && (
                            <div className="space-y-3">
                              <h3 className="text-base font-semibold text-gray-900">
                                1.{" "}
                                {
                                  assessmentData.structuredQuestions
                                    .openingQuestion.title
                                }{" "}
                                <span className="text-red-500">*</span>
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {
                                  assessmentData.structuredQuestions
                                    .openingQuestion.subtitle
                                }
                              </p>
                              <div className="border border-gray-200 rounded p-3 bg-gray-50 min-h-[100px]">
                                <span className="text-gray-400 text-sm">
                                  Job seekers would type their response here...
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Tasks/Questions - Simple numbered format */}
                          {assessmentData.structuredQuestions.tasks &&
                            assessmentData.structuredQuestions.tasks.length >
                              0 && (
                              <div className="space-y-8">
                                {assessmentData.structuredQuestions.tasks.map(
                                  (task, index) => (
                                    <div key={index} className="space-y-3">
                                      <h3 className="text-base font-semibold text-gray-900">
                                        {index + 2}.{" "}
                                        {task.title || `Task ${index + 1}`}{" "}
                                        <span className="text-red-500">*</span>
                                      </h3>
                                      <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: task.content
                                              .replace(/\n\n/g, "</p><p>")
                                              .replace(/^/, "<p>")
                                              .replace(/$/, "</p>")
                                              .replace(
                                                /\*\*(.+?)\*\*/g,
                                                "<strong>$1</strong>",
                                              )
                                              .replace(
                                                /_(.+?)_/g,
                                                "<em>$1</em>",
                                              )
                                              .replace(/^<p><\/p>/, "")
                                              .replace(/<p><\/p>$/g, ""),
                                          }}
                                        />
                                      </div>
                                      <div className="border border-gray-200 rounded p-3 bg-gray-50 min-h-[150px]">
                                        <span className="text-gray-400 text-sm">
                                          Job seekers would type their response
                                          here...
                                        </span>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}

                          {/* Fallback: Show Full Assessment if structured parsing failed */}
                          {(!assessmentData.structuredQuestions.tasks ||
                            assessmentData.structuredQuestions.tasks.length ===
                              0) && (
                            <div className="border rounded-lg p-6 bg-white shadow-sm">
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Full Assessment Content
                              </h3>
                              <div className="prose max-w-none">
                                <div
                                  className="whitespace-pre-wrap leading-relaxed text-gray-700"
                                  dangerouslySetInnerHTML={{
                                    __html: assessmentData.generatedContent
                                      .replace(/\n\n/g, "</p><p>")
                                      .replace(/^/, "<p>")
                                      .replace(/$/, "</p>")
                                      .replace(
                                        /###\s+(.+?)(<\/p><p>|$)/g,
                                        '<h3 class="text-xl font-bold mb-4 mt-6 text-gray-900">$1</h3><p>',
                                      )
                                      .replace(
                                        /\*\*(.+?)\*\*/g,
                                        "<strong>$1</strong>",
                                      )
                                      .replace(/_(.+?)_/g, "<em>$1</em>")
                                      .replace(/^<p><\/p>/, "")
                                      .replace(/<p><\/p>$/g, ""),
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                          <div className="whitespace-pre-wrap font-sans">
                            {assessmentData.generatedContent}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Scoring Criteria - Internal Use */}
                    {assessmentData.scoringCriteria && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="bg-amber-100 p-2 rounded-full">
                            <span className="text-amber-700 font-bold text-sm">
                              📋
                            </span>
                          </div>
                          <h4 className="font-semibold text-amber-900">
                            Scoring Criteria (Internal Use)
                          </h4>
                        </div>
                        <div className="text-sm text-amber-800 leading-relaxed whitespace-pre-wrap">
                          {assessmentData.scoringCriteria}
                        </div>
                      </div>
                    )}

                    {isEditing && (
                      <div className="flex justify-end gap-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          size="sm"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSave}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Assessment Available
                    </h3>
                    <p className="text-gray-600">
                      Skills assessment has not been created yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
