import {
  Building,
  CalendarClock,
  Target,
  Clock,
  MapPin,
  PoundSterling,
} from "lucide-react";

import { InfoCard, InfoListCard } from "./info-card";
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
    <div className="bg-white rounded-lg border border-gray-200 p-6 gap-6 flex flex-col">
      <div className="flex flex-row gap-6">
        <div>Company logo</div>
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

      <InfoCard title="About This Role">
        {job?.description ? job.description : "Not specified"}
      </InfoCard>

      <InfoListCard
        title="Responsibilities"
        items={job?.responsibilities}
        icon={<Target className="w-6 h-6" />}
      />
    </div>
  );
}
