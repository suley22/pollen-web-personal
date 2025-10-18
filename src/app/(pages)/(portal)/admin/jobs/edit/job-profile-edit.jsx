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
import { JobDescriptionTab } from "./tabs/job-description-tab";
import { PersonaTab } from "./tabs/persona-tab";
import { AssessmentTab } from "./tabs/assessment-tab";

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
          <JobDescriptionTab
            editedJob={editedJob}
            formRef={formRef}
            updateJobAction={updateJobAction}
            updateEditedJob={updateEditedJob}
          />
        </TabsContent>

        <TabsContent value="persona" className="space-y-6">
          <PersonaTab personaData={editedPersonaData} />
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <AssessmentTab
            assessment={editedAssessment}
            updateEditedAssessment={updateEditedAssessment}
          />
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
