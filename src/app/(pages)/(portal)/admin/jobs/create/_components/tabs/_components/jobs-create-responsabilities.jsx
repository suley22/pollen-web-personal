import { FormCard, DynamicListInput } from "@/components/design-system";
import { Target } from "lucide-react";

export function Responsibilities({ editedJob, updateEditedJob }) {
    return (
      <FormCard
        title="Key Responsibilities"
        icon={<Target className="h-5 w-5" />}
      >
        <DynamicListInput
          title="Key Responsibilities"
          icon={<Target className="h-5 w-5" />}
          name="responsibilities"
          addButtonText="Add Responsibility"
          fields={[
            {
              key: "value",
              placeholder: "Enter responsibility...",
              type: "text",
            },
          ]}
          initialItems={editedJob.responsibilities.map((r, i) => ({
            id: `resp-${i}`,
            value: r,
          }))}
        />
      </FormCard>
    );
}