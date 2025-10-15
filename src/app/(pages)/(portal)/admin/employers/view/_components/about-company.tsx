"use client";

import { DescriptionCard } from "@/components/design-system/description-card";
import { FileText } from "lucide-react";

interface AboutCompanyProps {
  about?: string;
}

/**
 * @deprecated Use DescriptionCard directly instead
 */
export function AboutCompany({ about }: AboutCompanyProps) {
  return (
    <DescriptionCard
      title="About the Company"
      icon={<FileText className="h-5 w-5" />}
      value={about}
    />
  );
}
