"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useActionState, useEffect } from "react";
import { updateJobData } from "./actions";
import { AdminRoutes } from "../../router";
import {
  Target,
  FileText,
  Lightbulb,
  Award,
  UserCheck,
  Briefcase,
  Brain,
  CheckCircle,
  Eye,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CompanySearchSelect } from "../create/CompanySearchSelect";
import {
  FormCard,
  PageContainer,
  PageHeader,
  FormContainer,
  FormActions,
  ConfirmationDialog,
  Input,
  Textarea,
  TextAreaCard,
  DynamicListInput,
  Select as DSSelect,
} from "@/components/design-system";

export function JobEditForm({ job, assessment = null }) {
  const formRef = useRef(null);
  const router = useRouter();
  const [state, updateJobAction, isPending] = useActionState(
    updateJobData.bind(null, job?.id),
    null,
  );

  const [editedAssessment, setEditedAssessment] = useState({
    title: assessment?.structured_questions?.title || "",
    estimatedTime: assessment?.structured_questions?.estimatedTime || "",
    totalQuestions: assessment?.structured_questions?.totalQuestions || "",
    instructions: assessment?.structured_questions?.instructions || "",
    openingQuestion: {
      title: assessment?.structured_questions?.openingQuestion?.title || "",
      content: assessment?.structured_questions?.openingQuestion?.content || "",
    },
    generatedContent: assessment?.generated_content || "",
    scoringCriteria: assessment?.scoring_criteria || "",
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
    job_title: job?.job_title || "",
    company_name: job?.company_name || "",
    location: job?.location || "",
    job_type: job?.job_type || "",
    salary_range: job?.salary_range || "",
    work_arrangement: job?.work_arrangement || "",
    employment_type: job?.employment_type || "",
    employment_type_details: job?.employment_type_details || "",
    start_date: job?.start_date || "",
    application_deadline: job?.application_deadline || "",
    work_authorization: job?.work_authorization || "",
    description: job?.description || "",
    responsibilities: job?.responsibilities || [""],
    who_would_love: job?.who_would_love || [""],
    success_looks: job?.success_looks || "",
    pollen_approved_requirements: job?.pollen_approved_requirements || [""],
    internal_notes: job?.internal_notes || "",
  });

  const [activeTab, setActiveTab] = useState("description");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Efecto para manejar la redirección después de actualizar
  useEffect(() => {
    if (state?.success) {
      console.log(
        "Update successful, redirecting to:",
        AdminRoutes.jobView(job.id),
      );
      router.push(AdminRoutes.jobView(job.id));
      router.refresh();
    } else if (state?.error) {
      console.error("Update failed:", state.error);
    }
  }, [state, router, job.id]);

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (formData) => {
    // Los datos de DynamicListInput vienen como JSON strings, no necesitamos procesarlos aquí
    // El action se encargará de convertirlos

    // Añadir datos del assessment
    formData.set("assessment_title", editedAssessment.title);
    formData.set("estimated_time", editedAssessment.estimatedTime);
    formData.set("total_questions", editedAssessment.totalQuestions);
    formData.set("assessment_instructions", editedAssessment.instructions);
    formData.set(
      "opening_question_title",
      editedAssessment.openingQuestion.title,
    );
    formData.set(
      "opening_question_content",
      editedAssessment.openingQuestion.content,
    );
    formData.set("assessment_content", editedAssessment.generatedContent);
    formData.set("scoring_criteria", editedAssessment.scoringCriteria);

    console.log("Submitting form with job ID:", job.id);
    // useActionState manejará la ejecución y el estado se actualizará automáticamente
    updateJobAction(formData);
  };

  const updateEditedJob = (field, value) => {
    setEditedJob((prev) => ({ ...prev, [field]: value }));
  };

  const updateEditedAssessment = (field, value) => {
    setEditedAssessment((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field, index, value) => {
    setEditedJob((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
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
      [field]: [...prev[field], ""],
    }));
  };

  const handleConfirmSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title={`Edit ${job?.job_title || "Job"}`}
        description="Update the job posting information"
        showBackButton={true}
        onBack={() => router.back()}
      />

      <FormContainer ref={formRef} action={handleSubmit}>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
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
            <FormCard
              icon={<Briefcase className="h-5 w-5 text-gray-500" />}
              title="Job Overview"
            >
              <div className="w-full flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <CompanySearchSelect
                    name="company_name"
                    value={editedJob?.company_name || ""}
                    onValueChange={(value) =>
                      updateEditedJob("company_name", value)
                    }
                  />
                  <Input
                    label="Job Title"
                    type="text"
                    name="job_title"
                    id="job_title"
                    placeholder="Enter job title"
                    value={editedJob?.job_title || ""}
                    onChange={(e) =>
                      updateEditedJob("job_title", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Location"
                    id="location"
                    name="location"
                    value={editedJob?.location || ""}
                    onChange={(e) =>
                      updateEditedJob("location", e.target.value)
                    }
                    placeholder="Enter location..."
                  />

                  <DSSelect
                    label="Working Hours"
                    name="job_type"
                    value={editedJob?.job_type || ""}
                    onValueChange={(value) =>
                      updateEditedJob("job_type", value)
                    }
                    placeholder="Select working hours"
                    options={[
                      { value: "Full-time", label: "Full-time" },
                      { value: "Part-time", label: "Part-time" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Salary Range"
                    id="salaryRange"
                    name="salary_range"
                    value={editedJob?.salary_range || ""}
                    onChange={(e) =>
                      updateEditedJob("salary_range", e.target.value)
                    }
                    placeholder="e.g. £25,000 - £30,000"
                  />

                  <DSSelect
                    label="Work Arrangement"
                    name="work_arrangement"
                    value={editedJob?.work_arrangement || ""}
                    onValueChange={(value) =>
                      updateEditedJob("work_arrangement", value)
                    }
                    placeholder="Select arrangement"
                    options={[
                      { value: "Office-based", label: "Office-based" },
                      { value: "Remote", label: "Remote" },
                      { value: "Hybrid", label: "Hybrid" },
                      { value: "Out and About", label: "Out and About" },
                    ]}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h4 className="font-medium text-gray-900">
                    Employment Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <DSSelect
                      label="Employment Type"
                      name="employment_type"
                      value={editedJob?.employment_type || ""}
                      onValueChange={(value) =>
                        updateEditedJob("employment_type", value)
                      }
                      placeholder="Select type"
                      options={[
                        { value: "Permanent", label: "Permanent" },
                        {
                          value: "Fixed term/temporary",
                          label: "Fixed term/temporary",
                        },
                        {
                          value: "Contract/freelance",
                          label: "Contract/freelance",
                        },
                        { value: "Internship", label: "Internship" },
                        { value: "Apprenticeship", label: "Apprenticeship" },
                      ]}
                    />

                    <Input
                      label="Start Date"
                      id="startDate"
                      name="start_date"
                      value={editedJob?.start_date || ""}
                      onChange={(e) =>
                        updateEditedJob("start_date", e.target.value)
                      }
                      placeholder="e.g. ASAP, January 2025"
                    />

                    <Input
                      label="Application Deadline"
                      id="applicationDeadline"
                      name="application_deadline"
                      type="date"
                      value={editedJob?.application_deadline || ""}
                      onChange={(e) =>
                        updateEditedJob("application_deadline", e.target.value)
                      }
                    />

                    <Input
                      label="Employment Type Details"
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

                    <div className="col-span-2">
                      <DSSelect
                        label="Work Authorisation"
                        name="work_authorization"
                        value={editedJob?.work_authorization || ""}
                        onValueChange={(value) =>
                          updateEditedJob("work_authorization", value)
                        }
                        placeholder="Select work authorisation requirement"
                        options={[
                          {
                            value: "UK work authorisation required",
                            label: "UK work authorisation required",
                          },
                          {
                            value: "EU work authorisation required",
                            label: "EU work authorisation required",
                          },
                          {
                            value: "No work authorisation required",
                            label: "No work authorisation required",
                          },
                          {
                            value: "Sponsorship available",
                            label: "Sponsorship available",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FormCard>

            <TextAreaCard
              title="About This Role"
              icon={<FileText className="h-5 w-5" />}
              name="description"
              placeholder="Enter job description..."
              value={editedJob?.description || ""}
              onChange={(e) => updateEditedJob("description", e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormCard
                title="Key Responsibilities"
                icon={<Target className="h-5 w-5" />}
              >
                <DynamicListInput
                  title="Key Responsibilities"
                  icon={<Target className="h-5 w-5" />}
                  name="responsibilities"
                  addButtonText="Add Responsibility"
                  fields={[
                    {
                      key: "value",
                      placeholder: "Enter responsibility...",
                      type: "text",
                    },
                  ]}
                  initialItems={editedJob.responsibilities.map((r, i) => ({
                    id: `resp-${i}`,
                    value: r,
                  }))}
                />
              </FormCard>

              <FormCard
                title="Who Would Love This Role"
                icon={<Users className="h-5 w-5" />}
              >
                <DynamicListInput
                  title="Who Would Love This Job"
                  icon={<Users className="h-5 w-5" />}
                  name="who_would_love"
                  addButtonText="Add Trait"
                  fields={[
                    {
                      key: "value",
                      placeholder: "Enter ideal candidate trait...",
                      type: "text",
                    },
                  ]}
                  initialItems={editedJob.who_would_love.map((w, i) => ({
                    id: `who-${i}`,
                    value: w,
                  }))}
                />
              </FormCard>
            </div>

            <TextAreaCard
              title="Success In This Role Looks Like"
              icon={<Target className="h-5 w-5" />}
              name="success_looks"
              placeholder="Describe what success looks like in this role..."
              value={editedJob?.success_looks || ""}
              onChange={(e) => updateEditedJob("success_looks", e.target.value)}
            />

            <FormCard
              title="Pollen Approved Requirements"
              icon={<CheckCircle className="h-5 w-5 " />}
            >
              <DynamicListInput
                title="Pollen Approved Requirements"
                icon={<Award className="h-5 w-5" />}
                name="pollen_approved_requirements"
                addButtonText="Add Requirement"
                fields={[
                  {
                    key: "value",
                    placeholder: "Enter requirement...",
                    type: "text",
                  },
                ]}
                initialItems={editedJob.pollen_approved_requirements.map(
                  (p, i) => ({
                    id: `req-${i}`,
                    value: p,
                  }),
                )}
              />
            </FormCard>

            <TextAreaCard
              title="Internal Notes"
              icon={<Lightbulb className="h-5 w-5" />}
              name="internal_notes"
              placeholder="Add internal notes about this role..."
              value={editedJob?.internal_notes || ""}
              onChange={(e) =>
                updateEditedJob("internal_notes", e.target.value)
              }
            />
          </TabsContent>

          <TabsContent value="persona" className="space-y-6">
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
                        onClick={() => {
                          console.log("View full persona results");
                        }}
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
            <FormCard
              icon={<Brain className="h-5 w-5 text-gray-500" />}
              title="Edit Skills Assessment"
            >
              <div className="flex flex-col gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="font-medium text-blue-900 mb-2">
                    Assessment Guidelines
                  </div>
                  <p className="text-sm text-blue-800">
                    Update the skills assessment that will help evaluate
                    candidates for this role. The assessment should include
                    relevant questions, tasks, and scoring criteria.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="assessmentTitle" className="mb-2">
                      Assessment Title
                    </Label>
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
                      <Label htmlFor="estimatedTime" className="mb-2">
                        Estimated Time (minutes)
                      </Label>
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
                      <Label htmlFor="totalQuestions" className="mb-2">
                        Total Questions
                      </Label>
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
                    <Label htmlFor="assessmentInstructions" className="mb-2">
                      Assessment Instructions
                    </Label>
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

                <FormCard
                  title="Opening Question"
                  icon={<Lightbulb className="h-5 w-5 text-yellow-500" />}
                >
                  <div className="flex flex-col gap-4">
                    <div>
                      <Label htmlFor="openingQuestionTitle" className="mb-2">
                        Question Title
                      </Label>
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
                            },
                          }))
                        }
                        placeholder="Tell us about yourself and your interest in this role"
                      />
                    </div>

                    <div>
                      <Label htmlFor="openingQuestionContent" className="mb-2">
                        Question Content/Instructions
                      </Label>
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
                            },
                          }))
                        }
                        className="min-h-[80px]"
                        placeholder="Please provide a brief introduction about yourself, your background, and what interests you about this position..."
                      />
                    </div>
                  </div>
                </FormCard>

                <FormCard
                  title="Assessment Questions and Tasks"
                  icon={<Brain className="h-5 w-5 text-gray-500" />}
                >
                  <div className="flex flex-col gap-4">
                    <div>
                      <Label htmlFor="assessmentContent" className="mb-2">
                        Full Assessment Content
                      </Label>
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
                      <p>
                        <strong>Tip:</strong> Use ### for question headers, and
                        provide clear instructions for each section.
                      </p>
                    </div>
                  </div>
                </FormCard>

                <FormCard
                  title="Scoring Criteria"
                  icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                >
                  <div>
                    <div className="mb-2">
                      <Label htmlFor="scoringCriteria">
                        Evaluation Guidelines
                      </Label>
                    </div>
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
                </FormCard>

                <FormCard
                  title="Assessment Preview"
                  icon={<Eye className="h-5 w-5 text-purple-500" />}
                >
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      <strong>Title:</strong>{" "}
                      {editedAssessment?.title || "Not specified"}
                    </p>
                    <p>
                      <strong>Estimated Time:</strong>{" "}
                      {editedAssessment?.estimatedTime
                        ? `${editedAssessment.estimatedTime} minutes`
                        : "Not specified"}
                    </p>
                    <p>
                      <strong>Total Questions:</strong>{" "}
                      {editedAssessment?.totalQuestions || "Not specified"}
                    </p>
                    <p>
                      <strong>Opening Question:</strong>{" "}
                      {editedAssessment?.openingQuestion?.title ||
                        "Not defined"}
                    </p>
                    <p>
                      <strong>Content Length:</strong>{" "}
                      {editedAssessment?.generatedContent
                        ? `${editedAssessment.generatedContent.length} characters`
                        : "No content"}
                    </p>
                    <p>
                      <strong>Has Scoring Criteria:</strong>{" "}
                      {editedAssessment?.scoringCriteria ? "Yes" : "No"}
                    </p>
                  </div>
                </FormCard>

                <div className="hidden">
                  <input
                    type="hidden"
                    name="assessment_title"
                    value={editedAssessment?.title || ""}
                  />
                  <input
                    type="hidden"
                    name="estimated_time"
                    value={editedAssessment?.estimatedTime || ""}
                  />
                  <input
                    type="hidden"
                    name="total_questions"
                    value={editedAssessment?.totalQuestions || ""}
                  />
                  <input
                    type="hidden"
                    name="assessment_instructions"
                    value={editedAssessment?.instructions || ""}
                  />
                  <input
                    type="hidden"
                    name="opening_question_title"
                    value={editedAssessment?.openingQuestion?.title || ""}
                  />
                  <input
                    type="hidden"
                    name="opening_question_content"
                    value={editedAssessment?.openingQuestion?.content || ""}
                  />
                  <input
                    type="hidden"
                    name="assessment_content"
                    value={editedAssessment?.generatedContent || ""}
                  />
                  <input
                    type="hidden"
                    name="scoring_criteria"
                    value={editedAssessment?.scoringCriteria || ""}
                  />
                </div>
              </div>
            </FormCard>
          </TabsContent>
        </Tabs>

        <FormActions>
          <ConfirmationDialog
            trigger={
              <Button type="button" size="lg" disabled={isPending}>
                {isPending ? "Updating..." : "Update Job"}
              </Button>
            }
            title="Confirm job update?"
            description="Are you sure you want to update this job? This will modify the existing job posting in the system."
            confirmText="Confirm"
            cancelText="Cancel"
            onConfirm={handleConfirmSubmit}
            isLoading={isPending}
            loadingText="Updating..."
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </FormActions>
      </FormContainer>
    </PageContainer>
  );
}
