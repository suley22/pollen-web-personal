import { Award, FileText, Lightbulb, Target, Users } from "lucide-react";
import { JobOverviewCard, ListCard } from "./job-view-cards";
import { DescriptionCard } from "@/components/design-system";

export function JobDescriptionTab({ job }) {
  if (!job) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* // Job Overview */}
      <JobOverviewCard job={job} />

      {/* //About this Role */}
      <DescriptionCard
        title="About this Role"
        icon={<FileText className="h-5 w-5 text-gray-500" />}
        value={job.about_this_role || "No description provided."}
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
  );
}
