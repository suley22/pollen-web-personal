"use client";

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
import { JobDescriptionTab } from "./create/_components/tabs/job-description-tab";
import { PersonaTab } from "./create/_components/tabs/persona-tab";
import { AssessmentTab } from "./create/_components/tabs/assessment-tab";
import { useJobsPage } from "./_hooks/useJobsPage";

export function JobForm({ job = null, action }) {
  // ✅ Usa el hook para obtener toda la lógica
  const {
    formRef,
    formAction,
    isPending,
    editedJob,
    setEditedJob,
    editedAssessment,
    setEditedAssessment,
    editedPersonaData,
    activeTab,
    setActiveTab,
    isDialogOpen,
    setIsDialogOpen,
    handleBack,
    handleConfirmSubmit,
    updateEditedJob,
    updateEditedAssessment,
    updateAssessmentNestedField,
    updateArrayField,
    removeArrayItem,
    addArrayItem,
    isEditMode,
  } = useJobsPage({ job, action });

  return (
    <PageContainer>
      <PageHeader
        title={
          isEditMode ? `Edit ${job?.job_title || "Job"}` : "Create a new Job"
        }
        subtitle={
          isEditMode
            ? "Update the job posting information"
            : "Fill in the details below to create a new job posting"
        }
        showBackButton={true}
        onBack={handleBack}
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
            formAction={formAction}
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
              {isPending
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Job"
                  : "Create Job"}
            </Button>
          }
          title={isEditMode ? "Confirm job update?" : "Confirm job creation?"}
          description={
            isEditMode
              ? "Are you sure you want to update this job? This will modify the existing job posting in the system."
              : "Are you sure you want to create this job? This will add a new job posting to the system."
          }
          confirmText="Confirm"
          cancelText="Cancel"
          onConfirm={handleConfirmSubmit}
          isLoading={isPending}
          loadingText={isEditMode ? "Updating..." : "Creating..."}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </FormActions>
    </PageContainer>
  );
}
