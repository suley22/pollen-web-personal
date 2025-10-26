import { useCallback } from "react";
import { DraftBadge, LiveBadge, HiddenBadge } from "./badge";
import { EMPLOYER_STATUS, EMPLOYER_STATUS_LABELS } from "@/constants/filters";
import type { EmployerStatus } from "@/constants/filters";

interface EmployerStatusBadgeProps {
  status?: string;
}

export function EmployerStatusBadge({ status }: EmployerStatusBadgeProps) {
  const getBadge = useCallback((status: string | undefined) => {
    if (!status) return null;

    switch (status) {
      case EMPLOYER_STATUS.DRAFT:
        return <DraftBadge>{EMPLOYER_STATUS_LABELS.draft}</DraftBadge>;
      case EMPLOYER_STATUS.LIVE:
        return <LiveBadge>{EMPLOYER_STATUS_LABELS.live}</LiveBadge>;
      case EMPLOYER_STATUS.HIDDEN:
        return <HiddenBadge>{EMPLOYER_STATUS_LABELS.hidden}</HiddenBadge>;
      default:
        return null;
    }
  }, []);

  return getBadge(status);
}
