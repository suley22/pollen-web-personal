"use client";

import { FileText, UserCheck, Brain, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import {
  PageContainer,
  PageHeader,
  FormActions,
  ConfirmationDialog,
  PrimaryButton,
} from "@/components/design-system";
import { JobDescriptionTab } from "../_components/tabs/jobs-create-job-description-tab";
import { PersonaTab } from "../_components/tabs/jobs-create-persona-tab";
import { AssessmentTab } from "../_components/tabs/jobs-create-assessment-tab";
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
    setActiveTab,
    setIsDialogOpen,
    handleBack,
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
          <JobDescriptionTab initialData={job} formRef={formRef} />
        </TabsContent>

        <TabsContent value="persona" className="space-y-6">
          <PersonaTab personaData={null} />
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <AssessmentTab assessment={null} />
        </TabsContent>
      </Tabs>

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
