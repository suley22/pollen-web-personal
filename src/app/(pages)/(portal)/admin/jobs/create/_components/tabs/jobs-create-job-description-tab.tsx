import {
  Target,
  FileText,
  Lightbulb,
  Briefcase,
  FileCheck,
} from "lucide-react";
import {
  FormCard,
  FormContainer,
  Input,
  TextAreaCard,
  Select,
} from "@/components/design-system";
import { CompanySearchSelect } from "../jobs-create-company-select";
import { AdminSearchSelect } from "../jobs-create-admin-select";
import {
  WORK_ARRANGEMENT_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  WORK_AUTHORIZATION_OPTIONS,
  WORKING_HOURS_OPTIONS,
} from "@/lib/configs/constants/jobs-constants";
import { Responsibilities } from "./_components/jobs-create-responsabilities";
import { WhoWouldLove } from "./_components/jobs-create-who_would_love";
import { Requirement } from "./_components/jobs-create-requirement";

export function JobDescriptionTab({ initialData: editedJob, formRef }) {
  return (
    <FormContainer ref={formRef}>
      <FormCard icon={<Briefcase className="h-5 w-5" />} title="Job Overview">
        <div className="flex flex-row mb-6 gap-6">
          <Input
            label="Job Title"
            type="text"
            name="job_title"
            id="job_title"
            placeholder="Enter job title"
            defaultValue={editedJob?.job_title || ""}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <CompanySearchSelect
            initialCompanyId={editedJob?.company_id}
            initialCompanyName={editedJob?.company_name}
            onValueChange={() => {}}
          />

          <AdminSearchSelect
            initialUserId={editedJob?.user_id}
            initialAdminName={editedJob?.admin_name}
            onValueChange={() => {}}
          />

          <Input
            label="Location"
            id="location"
            name="location"
            defaultValue={editedJob?.location || ""}
            placeholder="Enter location..."
          />
          <Select
            label="Working Hours"
            name="working_hours"
            id="working_hours"
            placeholder="Select working hours"
            defaultValue={editedJob?.working_hours || ""}
            options={WORKING_HOURS_OPTIONS}
          />

          <Input
            label="Salary Range"
            id="salaryRange"
            name="salary_range"
            defaultValue={editedJob?.salary_range || ""}
            placeholder="e.g. £25,000 - £30,000"
          />

          <Select
            label="Work Arrangement"
            name="work_arrangement"
            defaultValue={editedJob?.work_arrangement || ""}
            placeholder="Select arrangement"
            options={WORK_ARRANGEMENT_OPTIONS}
          />
        </div>
      </FormCard>

      <FormCard
        title="Employment Details"
        icon={<FileCheck className="h-5 w-5" />}
      >
        <div className="grid grid-cols-2 gap-6">
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
            defaultValue={editedJob?.start_date || ""}
            placeholder="e.g. ASAP, January 2025"
          />

          <Input
            label="Application Deadline"
            id="applicationDeadline"
            name="application_deadline"
            type="date"
            defaultValue={editedJob?.application_deadline || ""}
          />

          <Select
            label="Work Authorisation"
            name="work_authorization"
            defaultValue={editedJob?.work_authorisation?.trim() || ""}
            placeholder="Select work authorisation requirement"
            options={WORK_AUTHORIZATION_OPTIONS}
          />

          <div className="col-span-2">
            <Input
              label="Employment Type Details"
              id="employmentTypeDetails"
              name="employment_type_details"
              defaultValue={editedJob?.employment_type_details || ""}
              placeholder="e.g. Standard employment contract"
            />
          </div>
        </div>
      </FormCard>

      <TextAreaCard
        title="About This Role"
        icon={<FileText className="h-5 w-5" />}
        name="description"
        placeholder="Enter job description..."
        defaultValue={editedJob?.description || ""}
      />

      <Responsibilities editedJob={editedJob} />
      <WhoWouldLove editedJob={editedJob} />

      <TextAreaCard
        title="Success In This Role Looks Like"
        icon={<Target className="h-5 w-5" />}
        name="success_looks"
        placeholder="Describe what success looks like in this role..."
        defaultValue={editedJob?.success_looks || ""}
      />

      <Requirement editedJob={editedJob} />

      <TextAreaCard
        title="Internal Notes"
        icon={<Lightbulb className="h-5 w-5" />}
        name="internal_notes"
        placeholder="Add internal notes about this role..."
        defaultValue={editedJob?.internal_notes || ""}
      />
    </FormContainer>
  );
}
