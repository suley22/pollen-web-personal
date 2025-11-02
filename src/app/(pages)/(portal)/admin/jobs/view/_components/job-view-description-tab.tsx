import { Award, FileText, Lightbulb, Target, Users } from "lucide-react";
import {
  JobEmploymentTypeCard,
  JobOverviewCard,
  ListCard,
} from "./job-view-cards";
import { DescriptionCard } from "@/components/design-system";
import { JobViewProfileStatus } from "./job-view-profile-status";
import { JobDescriptionSkeleton } from "./job-view-skeletons";

export function JobDescriptionTab({ job }) {
  if (!job) {
    return <JobDescriptionSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <JobOverviewCard job={job} />

        {/* //About this Role */}
        <DescriptionCard
          title="About this Role"
          icon={<FileText className="h-5 w-5 text-gray-500" />}
          value={job.description || "No description provided."}
        />

        <ListCard
          title="Key Responsibilities"
          items={job.responsibilities}
          icon={<FileText className="h-5 w-5 text-gray-500" />}
        />

        <ListCard
          title="Who Would Love This Job"
          items={job.who_would_love}
          icon={<Users className="h-5 w-5 text-gray-500" />}
        />

        <DescriptionCard
          title="Success In This Role Looks Like"
          icon={<Target className="h-5 w-5 text-gray-500" />}
          value={job.success_looks || "No description provided."}
        />

        <ListCard
          title="Pollen Approved Requirements"
          icon={<Award className="h-5 w-5 text-gray-500" />}
          items={job.pollen_approved_requirements}
        />

        <DescriptionCard
          title="Internal Notes"
          icon={<Lightbulb className="h-5 w-5 text-gray-500" />}
          value={job.internal_notes || "No internal notes provided."}
        />
      </div>

      <div className="space-y-6">
        {/* Profile Status + Completeness */}
        <JobViewProfileStatus
          status={job.status}
          assignedTo={job.admin}
          createdDate={job.created_at}
          lastUpdatedDate={job.updated_at}
          profileCompleteness={job.profile_completeness}
        />
        <JobEmploymentTypeCard job={job} />
      </div>
    </div>
  );
}
