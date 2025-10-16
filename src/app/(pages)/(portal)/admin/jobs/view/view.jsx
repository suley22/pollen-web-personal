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
  ArrowLeft,
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
import {
  PageContainer,
  FormCard,
  DescriptionCard,
} from "@/components/design-system";
import Page from "../../employers/create/page";
import { JobViewHeader } from "./_components/header";
import {
  LiveBadge,
  PausedBadge,
  NeutralBadge,
  InfoBadge,
} from "@/components/design-system/badge";
import { AdminRoutes } from "../../router";

export default function JobsManagmentReviewPage({
  job,
  personaData,
  assessmentData,
}) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [submittedToEmployer, setSubmittedToEmployer] = useState(false);
  const [editedAssessment, setEditedAssessment] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isEditingAssessment, setIsEditingAssessment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJobStatus, setCurrentJobStatus] = useState(null);
  const router = useRouter();
  const [candidateCompletionData, setCandidateCompletionData] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  const persona = personaData;

  const canMarkComplete = () => {
    if (!candidateCompletionData) return false;
    return (
      candidateCompletionData.pendingFeedback === 0 &&
      candidateCompletionData.totalCandidates > 0
    );
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
    console.log(`Job ${action} action for job:`, job.id);

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
    <PageContainer>
      {/* Header */}
      <JobViewHeader
        jobTitle={job.job_title}
        companyName={job.company_name}
        jobStatus={currentJobStatus || job.status}
        isEditing={isEditing}
        isEditingAssessment={isEditingAssessment}
        canMarkComplete={canMarkComplete()}
        completeButtonDisabledReason={getCompleteButtonDisabledReason()}
        onBack={() => router.back()}
        onEdit={handleEditClick}
        onSave={isEditing ? handleSave : handleSaveAssessment}
        onCancel={handleCancel}
        onSubmitToEmployer={() => handleStatusAction("submit-to-employer")}
        onGoLive={() => handleStatusAction("go-live")}
        onPause={() => handleStatusAction("pause")}
        onComplete={() => handleStatusAction("complete")}
        onCancelJob={() => handleStatusAction("cancel")}
        onDelete={() => console.log("Delete job")}
      />

      {/* Main Content */}
      <div className=" mx-auto">
        {/* Draft Job Status Card */}

        <FormCard title="Job Status" icon={<Building2 className="h-5 w-5" />}>
          {/* Status Badge */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
              {(() => {
                switch (job.status) {
                  case "live":
                    return <LiveBadge> Live </LiveBadge>;
                  case "paused":
                    return <PausedBadge> Paused </PausedBadge>;
                  case "complete":
                    return <NeutralBadge> Complete </NeutralBadge>;
                  case "draft":
                    return <InfoBadge> Draft </InfoBadge>;
                  default:
                    return <InfoBadge> </InfoBadge>;
                }
              })()}
              {/* Candidate Counts Below Button */}
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    {job.candidate_counts.new} New
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    {job.candidate_counts.inProgress} In Progress
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {job.candidate_counts.complete} Matched
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full" />
                    {job.candidate_counts.hired} Complete
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => router.push(AdminRoutes.jobsApplicants(job.id))}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Candidates ({job.candidate_counts.total})
            </Button>
          </div>
        </FormCard>

        {/* View Candidates Button */}

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

        {/* 3-Tab Structure for All Jobs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="description"
              className="flex items-center gap-2"
            >
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
            <FormCard
              title="Job Overview"
              icon={<Briefcase className="h-5 w-5" />}
            >
              <div>
                {!isEditing ? (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {job.job_title}
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
                        {job.company_name}
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
                    {job.job_type}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {job.salary_range}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-4 w-4 mr-2" />
                    {job.work_arrangement}
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
                      {job.employment_type}
                    </div>
                    <div>
                      <span className="font-medium">Start Date:</span>{" "}
                      {job.start_date}
                    </div>
                    <div>
                      <span className="font-medium">Application Deadline:</span>{" "}
                      {job.application_deadline}
                    </div>
                    <div>
                      <span className="font-medium">Authorisation:</span>{" "}
                      {job.work_authorization}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employmentType">Employment Type</Label>
                      <Select
                        value={editedJob?.employment_type || ""}
                        onValueChange={(value) =>
                          updateEditedJob("employment_type", value)
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
                          <SelectItem value="Internship">Internship</SelectItem>
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
                          updateEditedJob("applicationDeadline", e.target.value)
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
            </FormCard>

            {/* About This Role Card */}

            <DescriptionCard
              title="About this role"
              icon={<FileText className="h-5 w-5" />}
              value={job.description}
            />
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
                      <li key={responsibility} className="flex items-start">
                        <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-3">
                    {editedJob?.responsibilities?.map(
                      (responsibility, index) => (
                        <div
                          key={responsibility}
                          className="flex items-center gap-2"
                        >
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
                    {job.who_would_love.map((trait, index) => (
                      <li key={trait} className="flex items-start">
                        <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{trait}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-3">
                    {editedJob?.who_would_love?.map((trait, index) => (
                      <div key={trait} className="flex items-center gap-2">
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
                  <p className="text-gray-700">{job.success_looks}</p>
                ) : (
                  <Textarea
                    value={editedJob?.success_looks || ""}
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
                    {job.pollen_approved_requirements?.map((requirement) => (
                      <li key={requirement} className="flex items-start">
                        <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-3">
                    {editedJob?.pollen_approved_requirements?.map(
                      (requirement, index) => (
                        <div
                          key={requirement}
                          className="flex items-center gap-2"
                        >
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
                  <p className="text-gray-700">{job.internal_notes}</p>
                ) : (
                  <Textarea
                    value={editedJob?.internal_notes || ""}
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
                        {persona.primaryDisc}
                      </p>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-blue-900">
                            Key Traits:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {persona.traits.map((trait) => (
                              <Badge
                                key={trait}
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
                            {persona.workStyle}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-900">
                            Ideal Environment:
                          </span>
                          <p className="text-sm text-blue-700 mt-1">
                            {persona.idealEnvironment}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Behavioral Insights
                      </h4>
                      <p className="text-sm text-gray-700">
                        {persona.behavioralInsights}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        // TODO: colocar función del click
                        onClick={() => {
                          router.push(`/admin/jobs-managment/persona-results`);
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
                              job applications, but pretty please don&apos;t
                              copy and paste an answer for your application. We
                              have beady-eyes and will not accept anything that
                              is obviously AI generated. We want to know the
                              real you, not a robot. You&apos;ve got this!
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
                                    <div key={task.id} className="space-y-3">
                                      <h3 className="text-base font-semibold text-gray-900">
                                        {index + 2}.{" "}
                                        {task.title || `Task ${index + 1}`}{" "}
                                        <span className="text-red-500">*</span>
                                      </h3>
                                      <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                                        <div
                                          // eslint-disable-next-line react/no-danger
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
                                  // eslint-disable-next-line react/no-danger
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
    </PageContainer>
  );
}
