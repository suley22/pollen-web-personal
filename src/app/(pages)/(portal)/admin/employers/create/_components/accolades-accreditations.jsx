"use client";

import { DynamicListInput, FormCard } from "@/components/design-system";
import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AccoladesAccreditations({ employer = null }) {
  // Convert string array to object array for DynamicListInput
  const initialItems = (employer?.company_accolades || []).map((accolade) => ({
    name: typeof accolade === "string" ? accolade : accolade.name,
  }));

  return (
    <FormCard>
      <DynamicListInput
        title="Accolades & Accreditations"
        icon={<Award className="h-5 w-5" />}
        name="company_accolades"
        addButtonText="Add Accolade"
        fields={[
          {
            key: "name",
            label: "Accolade or Accreditation",
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
