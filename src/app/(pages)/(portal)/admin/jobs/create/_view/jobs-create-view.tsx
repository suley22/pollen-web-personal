"use client";

import { FileText, UserCheck, Brain, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  PageContainer,
  PageHeader,
  FormActions,
  ConfirmationDialog,
  PrimaryButton,
  FormContainer,
} from "@/components/design-system";
import { JobDescriptionTab } from "../_components/tabs/jobs-create-job-description-tab";
import { PersonaTab } from "../_components/tabs/jobs-create-persona-result-tab";
import { AssessmentTab } from "../_components/tabs/jobs-create-skills-assessment-tab";
import { useJobsCreatePage } from "../_hook/jobs-create-hook";

const CreateUpdateButton = ({ isEditMode, isLoading, onClick }) => (
  <PrimaryButton
    icon={<CheckCircle className="h-5 w-5" />}
    text={isEditMode ? "Update Job" : "Create Job"}
    loading={isLoading}
    disabled={isLoading}
    onClick={onClick}
  />
);

export function JobForm({ id = null }) {
  // ✅ Usa el hook para obtener toda la lógica
  const {
    job,
    formRef,
    isLoading,
    activeTab,
    isEditMode,
    isDialogOpen,
    personaResultAssessmentId,
    skillsAssessmentId,
    setActiveTab,
    setIsDialogOpen,
    handleBack,
    handleAssessmentChange,
    handleSkillsAssessmentChange,
    saveJob,
  } = useJobsCreatePage({ id });

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
      >
        <CreateUpdateButton
          isEditMode={isEditMode}
          isLoading={isLoading}
          onClick={() => setIsDialogOpen(true)}
        />
      </PageHeader>

      <FormContainer ref={formRef}>
        {/* Hidden fields to ensure all data is available on form submit */}
        <input
          type="hidden"
          name="persona_result_assessment_id"
          value={personaResultAssessmentId || ""}
        />
        <input
          type="hidden"
          name="skills_assessment_id"
          value={skillsAssessmentId || ""}
        />
        {/* Job overview fields - these will be synced from the actual inputs */}
        <input type="hidden" name="job_title" id="hidden_job_title" />
        <input type="hidden" name="company_id" id="hidden_company_id" />
        <input type="hidden" name="user_id" id="hidden_user_id" />
        <input type="hidden" name="location" id="hidden_location" />
        <input type="hidden" name="working_hours" id="hidden_working_hours" />
        <input type="hidden" name="salary_range" id="hidden_salary_range" />
        <input
          type="hidden"
          name="work_arrangement"
          id="hidden_work_arrangement"
        />
        <input
          type="hidden"
          name="employment_type"
          id="hidden_employment_type"
        />
        <input
          type="hidden"
          name="work_authorization"
          id="hidden_work_authorization"
        />
        <input type="hidden" name="description" id="hidden_description" />

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
            <JobDescriptionTab initialData={job} />
          </TabsContent>

          <TabsContent value="persona" className="space-y-6">
            <PersonaTab
              key={`persona-tab-${id || "new"}`}
              personaData={null}
              initialAssessmentId={job?.persona_result_assessment_id}
              onAssessmentChange={handleAssessmentChange}
            />
          </TabsContent>

          <TabsContent value="assessment" className="space-y-6">
            <AssessmentTab
              initialAssessmentId={skillsAssessmentId}
              onAssessmentChange={handleSkillsAssessmentChange}
            />
          </TabsContent>
        </Tabs>
      </FormContainer>

      <FormActions>
        <ConfirmationDialog
          trigger={
            <CreateUpdateButton
              isEditMode={isEditMode}
              isLoading={isLoading}
              onClick={() => setIsDialogOpen(true)}
            />
          }
          title={isEditMode ? "Confirm job update?" : "Confirm job creation?"}
          description={
            isEditMode
              ? "Are you sure you want to update this job? This will modify the existing job posting in the system."
              : "Are you sure you want to create this job? This will add a new job posting to the system."
          }
          confirmText="Confirm"
          cancelText="Cancel"
          onConfirm={saveJob}
          isLoading={isLoading}
          loadingText={isEditMode ? "Updating..." : "Creating..."}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </FormActions>
    </PageContainer>
  );
}
