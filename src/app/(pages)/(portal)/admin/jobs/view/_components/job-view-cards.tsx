import { Briefcase, CheckCircle } from "lucide-react";
import { FormCard } from "@/components/design-system";

export function JobOverviewCard({ job }) {
  return (
    <FormCard
      title="Job Overview"
      icon={<Briefcase className="h-5 w-5 text-gray-500" />}
    >
      <div className="flex flex-col gap-4">
        <div>{job.job_title}</div>
        <div>{job.company_name}</div>
        <div className="flex flex-row ">
          <div className="w-full flex flex-col gap-4">
            <div>Location</div>
            <div>Salary</div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div>Time</div>
            <div>Type</div>
          </div>
        </div>
        <div className="flex flex-col bg-gray-50 rounded-md p-4 gap-4">
          <div>Employment Detail</div>
          <div className="flex flex-row">
            <div className="w-full flex flex-col gap-4">
              <div>Responsibilities</div>
              <div>Qualifications</div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div>Benefits</div>
              <div>About Company</div>
            </div>
          </div>
        </div>
      </div>
    </FormCard>
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
