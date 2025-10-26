import { Badge } from "@/components/ui/badge";

export type JobStatus = "draft" | "live" | "paused" | "complete" | "cancelled";

interface JobStatusBadgeProps {
  status: JobStatus;
  className?: string;
}

export function JobStatusBadge({
  status,
  className = "",
}: JobStatusBadgeProps) {
  switch (status) {
    case "live":
      return (
        <Badge
          className={`bg-green-100 text-green-800 status-badge-compact ${className}`}
        >
          Live
        </Badge>
      );
    case "paused":
      return (
        <Badge
          className={`bg-orange-100 text-orange-800 status-badge-compact ${className}`}
        >
          Paused
        </Badge>
      );
    case "cancelled":
      return (
        <Badge
          className={`bg-red-100 text-red-800 status-badge-medium ${className}`}
        >
          Cancelled
        </Badge>
      );
    case "complete":
      return (
        <Badge
          className={`bg-blue-100 text-blue-800 status-badge-medium ${className}`}
        >
          Complete
        </Badge>
      );
    case "draft":
      return (
        <Badge className={`bg-yellow-100 text-yellow-800 ${className}`}>
          Draft
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className={`status-badge-compact ${className}`}
        >
          {status}
        </Badge>
      );
  }
}
