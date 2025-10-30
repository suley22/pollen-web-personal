"use client";

import {
  FormCard,
  FormContainer,
  PageContainer,
  PageHeader,
  Input,
  Select,
  FormActions,
  ConfirmationDialog,
  PrimaryButton,
} from "@/components/design-system";
import {
  WORKING_HOURS_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
} from "@/lib/configs/constants/jobs-constants";
import { Briefcase, CheckCircle } from "lucide-react";
import { ExternalLink } from "../_components/jobs-create-social-media";
import { useJobsCreateExternalPage } from "../_hook/jobs-create-hook";

const CreateUpdateButton = ({ isEditMode, isLoading, onClick }) => (
  <PrimaryButton
    icon={<CheckCircle className="h-5 w-5" />}
    text={isEditMode ? "Update External Job" : "Create External Job"}
    loading={isLoading}
    disabled={isLoading}
    onClick={onClick}
  />
);

export function ExternalJobForm({ id = null }) {
  // ✅ Usa el hook para obtener toda la lógica
  const {
    externalJob,
    formRef,
    isLoading,
    isEditMode,
    isDialogOpen,
    setIsDialogOpen,
    handleBack,
    saveExternalJob,
  } = useJobsCreateExternalPage({ id });

  return (
    <PageContainer>
      <PageHeader
        title={
          isEditMode
            ? `Edit ${externalJob?.job_title || "External Job"}`
            : "Create External Job"
        }
        subtitle={
          isEditMode
            ? "Update the external job posting information"
            : "Fill in the details to add an external job posting"
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

      <form ref={formRef}>
        <FormCard icon={<Briefcase className="h-5 w-5" />} title="Job Overview">
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Job Title"
              type="text"
              name="job_title"
              id="job_title"
              placeholder="Enter job title"
              defaultValue={externalJob?.job_title || ""}
              required
            />
            <Input
              label="Company Name"
              type="text"
              name="company_name"
              id="company_name"
              placeholder="Enter company name"
              defaultValue={externalJob?.company_name || ""}
              required
            />
            <Select
              label="Industry"
              name="industries"
              id="industries"
              placeholder="Select industries"
              defaultValue={externalJob?.industries || "Technology"}
              options={["Technology", "Finance", "Healthcare", "Education"]}
            />
            <Input
              label="Location"
              id="location"
              name="location"
              defaultValue={externalJob?.location || ""}
              placeholder="Enter location..."
            />

            <Input
              label="Salary Range"
              id="salaryRange"
              name="salary_range"
              defaultValue={externalJob?.salary_range || ""}
              placeholder="e.g. £25,000 - £30,000"
            />

            <Select
              label="Working Hours"
              name="working_hours"
              id="working_hours"
              placeholder="Select working hours"
              defaultValue={externalJob?.working_hours || ""}
              options={WORKING_HOURS_OPTIONS}
            />

            <Select
              label="Employment Type"
              name="employment_type"
              defaultValue={externalJob?.employment_type || ""}
              placeholder="Select type"
              options={EMPLOYMENT_TYPE_OPTIONS}
            />

            <Input
              label="Application Deadline"
              id="applicationDeadline"
              name="application_deadline"
              type="date"
              defaultValue={externalJob?.application_deadline || ""}
            />
          </div>
        </FormCard>
        <ExternalLink />
      </form>

      <FormActions>
        <ConfirmationDialog
          trigger={
            <CreateUpdateButton
              isEditMode={isEditMode}
              isLoading={isLoading}
              onClick={() => setIsDialogOpen(true)}
            />
          }
          title={
            isEditMode
              ? "Confirm external job update?"
              : "Confirm external job creation?"
          }
          description={
            isEditMode
              ? "Are you sure you want to update this external job? This will modify the existing external job posting in the system."
              : "Are you sure you want to create this external job? This will add a new external job posting to the system."
          }
          confirmText="Confirm"
          cancelText="Cancel"
          onConfirm={saveExternalJob}
          isLoading={isLoading}
          loadingText={isEditMode ? "Updating..." : "Creating..."}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </FormActions>
    </PageContainer>
  );
}

export default ExternalJobForm;
