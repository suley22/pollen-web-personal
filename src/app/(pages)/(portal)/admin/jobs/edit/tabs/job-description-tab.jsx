// Importar todo lo común desde shared.js
import {
  Target,
  FileText,
  Lightbulb,
  Award,
  CheckCircle,
  Users,
  Briefcase,
  FormCard,
  FormContainer,
  Input,
  TextAreaCard,
  DynamicListInput,
  Select,
  CompanySearchSelect,
  WORK_ARRANGEMENT_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  WORK_AUTHORIZATION_OPTIONS,
  WORKING_HOURS_OPTIONS,
} from "../shared";
import { Responsibilities } from "./_components/responsabilities";
import { WhoWouldLove } from "./_components/who_would_love";
import { Requirement } from "./_components/requirement";

export function JobDescriptionTab({
  editedJob,
  formRef,
  updateJobAction,
  updateEditedJob,
}) {
  return (
    <FormContainer ref={formRef} action={updateJobAction}>
      <FormCard
        icon={<Briefcase className="h-5 w-5 text-gray-500" />}
        title="Job Overview"
      >
        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {/* TODO: checkear */}
            <CompanySearchSelect
              name="company_name"
              value={editedJob?.company_name || ""}
              onValueChange={(value) => updateEditedJob("company_name", value)}
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
            <div className="font-medium text-gray-900">Employment Details</div>
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
                onChange={(e) => updateEditedJob("start_date", e.target.value)}
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
        defaultValuealue={editedJob?.description || ""}
      />

      <Responsibilities
        editedJob={editedJob}
        updateEditedJob={updateEditedJob}
      />
      <WhoWouldLove editedJob={editedJob} updateEditedJob={updateEditedJob} />

      <TextAreaCard
        title="Success In This Role Looks Like"
        icon={<Target className="h-5 w-5" />}
        name="success_looks"
        placeholder="Describe what success looks like in this role..."
        value={editedJob?.success_looks || ""}
        onChange={(e) => updateEditedJob("success_looks", e.target.value)}
      />

      <Requirement editedJob={editedJob} updateEditedJob={updateEditedJob} />

      <TextAreaCard
        title="Internal Notes"
        icon={<Lightbulb className="h-5 w-5" />}
        name="internal_notes"
        placeholder="Add internal notes about this role..."
        value={editedJob?.internal_notes || ""}
      />
    </FormContainer>
  );
}
