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
  Info,
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
  Select,
  InfoField,
} from "@/components/design-system";
import {
  WORK_ARRANGEMENT_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  WORK_AUTHORIZATION_OPTIONS,
  ASSESSMENT_PLACEHOLDER_CONSTANT,
  ASSESSMENT_SCORING_PLACEHOLDER,
  WORKING_HOURS_OPTIONS,
} from "@/lib/configs/constants/jobs-constants";

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

  const updateEditedJob = (event) => {
    const { name, value } = event.target;
    setEditedJob((prev) => ({ ...prev, [name]: value }));
  };

  const updateEditedAssessment = (event) => {
    const { name, value } = event.target;
    setEditedAssessment((prev) => ({ ...prev, [name]: value }));
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

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description" className="flex items-center gap-2">
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
          <FormContainer ref={formRef} action={updateJobAction}>
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
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Location"
                    id="location"
                    name="location"
                    value={editedJob?.location || ""}
                    placeholder="Enter location..."
                  />
                  <Select
                    label="Working Hours"
                    name="job_type"
                    id="job_type"
                    placeholder="Select working hours"
                    defaultValue={editedJob?.job_type || ""}
                    options={WORKING_HOURS_OPTIONS}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Salary Range"
                    id="salaryRange"
                    name="salary_range"
                    value={editedJob?.salary_range || ""}
                    placeholder="e.g. £25,000 - £30,000"
                  />

                  <Select
                    label="Work Arrangement"
                    name="work_arrangement"
                    value={editedJob?.work_arrangement || ""}
                    placeholder="Select arrangement"
                    options={WORK_ARRANGEMENT_OPTIONS}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="font-medium text-gray-900">
                    Employment Details
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Employment Type"
                      name="employment_type"
                      defaultValue={editedJob?.employment_type || ""}
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
                    />

                    <Input
                      label="Employment Type Details"
                      id="employmentTypeDetails"
                      name="employment_type_details"
                      value={editedJob?.employment_type_details || ""}
                      placeholder="e.g. Standard employment contract"
                    />

                    <div className="col-span-2">
                      <Select
                        label="Work Authorisation"
                        name="work_authorization"
                        value={editedJob?.work_authorization || ""}
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
                  initialItems={editedJob.who_would_love}
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
            />
          </FormContainer>
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
                <Input
                  id="assessmentTitle"
                  name="assessment_title"
                  label="Assessment Title"
                  value={editedAssessment?.title || ""}
                  placeholder="e.g. Marketing Coordinator Skills Assessment"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="estimated_time"
                    name="estimated_time"
                    label="Estimated Time (minutes)"
                    type="number"
                    value={editedAssessment?.estimatedTime || ""}
                    placeholder="45"
                  />

                  <Input
                    id="total_questions"
                    name="total_questions"
                    label="Total Questions"
                    type="number"
                    value={editedAssessment?.totalQuestions || ""}
                    placeholder="5"
                  />
                </div>

                <Textarea
                  id="assessment_instructions"
                  name="assessment_instructions"
                  label="Assessment Instructions"
                  value={editedAssessment?.instructions || ""}
                  className="min-h-[100px]" // TODO: Agregar un parámetro size sm-md-lg
                  placeholder="Please read each question carefully and provide detailed responses. This assessment is designed to evaluate your skills and experience relevant to this role..."
                />
              </div>

              <FormCard
                title="Opening Question"
                icon={<Lightbulb className="h-5 w-5 text-yellow-500" />}
              >
                <div className="flex flex-col gap-4">
                  <Input
                    id="opening_question_title"
                    name="opening_question_title"
                    label="Question Title"
                    value={editedAssessment?.openingQuestion?.title || ""}
                    placeholder="Tell us about yourself and your interest in this role"
                  />

                  <Textarea
                    id="opening_question_content"
                    name="opening_question_content"
                    label="Question Content/Instructions"
                    value={editedAssessment?.openingQuestion?.content || ""}
                    className="min-h-[80px]"
                    placeholder="Please provide a brief introduction about yourself, your background, and what interests you about this position..."
                  />
                </div>
              </FormCard>

              <FormCard
                title="Assessment Questions and Tasks"
                icon={<Brain className="h-5 w-5 text-gray-500" />}
              >
                <div className="flex flex-col gap-4">
                  <Textarea
                    id="assessmentContent"
                    name="assessment_content"
                    label="Full Assessment Content"
                    value={editedAssessment?.generatedContent || ""}
                    className="min-h-[300px] font-mono text-sm"
                    placeholder={ASSESSMENT_PLACEHOLDER_CONSTANT}
                  />

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
                <Textarea
                  id="scoring_criteria"
                  name="scoring_criteria"
                  label="Evaluation Guidelines"
                  value={editedAssessment?.scoringCriteria || ""}
                  className="min-h-[200px]"
                  placeholder={ASSESSMENT_SCORING_PLACEHOLDER}
                />
              </FormCard>

              <FormCard
                title="Assessment Preview"
                icon={<Eye className="h-5 w-5 text-purple-500" />}
              >
                <div className="flex flex-col gap-2">
                  <InfoField label="Title" value={editedAssessment?.title} />
                  <InfoField
                    label="Estimated Time (minutes)"
                    value={editedAssessment?.estimatedTime ?? "Not specified"}
                  />

                  <InfoField
                    label="Total Questions"
                    value={editedAssessment?.totalQuestions || "Not specified"}
                  />

                  <InfoField
                    label="Opening Question"
                    value={
                      editedAssessment?.openingQuestion?.title || "Not defined"
                    }
                  />

                  <InfoField
                    label="Content Length (characters)"
                    value={editedAssessment?.generatedContent?.length || 0}
                  />

                  <InfoField
                    label="Has Scoring Criteria"
                    value={editedAssessment?.scoringCriteria ? "Yes" : "No"}
                  />
                </div>
              </FormCard>
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
    </PageContainer>
  );
}
