import {
  Building,
  CalendarClock,
  Target,
  Clock,
  MapPin,
  PoundSterling,
  Users,
  Shield,
  FileText,
} from "lucide-react";
import { DescriptionCard } from "@/components/design-system";
import { InfoListCard } from "./info-card";
import { FormCard } from "@/components/design-system/form-card";
import { CompanyAvatar } from "@/components/ui/company-avatar";
export default function JobDetails({ job }) {
  // Si job no existe, muestra un loading o mensaje
  if (!job) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-500">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Job Details" icon={<Building className="h-5 w-5" />}>
        <div className="flex flex-row gap-6 items-center">
          <CompanyAvatar
            logoUrl={job?.company_logo}
            companyName={job?.company_name}
            size="md"
          />
          <div className="flex flex-col gap-2">
            <div className="text-lg font-semibold">{job?.job_title}</div>
            <div className="flex flex-row gap-6">
              <div className="flex flex-row font-light text-sm gap-1 items-center text-gray-500 ">
                <Building className="w-4 h-4" />
                {job?.company_name}
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm font-light">
                <MapPin className="w-4 h-4" />
                {job?.location ? job.location : "Not specified"}
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm font-light">
                <Clock className="w-4 h-4" />
                {job?.job_type ? job.job_type : "Not specified"}
              </div>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm font-light">
              <PoundSterling className="w-4 h-4" />
              {job?.salary_range ? job.salary_range : "Not specified"}
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm font-light">
              <CalendarClock className="w-4 h-4" />
              {"Applications close: "}
              {job?.application_deadline
                ? job.application_deadline
                : "Not specified"}
            </div>
          </div>
        </div>
      </FormCard>

      <DescriptionCard
        title="About this Role"
        icon={<FileText className="h-5 w-5 text-gray-500" />}
        value={job.description || "No description provided."}
      />

      <InfoListCard
        title="Responsibilities"
        items={job?.responsibilities}
        icon={<Target className="w-6 h-6" />}
      />

      <InfoListCard
        title="Who Would Love This Job"
        items={job?.who_would_love}
        icon={<Users className="w-6 h-6" />}
      />

      <DescriptionCard
        title="Success In This Role Looks Like"
        icon={<Target className="h-5 w-5 text-gray-500" />}
        value={job.success_looks || "No description provided."}
      />

      <InfoListCard
        title="Pollen Approved Requirements"
        items={job?.pollen_approved_requirements}
        icon={<Shield className="w-6 h-6" />}
      />
    </div>
  );
}
