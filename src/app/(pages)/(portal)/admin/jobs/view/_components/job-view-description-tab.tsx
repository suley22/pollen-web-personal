import { FormCard } from "@/components/design-system";
import { Briefcase } from "lucide-react";

export function JobDescriptionTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* // Job Overview */}
      <FormCard
        title="Job Overview"
        icon={<Briefcase className="h-5 w-5 text-gray-500" />}
      >
        <div className="flex flex-col gap-4">
          <div>Job Title</div>
          <div>Company</div>
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

      {/* //About this Role */}
      <FormCard
        title="About this Role"
        icon={<Briefcase className="h-5 w-5 text-gray-500" />}
      >
        About this Role
      </FormCard>

      {/* Key Responsibilities */}
    </div>
  );
}
