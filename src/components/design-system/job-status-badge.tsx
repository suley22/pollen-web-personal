import { useCallback } from "react";
import {
  DraftBadge,
  LiveBadge,
  PausedBadge,
  InfoBadge,
  ErrorBadge,
} from "./badge";
import { JOB_STATUS, JOB_STATUS_LABELS } from "@/lib/configs/constants/filters";

interface JobStatusBadgeProps {
  status?: string;
}

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  const getBadge = useCallback((status: string | undefined) => {
    if (!status) return null;

    switch (status) {
      case JOB_STATUS.DRAFT:
        return <DraftBadge>{JOB_STATUS_LABELS.draft}</DraftBadge>;
      case JOB_STATUS.LIVE:
        return <LiveBadge>{JOB_STATUS_LABELS.live}</LiveBadge>;
      case JOB_STATUS.PAUSED:
        return <PausedBadge>{JOB_STATUS_LABELS.paused}</PausedBadge>;
      case JOB_STATUS.COMPLETE:
        return <InfoBadge>{JOB_STATUS_LABELS.complete}</InfoBadge>;
      case JOB_STATUS.CANCELLED:
        return (
          <ErrorBadge>{JOB_STATUS_LABELS[JOB_STATUS.CANCELLED]}</ErrorBadge>
        );
      default:
        return null;
    }
  }, []);

  return getBadge(status);
}
