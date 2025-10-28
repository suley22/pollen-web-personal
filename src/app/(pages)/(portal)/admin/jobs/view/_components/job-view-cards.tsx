import {
  Briefcase,
  Building,
  Clock,
  CheckCircle,
  MapPin,
  PoundSterling,
  Building2,
} from "lucide-react";
import { FormCard } from "@/components/design-system";

export function JobOverviewCard({ job }) {
  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Job Overview" icon={<Briefcase className="h-5 w-5 " />}>
        <div className="flex flex-col gap-4">
          <div>{job.job_title}</div>
          <div className="flex flex-row font-light text-sm gap-1 items-center ">
            <Building className="w-4 h-4" />
            {job?.company_name}
          </div>
          <div className="flex flex-row ">
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-1  text-sm font-light">
                <MapPin className="w-4 h-4" />
                {job?.location ? job.location : "Not specified"}
              </div>
              <div className="flex items-center gap-1 text-sm font-light">
                <PoundSterling className="w-4 h-4" />
                {job?.salary_range ? job.salary_range : "Not specified"}
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-1 text-sm font-light">
                <Clock className="w-4 h-4" />
                {job.job_type}
              </div>
              <div className="flex items-center gap-1 text-sm font-light">
                <Building2 className="w-4 h-4" />
                {job.work_arrangement}
              </div>
            </div>
          </div>
        </div>
      </FormCard>
      <FormCard
        title="Employment Details"
        icon={<Briefcase className="h-5 w-5 " />}
      >
        <div className="flex flex-row">
          <div className="w-full flex flex-col gap-4">
            <div>Type: {job.employment_type}</div>
            <div>Application Deadline: {job.application_deadline}</div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div>Start Date: {job.start_date}</div>
            <div>Authorisation: {job.work_authorisation}</div>
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
