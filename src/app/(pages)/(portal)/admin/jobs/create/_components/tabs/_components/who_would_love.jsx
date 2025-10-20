import { Users } from "lucide-react";
import { FormCard, DynamicListInput } from "@/components/design-system";

export function WhoWouldLove({ editedJob, updateEditedJob }) {
  return (
    <FormCard
      title="Who Would Love This Role"
      icon={<Users className="h-5 w-5" />}
    >
      <DynamicListInput
        title="Who Would Love This Job"
        icon={<Users className="h-5 w-5" />}
        name="who_would_love"
        addButtonText="Add Trait"
        fields={[
          {
            key: "value",
            placeholder: "Enter ideal candidate trait...",
            type: "text",
          },
        ]}
        initialItems={editedJob.who_would_love.map((trait, i) => ({
          id: `trait-${i}`,
          value: trait,
        }))}
      />
    </FormCard>
  );
}
