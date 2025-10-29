"use client";

import { FormCard } from "@/components/design-system/form-card";
import { InfoField } from "@/components/design-system/info-field";
import {
  LiveBadge,
  DraftBadge,
  PausedBadge,
  NeutralBadge,
} from "@/components/design-system/badge";
import { Info } from "lucide-react";
import { AssessmentStatusEnum } from "@/types/assessment-types";

interface AssessmentMetadataProps {
  status: string;
  createdBy?: string;
  createdDate?: string;
  lastUpdatedBy?: string;
  lastUpdatedDate?: string;
}

const getStatusBadge = (status: string) => {
  const statusText = status?.toUpperCase() || "N/A";

  switch (status?.toLowerCase()) {
    case AssessmentStatusEnum.Live:
      return <LiveBadge>{statusText}</LiveBadge>;
    case AssessmentStatusEnum.Draft:
      return <DraftBadge>{statusText}</DraftBadge>;
    case AssessmentStatusEnum.Paused:
      return <PausedBadge>{statusText}</PausedBadge>;
    case AssessmentStatusEnum.Archived:
      return <NeutralBadge>{statusText}</NeutralBadge>;
    default:
      return <NeutralBadge>{statusText}</NeutralBadge>;
  }
};

export function AssessmentMetadata({
  status,
  createdBy,
  createdDate,
  lastUpdatedBy,
  lastUpdatedDate,
}: AssessmentMetadataProps) {
  return (
    <FormCard title="Metadata" icon={<Info className="h-5 w-5" />}>
      <div className="space-y-6">
        <InfoField label="Status" value={getStatusBadge(status)} />
        <InfoField label="Created By" value={createdBy || "N/A"} />
        <InfoField label="Created Date" value={createdDate || "N/A"} />
        <InfoField label="Last Updated By" value={lastUpdatedBy || "N/A"} />
        <InfoField label="Last Updated" value={lastUpdatedDate || "N/A"} />
      </div>
    </FormCard>
  );
}
