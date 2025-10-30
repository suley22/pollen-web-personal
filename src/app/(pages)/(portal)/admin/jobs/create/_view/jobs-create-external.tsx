import {
  FormCard,
  PageContainer,
  PageHeader,
  Input,
  Select,
} from "@/components/design-system";
import {
  WORKING_HOURS_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
} from "@/lib/configs/constants/jobs-constants";
import { Briefcase } from "lucide-react";
import { ExternalLink } from "../_components/jobs-create-social-media";
import { PrimaryButton } from "@/components/design-system/primary-button";
import { CheckCircle } from "lucide-react";
import { useExternalJobsCreatePage } from "../_hook/jobs-create-hook";

const CreateButton = ({ isLoading, onClick }) => (
  <PrimaryButton
    icon={<CheckCircle className="h-5 w-5" />}
    text={"Create Job"}
    loading={isLoading}
    disabled={isLoading}
    onClick={onClick}
  />
);

export default function JobsCreateExternalView(id = null) {
  const {
    externalJob,
    formRef,
    isLoading,
    activeTab,
    isDialogOpen,
    setActiveTab,
    setIsDialogOpen,
    handleBack,
    saveJob,
  } = useExternalJobsCreatePage({ id });

  return (
    <PageContainer>
      <PageHeader
        title="Create External Job"
        showBackButton={true}
        onBack={handleBack}
      >
        <CreateButton
          isLoading={isLoading}
          onClick={() => setIsDialogOpen(true)}
        />
      </PageHeader>
      <FormCard icon={<Briefcase className="h-5 w-5" />} title="Job Overview">
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Job Title"
            type="text"
            name="job_title"
            id="job_title"
            placeholder="Enter job title"
            defaultValue={""}
          />
          <Input
            label="Company Name"
            type="text"
            name="company_name"
            id="company_name"
            placeholder="Enter company name"
            defaultValue={""}
          />
          <Select
            label="Industry"
            name="industries"
            id="industries"
            placeholder="Select industries"
            defaultValue={"Technology"}
            disabled={true}
            options={["Technology", "Finance", "Healthcare", "Education"]}
          />
          <Input
            label="Location"
            id="location"
            name="location"
            defaultValue={""}
            placeholder="Enter location..."
          />

          <Input
            label="Salary Range"
            id="salaryRange"
            name="salary_range"
            defaultValue={""}
            placeholder="e.g. £25,000 - £30,000"
          />

          <Select
            label="Working Hours"
            name="working_hours"
            id="working_hours"
            placeholder="Select working hours"
            defaultValue={""}
            options={WORKING_HOURS_OPTIONS}
          />

          <Select
            label="Employment Type"
            name="employment_type"
            defaultValue={""}
            placeholder="Select type"
            options={EMPLOYMENT_TYPE_OPTIONS}
          />

          <Input
            label="Application Deadline"
            id="applicationDeadline"
            name="application_deadline"
            type="date"
            defaultValue={""}
          />
        </div>
      </FormCard>
      <ExternalLink />
    </PageContainer>
  );
}
