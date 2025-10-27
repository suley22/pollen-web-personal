import { FormCard } from "@/components/design-system";
import { UserCheck } from "lucide-react";

export function JobPersonaTab() {
  return (
    <FormCard
      title="Employer Persona Questionnaire Results"
      icon={<UserCheck className="h-5 w-5 " />}
    >
      <div className="flex flex-col bg-blue-50 rounded border  border-blue-200">
        Ideal Candidate Profile
      </div>
    </FormCard>
  );
}
