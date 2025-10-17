"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useActionState, useTransition } from "react";
import { createJobData } from "./actions";
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
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CompanySearchSelect } from "./CompanySearchSelect";
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
import { AdminRoutes } from "@/admin/router";
import {
  WORK_AUTHORIZATION_OPTIONS,
  WORK_ARRANGEMENT_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
} from "@/lib/constants/jobs-constants";

export default function JobsManagmentCreatePage() {
  const formRef = useRef(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, createJobAction] = useActionState(createJobData, null);
  const [editedAssessment, setEditedAssessment] = useState({
    title: "",
    estimatedTime: "",
    totalQuestions: "",
    instructions: "",
    openingQuestion: {
      title: "",
      content: "",
    },
    generatedContent: "",
    scoringCriteria: "",
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
    internal_notes: "",
  });
  const [activeTab, setActiveTab] = useState("description");

  const handleCancel = () => {
    /* Lines 95-96 omitted */
  };

  const handleSubmit = async () => {
    if (!formRef.current) return;

    // Obtener FormData del formulario
    const formData = new FormData(formRef.current);

    // Preparar los datos de los arrays como strings separados por comas
    formData.set(
      "responsibilities",
      editedJob.responsibilities.filter((r) => r.trim()).join(","),
    );
    formData.set(
      "who_would_love",
      editedJob.who_would_love.filter((w) => w.trim()).join(","),
    );
    formData.set(
      "pollen_approved_requirements",
      editedJob.pollen_approved_requirements.filter((p) => p.trim()).join(","),
    );

    // Agregar datos del assessment
    formData.set("assessment_title", editedAssessment.title || "");
    formData.set(
      "assessment_estimated_time",
      editedAssessment.estimatedTime || "",
    );
    formData.set(
      "assessment_total_questions",
      editedAssessment.totalQuestions || "",
    );
    formData.set(
      "assessment_instructions",
      editedAssessment.instructions || "",
    );
    formData.set(
      "assessment_opening_question_title",
      editedAssessment.openingQuestion?.title || "",
    );
    formData.set(
      "assessment_opening_question_content",
      editedAssessment.openingQuestion?.content || "",
    );
    formData.set("assessment_content", editedAssessment.generatedContent || "");
    formData.set(
      "assessment_scoring_criteria",
      editedAssessment.scoringCriteria || "",
    );

    // Enviar el formulario usando startTransition
    startTransition(() => {
      createJobAction(formData);
    });
  };

  const updateEditedJob = (field, value) => {
    setEditedJob((prev) => ({ ...prev, [field]: value }));
  };

  const updateEditedAssessment = (field, value) => {
    setEditedAssessment((prev) => ({ ...prev, [field]: value }));
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
      [field]: [...prev[field], ""],
    }));
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirmSubmit = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      handleSubmit(formData);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Create a new Job"
        description="Fill in the details below to create a new job posting"
        showBackButton={true}
        onBack={() => router.back()}
      />

      <FormContainer ref={formRef} action={createJobAction}>
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
            {/* Job Overview Card */}
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
                    defaultValue={editedJob?.job_title || ""}
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
                    options={WORK_ARRANGEMENT_OPTIONS}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="font-medium text-gray-900">
                    Employment Details
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <DSSelect
                      label="Employment Type"
                      name="employment_type"
                      value={editedJob?.employment_type || ""}
                      onValueChange={(value) =>
                        updateEditedJob("employment_type", value)
                      }
                      placeholder="Select type"
                      options={EMPLOYMENT_TYPE_OPTIONS}
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
                        options={WORK_AUTHORIZATION_OPTIONS}
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
            <FormCard
              icon={<Brain className="h-5 w-5 text-gray-500" />}
              title="Create Skills Assessment"
            >
              <div className="flex flex-col gap-6">
                {/* Assessment Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="font-medium text-blue-900 mb-2">
                    Assessment Guidelines
                  </div>
                  <p className="text-sm text-blue-800">
                    Create a skills assessment that will help evaluate
                    candidates for this role. The assessment should include
                    relevant questions, tasks, and scoring criteria.
                  </p>
                </div>

                {/* Assessment Basic Info */}
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

                {/* Opening Question */}
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

                {/* Main Assessment Content */}
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

                {/* Scoring Criteria */}
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

                {/* Assessment Preview */}
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

                {/* Hidden inputs for form submission */}
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
                {isPending ? "Creating..." : "Create Job"}
              </Button>
            }
            title="Confirm job creation?"
            description="Are you sure you want to create this job? This will add a new job posting to the system."
            confirmText="Confirm"
            cancelText="Cancel"
            onConfirm={handleConfirmSubmit}
            isLoading={isPending}
            loadingText="Creating..."
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </FormActions>
      </FormContainer>
    </PageContainer>
  );
}
