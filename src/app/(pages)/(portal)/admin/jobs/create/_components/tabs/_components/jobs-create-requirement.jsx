import { CheckCircle, Award } from "lucide-react";
import { FormCard, DynamicListInput } from "@/components/design-system";

export function Requirement({ editedJob }) {
  return (
    <FormCard
      title="Pollen Approved Requirements"
      icon={<CheckCircle className="h-5 w-5 " />}
    >
      <DynamicListInput
        title="Pollen Approved Requirements"
        icon={<Award className="h-5 w-5" />}
        name="pollen_approved_requirements"
        addButtonText="Add Requirement"
        fields={[
          {
            key: "value",
            placeholder: "Enter requirement...",
            type: "text",
          },
        ]}
        initialItems={editedJob?.pollen_approved_requirements?.map((p, i) => ({
          id: `req-${i}`,
          value: p,
        }))}
      />
    </FormCard>
  );
}
