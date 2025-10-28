import { FormCard } from "@/components/design-system";
import { UserCheck } from "lucide-react";
import { JobPersonaSkeleton } from "./job-view-skeletons";

export function JobPersonaTab({ isLoading = false }) {
  if (isLoading) {
    return <JobPersonaSkeleton />;
  }
  return (
    <FormCard
      title="Employer Persona Questionnaire Results"
      icon={<UserCheck className="h-5 w-5 " />}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col bg-blue-50 rounded-lg border border-blue-200 p-4 gap-3">
          <div className="font-semibold">Ideal Candidate Profile</div>
          <div className="flex flex-row gap-1 text-sm">
            <div className="font-semibold ">Primary Behavioral Type:</div>
            <div>Primary Behavioral Type</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm ">Key Traits:</div>
            <div className="text-sm  font-extralight">Key Traits</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm">Work Style:</div>
            <div className="text-sm">Work Style</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm">Ideal Environment:</div>
            <div className="text-sm">Ideal Environment</div>
          </div>
        </div>

        <div className="flex flex-col bg-gray-50 rounded-lg p-4">
          <div>Behavioral Insights</div>
          <div>texto</div>
        </div>
      </div>
    </FormCard>
  );
}
