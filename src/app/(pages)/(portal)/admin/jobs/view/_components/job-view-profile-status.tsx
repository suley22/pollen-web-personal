"use client";

import { FormCard } from "@/components/design-system";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Calendar, User, Shield } from "lucide-react";
import { JobStatusBadge } from "@/components/design-system";

interface JobViewProfileStatusProps {
  status?: string;
  assignedTo?: string;
  createdDate?: string;
  lastUpdatedDate?: string;
  profileCompleteness?: number;
}

export function JobViewProfileStatus({
  status,
  assignedTo,
  createdDate,
  lastUpdatedDate,
  profileCompleteness = 0,
}: JobViewProfileStatusProps) {
  return (
    <FormCard title="Profile Status" icon={<Shield className="h-5 w-5" />}>
      <div className="space-y-2 pb-4">
        <Label className="text-sm font-medium text-muted-foreground">
          Status
        </Label>
        <div className="mt-1">
          <JobStatusBadge status={status} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Assigned To
          </Label>
          <div className="flex items-center space-x-1 mt-1">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{assignedTo || "Unassigned"}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Created By
          </Label>
          <div className="flex items-center space-x-1 mt-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{assignedTo || "Unassigned"}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Created Date
          </Label>
          <div className="flex items-center space-x-1 mt-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatDate(createdDate)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Last Updated
          </Label>
          <div className="flex items-center space-x-1 mt-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatDate(lastUpdatedDate)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Completeness
        </Label>
        <div className="mt-1">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Progress value={profileCompleteness || 0} />
            </div>
            <span className="text-sm font-medium">
              {Math.round(profileCompleteness || 0)}%
            </span>
          </div>
        </div>
      </div>
    </FormCard>
  );
}

function formatDate(date?: string) {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleDateString();
  } catch {
    return date;
  }
}
