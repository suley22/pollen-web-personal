"use client";

import { DynamicListInput } from "@/components/design-system";
import { FormCard } from "@/components/design-system/form-card";
import { Share2 } from "lucide-react";

export function SocialMedia({ employer = null }) {
  return (
    <FormCard title="Social Media" icon={<Share2 className="h-5 w-5" />}>
      <DynamicListInput
        name="social_medias"
        addButtonText="Add Social Media"
        fields={[
          {
            key: "platform",
            label: "Platform",
            placeholder: "e.g., LinkedIn, Twitter, Instagram...",
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
        initialItems={employer?.social_medias || []}
      />
    </FormCard>
  );
}
