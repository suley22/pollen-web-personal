"use client";

import { DynamicListInput } from "@/components/design-system";
import { FormCard } from "@/components/design-system/form-card";
import { Share2 } from "lucide-react";

export function ExternalLink() {
  return (
    <FormCard
      title="External Application Links"
      icon={<Share2 className="h-5 w-5" />}
    >
      <DynamicListInput
        title="External Application Links"
        icon={<Share2 className="h-5 w-5" />}
        name="external_links"
        addButtonText="Add External Link"
        fields={[
          {
            key: "platform",
            label: "Platform",
            placeholder: "e.g. LinkedIn...",
            type: "text",
            required: true,
          },
          {
            key: "url",
            label: "URL",
            placeholder: "https://...",
            type: "url",
            required: true,
          },
        ]}
        initialItems={[]}
      />
    </FormCard>
  );
}
