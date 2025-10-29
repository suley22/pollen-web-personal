"use client";

import { FormCard } from "@/components/design-system/form-card";
import { InfoField } from "@/components/design-system/info-field";
import { FileText } from "lucide-react";

interface AssessmentInformationProps {
  internalPollenTitle?: string;
  title: string;
  subtitle?: string;
  estimatedDuration?: string;
  questionsCount?: number;
  totalSubmissions?: number;
}

export function AssessmentInformation({
  internalPollenTitle,
  title,
  subtitle,
  estimatedDuration,
  questionsCount,
  totalSubmissions,
}: AssessmentInformationProps) {
  return (
    <FormCard
      title="Assessment Information"
      icon={<FileText className="h-5 w-5" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {internalPollenTitle && (
          <InfoField
            label="Internal Pollen Title"
            value={internalPollenTitle}
          />
        )}
        <InfoField label="Title" value={title} />
        {subtitle && <InfoField label="Subtitle" value={subtitle} />}
        {estimatedDuration && (
          <InfoField
            label="Estimated Duration"
            value={`${estimatedDuration} minutes`}
          />
        )}
        <InfoField
          label="Questions"
          value={questionsCount?.toString() || "0"}
        />
        <InfoField
          label="Total Submissions"
          value={totalSubmissions?.toString() || "0"}
        />
      </div>
    </FormCard>
  );
}
