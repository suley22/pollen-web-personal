"use client";

import { DynamicListInput, FormCard } from "@/components/design-system";
import { Award } from "lucide-react";

export function AccoladesAccreditations({ employer = null }) {
  // Convert string array to object array for DynamicListInput
  const initialItems = (employer?.company_accolades || []).map((accolade) => ({
    name: typeof accolade === "string" ? accolade : accolade.name,
  }));

  return (
    <FormCard
      title="Accolades & Accreditations"
      icon={<Award className="h-5 w-5" />}
    >
      <DynamicListInput
        title="Accolades & Accreditations"
        icon={<Award className="h-5 w-5" />}
        name="company_accolades"
        addButtonText="Add Accolade"
        fields={[
          {
            key: "name",
            label: "Insert as many as needed",
            placeholder: "e.g., ISO 9001, Best Workplace Award...",
            type: "text",
            required: true,
          },
        ]}
        initialItems={initialItems}
      />
    </FormCard>
  );
}
