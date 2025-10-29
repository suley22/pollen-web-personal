import {
  Briefcase,
  Building,
  Clock,
  CheckCircle,
  MapPin,
  PoundSterling,
  Building2,
  Info,
} from "lucide-react";
import { FormCard, InfoField } from "@/components/design-system";

export function JobOverviewCard({ job }) {
  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Job Overview" icon={<Briefcase className="h-5 w-5" />}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <InfoField
            label="Company"
            value={job?.company_name}
            icon={<Building className="h-4 w-4 text-muted-foreground" />}
          />

          {/* TODO: admin assigned */}
          <InfoField
            label="Asiggned to"
            value={job?.company_name}
            icon={<Building className="h-4 w-4 text-muted-foreground" />}
          />
          <InfoField
            label="Location"
            value={job?.location}
            icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
          />
          <InfoField
            label="Working Hours"
            value={job.working_hours}
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          />

          <InfoField
            label="Salary Range"
            value={job?.salary_range ? job.salary_range : "Not specified"}
            icon={<PoundSterling className="h-4 w-4 text-muted-foreground" />}
          />
          <InfoField
            label="Work Arrangement"
            value={job.work_arrangement}
            icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </FormCard>
      <FormCard title="Employment Details" icon={<Info className="h-5 w-5" />}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <InfoField label="Employment Type" value={job.employment_type} />
          <InfoField label="Start Date" value={job.start_date} />
          <InfoField
            label="Application Deadline"
            value={job.application_deadline}
          />
          <InfoField
            label="Work Authorisation"
            value={job.work_authorisation}
          />
          <div className="col-span-2">
            <InfoField
              label="Employment Type Details"
              value={job.employment_type_details || "Not specified"}
            />
          </div>
        </div>
      </FormCard>
    </div>
  );
}

export function DescriptionCard({ title, icon = null, children }) {
  return (
    <FormCard title={title} icon={icon}>
      {children}
    </FormCard>
  );
}

export function ListCard({ title, items, icon = null }) {
  return (
    <FormCard title={title} icon={icon}>
      <div className="space-y-3">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex flex-row items-center gap-2">
              <CheckCircle className="h-4 w-4 shrink-0 text-green-600" />
              <p className="text-sm leading-6 text-gray-700">{item}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No items listed</p>
        )}
      </div>
    </FormCard>
  );
}
