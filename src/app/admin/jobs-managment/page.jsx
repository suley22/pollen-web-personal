'use client'


import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  CheckCircle,
  Copy,
  Edit,
  Eye,
  Play,
  X,
} from "lucide-react";

export default function JobsManagmentPage() {
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

  const baseJobData = getJobData(jobId || "1");
  const job = {
    ...baseJobData,
    status: currentJobStatus || baseJobData.status,
  };

  const handleEditClick = () => {
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

   
    return (
        <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
                  <div className="w-2 h-2 rounded-full bg-yellow-500"/>
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
                            "_blank"
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
      </div>




      
      </div>);
}