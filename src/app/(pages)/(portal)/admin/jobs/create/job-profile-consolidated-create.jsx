"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useRef, useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createJobData } from "./actions";
import {
  Target,
  FileText,
  Badge,
  Lightbulb,
  Award,
  UserCheck,
  Briefcase,
  Brain,
  CheckCircle,
  Eye,
  X,
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
import { CompanySearchSelect } from "./CompanySearchSelect";

export default function JobsManagmentCreatePage() {
  const formRef = useRef(null);
  const router = useRouter();
  const [state, createJobAction, isPending] = useActionState(
    createJobData,
    null,
  );
  const [editedAssessment, setEditedAssessment] = useState({
    title: "",
    estimatedTime: "",
    totalQuestions: "",
    instructions: "",
    openingQuestion: {
      title: "",
      content: ""
    },
    generatedContent: "",
    scoringCriteria: ""
  });
  const [editedPersonaData, setEditedPersonaData] = useState({
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
  });
  const [editedJob, setEditedJob] = useState({
    job_title: "",
    company_name: "",
    location: "",
    job_type: "",
    salary_range: "",
    work_arrangement: "",
    employment_type: "",
    employment_type_details: "",
    start_date: "",
    application_deadline: "",
    work_authorization: "",
    description: "",
    responsibilities: [""],
    who_would_love: [""],
    success_looks: "",
    pollen_approved_requirements: [""],
    internal_notes: ""
  });
  const [activeTab, setActiveTab] = useState("description");


  

  
  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (formData) => {
    // Preparar los datos de los arrays como strings separados por comas
    formData.set('responsibilities', editedJob.responsibilities.filter(r => r.trim()).join(','));
    formData.set('who_would_love', editedJob.who_would_love.filter(w => w.trim()).join(','));
    formData.set('pollen_approved_requirements', editedJob.pollen_approved_requirements.filter(p => p.trim()).join(','));
    
    // Agregar datos del assessment
    formData.set('assessment_title', editedAssessment.title || '');
    formData.set('assessment_estimated_time', editedAssessment.estimatedTime || '');
    formData.set('assessment_total_questions', editedAssessment.totalQuestions || '');
    formData.set('assessment_instructions', editedAssessment.instructions || '');
    formData.set('assessment_opening_question_title', editedAssessment.openingQuestion?.title || '');
    formData.set('assessment_opening_question_content', editedAssessment.openingQuestion?.content || '');
    formData.set('assessment_content', editedAssessment.generatedContent || '');
    formData.set('assessment_scoring_criteria', editedAssessment.scoringCriteria || '');
    
    const result = await createJobAction(formData);
    
    if (result?.success) {
      // Redirigir a la lista de jobs o mostrar mensaje de éxito
      router.push('/admin/jobs-managment');
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

  const addArrayItem = (field) => {
    setEditedJob((prev) => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

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
                  Create New Job
                </h1>
                <p className="text-sm text-gray-600">
                  Fill in the details below to create a new job posting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form ref={formRef} action={handleSubmit}>
          {/* Action Buttons for Job Creation */}
          <div className="mb-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Fill in all the details below to create your new job posting
              {state?.error && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                  Error: {state.error}
                </div>
              )}
              {state?.success && (
                <div className="mt-2 text-sm text-green-600 bg-green-50 p-2 rounded">
                  Job created successfully!
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                size="sm"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isPending}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {isPending ? "Creating..." : "Create Job"}
              </Button>
            </div>
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
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center pb-4">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Job Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        name="job_title"
                        value={editedJob?.job_title || ""}
                        onChange={(e) =>
                          updateEditedJob("job_title", e.target.value)
                        }
                        placeholder="Enter job title..."
                      />
                    </div>
                    <div>
                      <CompanySearchSelect
                        name="company_name"
                        value={editedJob?.company_name || ""}
                        onValueChange={(value) =>
                          updateEditedJob("company_name", value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
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
                      name="job_type"
                      value={editedJob?.job_type || ""}
                      onValueChange={(value) =>
                        updateEditedJob("job_type", value)
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
                      name="salary_range"
                      value={editedJob?.salary_range || ""}
                      onChange={(e) =>
                        updateEditedJob("salary_range", e.target.value)
                      }
                      placeholder="e.g. £25,000 - £30,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workArrangement">Work Arrangement</Label>
                    <Select
                      name="work_arrangement"
                      value={editedJob?.work_arrangement || ""}
                      onValueChange={(value) =>
                        updateEditedJob("work_arrangement", value)
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

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h4 className="font-medium text-gray-900">
                    Employment Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employmentType">Employment Type</Label>
                      <Select
                        name="employment_type"
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
                        name="start_date"
                        value={editedJob?.start_date || ""}
                        onChange={(e) =>
                          updateEditedJob("start_date", e.target.value)
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
                        name="application_deadline"
                        type="date"
                        value={editedJob?.application_deadline || ""}
                        onChange={(e) =>
                          updateEditedJob(
                            "application_deadline",
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
                        name="employment_type_details"
                        value={editedJob?.employment_type_details || ""}
                        onChange={(e) =>
                          updateEditedJob(
                            "employment_type_details",
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
                        name="work_authorization"
                        value={editedJob?.work_authorization || ""}
                        onValueChange={(value) =>
                          updateEditedJob("work_authorization", value)
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
                <Textarea
                  name="description"
                  value={editedJob?.description || ""}
                  onChange={(e) =>
                    updateEditedJob("description", e.target.value)
                  }
                  className="min-h-[100px]"
                  placeholder="Enter job description..."
                />
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
                <div className="space-y-3">
                  {editedJob?.who_would_love?.map((trait, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={trait}
                        onChange={(e) =>
                          updateArrayField(
                            "who_would_love",
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
                        onClick={() => removeArrayItem("who_would_love", index)}
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
                    onClick={() => addArrayItem("who_would_love")}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    + Add Trait
                  </Button>
                </div>
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
                <Textarea
                  name="success_looks"
                  value={editedJob?.success_looks || ""}
                  onChange={(e) =>
                    updateEditedJob("success_looks", e.target.value)
                  }
                  className="min-h-[80px]"
                  placeholder="Describe what success looks like in this role..."
                />
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
                <div className="space-y-3">
                  {editedJob?.pollen_approved_requirements?.map(
                    (requirement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={requirement}
                          onChange={(e) =>
                            updateArrayField(
                              "pollen_approved_requirements",
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
                              "pollen_approved_requirements",
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
                    onClick={() => addArrayItem("pollen_approved_requirements")}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    + Add Requirement
                  </Button>
                </div>
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
                <Textarea
                  name="internal_notes"
                  value={editedJob?.internal_notes || ""}
                  onChange={(e) =>
                    updateEditedJob("internal_notes", e.target.value)
                  }
                  className="min-h-[80px]"
                  placeholder="Add internal notes about this role..."
                />
              </CardContent>
            </Card>


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
                {editedPersonaData ? (
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        Ideal Candidate Profile
                      </h3>
                      <p className="text-sm text-blue-800 mb-3">
                        <strong>Primary Behavioral Type:</strong>{" "}
                        {editedPersonaData.primaryDisc}
                      </p>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-blue-900">
                            Key Traits:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {editedPersonaData.traits.map((trait, index) => (
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
                            {editedPersonaData.workStyle}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-900">
                            Ideal Environment:
                          </span>
                          <p className="text-sm text-blue-700 mt-1">
                            {editedPersonaData.idealEnvironment}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Behavioral Insights
                      </h4>
                      <p className="text-sm text-gray-700">
                        {editedPersonaData.behavioralInsights}
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
            {/* Assessment Creation Card */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center pb-4">
                  <Brain className="h-5 w-5 mr-2" />
                  Skills Assessment Creation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Assessment Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Assessment Guidelines
                  </h4>
                  <p className="text-sm text-blue-800">
                    Create a skills assessment that will help evaluate candidates for this role. 
                    The assessment should include relevant questions, tasks, and scoring criteria.
                  </p>
                </div>

                {/* Assessment Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="assessmentTitle">Assessment Title</Label>
                    <Input
                      id="assessmentTitle"
                      name="assessment_title"
                      value={editedAssessment?.title || ""}
                      onChange={(e) =>
                        setEditedAssessment((prev) => ({
                          ...(prev ?? {}),
                          title: e.target.value,
                        }))
                      }
                      placeholder="e.g. Marketing Coordinator Skills Assessment"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                      <Input
                        id="estimatedTime"
                        name="estimated_time"
                        type="number"
                        value={editedAssessment?.estimatedTime || ""}
                        onChange={(e) =>
                          setEditedAssessment((prev) => ({
                            ...(prev ?? {}),
                            estimatedTime: e.target.value,
                          }))
                        }
                        placeholder="45"
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalQuestions">Total Questions</Label>
                      <Input
                        id="totalQuestions"
                        name="total_questions"
                        type="number"
                        value={editedAssessment?.totalQuestions || ""}
                        onChange={(e) =>
                          setEditedAssessment((prev) => ({
                            ...(prev ?? {}),
                            totalQuestions: e.target.value,
                          }))
                        }
                        placeholder="5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="assessmentInstructions">Assessment Instructions</Label>
                    <Textarea
                      id="assessmentInstructions"
                      name="assessment_instructions"
                      value={editedAssessment?.instructions || ""}
                      onChange={(e) =>
                        setEditedAssessment((prev) => ({
                          ...(prev ?? {}),
                          instructions: e.target.value,
                        }))
                      }
                      className="min-h-[100px]"
                      placeholder="Please read each question carefully and provide detailed responses. This assessment is designed to evaluate your skills and experience relevant to this role..."
                    />
                  </div>
                </div>

                {/* Opening Question */}
                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="text-lg">Opening Question</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="openingQuestionTitle">Question Title</Label>
                      <Input
                        id="openingQuestionTitle"
                        name="opening_question_title"
                        value={editedAssessment?.openingQuestion?.title || ""}
                        onChange={(e) =>
                          setEditedAssessment((prev) => ({
                            ...(prev ?? {}),
                            openingQuestion: {
                              ...(prev?.openingQuestion ?? {}),
                              title: e.target.value,
                            }
                          }))
                        }
                        placeholder="Tell us about yourself and your interest in this role"
                      />
                    </div>
                    <div>
                      <Label htmlFor="openingQuestionContent">Question Content/Instructions</Label>
                      <Textarea
                        id="openingQuestionContent"
                        name="opening_question_content"
                        value={editedAssessment?.openingQuestion?.content || ""}
                        onChange={(e) =>
                          setEditedAssessment((prev) => ({
                            ...(prev ?? {}),
                            openingQuestion: {
                              ...(prev?.openingQuestion ?? {}),
                              content: e.target.value,
                            }
                          }))
                        }
                        className="min-h-[80px]"
                        placeholder="Please provide a brief introduction about yourself, your background, and what interests you about this position..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Main Assessment Content */}
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-lg">Assessment Questions & Tasks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="assessmentContent">Full Assessment Content</Label>
                      <Textarea
                        id="assessmentContent"
                        name="assessment_content"
                        value={editedAssessment?.generatedContent || ""}
                        onChange={(e) =>
                          setEditedAssessment((prev) => ({
                            ...(prev ?? {}),
                            generatedContent: e.target.value,
                          }))
                        }
                        className="min-h-[300px] font-mono text-sm"
                        placeholder={`Enter the complete assessment content here. For example:

### Question 1: Experience and Background
Please describe your relevant experience in [specific field]. What projects have you worked on that demonstrate your skills in [key skill areas]?

### Question 2: Scenario-Based Task
You are tasked with [specific scenario relevant to the role]. How would you approach this situation? Please outline your step-by-step process.

### Question 3: Technical Skills
[Include specific technical questions or tasks relevant to the role]

### Question 4: Problem-Solving
[Present a realistic challenge they might face in the role]

### Question 5: Cultural Fit
What type of work environment do you thrive in? How do you handle [specific challenge relevant to company culture]?`}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p><strong>Tip:</strong> Use ### for question headers, and provide clear instructions for each section.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Scoring Criteria */}
                <Card className="border-l-4 border-l-amber-500">
                  <CardHeader>
                    <CardTitle className="text-lg">Scoring Criteria (Internal Use)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="scoringCriteria">Evaluation Guidelines</Label>
                      <Textarea
                        id="scoringCriteria"
                        name="scoring_criteria"
                        value={editedAssessment?.scoringCriteria || ""}
                        onChange={(e) =>
                          setEditedAssessment((prev) => ({
                            ...(prev ?? {}),
                            scoringCriteria: e.target.value,
                          }))
                        }
                        className="min-h-[200px]"
                        placeholder={`Define how responses should be evaluated. For example:

SCORING RUBRIC (1-5 scale):

Question 1 - Experience & Background:
5 - Exceptional relevant experience with specific examples
4 - Strong relevant experience with good examples
3 - Adequate experience with some examples
2 - Limited relevant experience
1 - No relevant experience demonstrated

Question 2 - Scenario-Based Task:
5 - Comprehensive, strategic approach with clear reasoning
4 - Good approach with solid reasoning
3 - Adequate approach with basic reasoning
2 - Incomplete or unclear approach
1 - Poor or no clear approach

Overall Assessment Guidelines:
- Look for specific examples and evidence
- Evaluate problem-solving methodology
- Assess communication clarity
- Consider cultural fit indicators`}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Assessment Preview */}
                <Card className="bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-700">
                      Assessment Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p><strong>Title:</strong> {editedAssessment?.title || "Not specified"}</p>
                      <p><strong>Estimated Time:</strong> {editedAssessment?.estimatedTime ? `${editedAssessment.estimatedTime} minutes` : "Not specified"}</p>
                      <p><strong>Total Questions:</strong> {editedAssessment?.totalQuestions || "Not specified"}</p>
                      <p><strong>Opening Question:</strong> {editedAssessment?.openingQuestion?.title || "Not defined"}</p>
                      <p><strong>Content Length:</strong> {editedAssessment?.generatedContent ? `${editedAssessment.generatedContent.length} characters` : "No content"}</p>
                      <p><strong>Has Scoring Criteria:</strong> {editedAssessment?.scoringCriteria ? "Yes" : "No"}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Hidden inputs for form submission */}
                <div className="hidden">
                  <input type="hidden" name="assessment_title" value={editedAssessment?.title || ""} />
                  <input type="hidden" name="estimated_time" value={editedAssessment?.estimatedTime || ""} />
                  <input type="hidden" name="total_questions" value={editedAssessment?.totalQuestions || ""} />
                  <input type="hidden" name="assessment_instructions" value={editedAssessment?.instructions || ""} />
                  <input type="hidden" name="opening_question_title" value={editedAssessment?.openingQuestion?.title || ""} />
                  <input type="hidden" name="opening_question_content" value={editedAssessment?.openingQuestion?.content || ""} />
                  <input type="hidden" name="assessment_content" value={editedAssessment?.generatedContent || ""} />
                  <input type="hidden" name="scoring_criteria" value={editedAssessment?.scoringCriteria || ""} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </form>
      </div>
    </div>
  );
}
