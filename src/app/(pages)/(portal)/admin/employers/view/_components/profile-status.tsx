"use client";

import { FormCard } from "@/components/design-system";
import {
  LiveBadge,
  DraftBadge,
  HiddenBadge,
} from "@/components/design-system/badge";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar, CheckCircle, Clock, EyeOff } from "lucide-react";

interface ProfileStatusProps {
  status?: string;
  createdDate?: string;
  lastUpdated?: string;
  profileCompleteness?: number;
}

export function ProfileStatus({
  status,
  createdDate,
  lastUpdated,
  profileCompleteness = 85,
}: ProfileStatusProps) {
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "live":
        return (
          <LiveBadge>
            <CheckCircle className="h-3 w-3 mr-1" />
            Live
          </LiveBadge>
        );
      case "draft":
        return (
          <DraftBadge>
            <Clock className="h-3 w-3 mr-1" />
            Draft
          </DraftBadge>
        );
      case "hidden":
        return (
          <HiddenBadge>
            <EyeOff className="h-3 w-3 mr-1" />
            Hidden
          </HiddenBadge>
        );
      default:
        return <Badge variant="secondary">{status || "Draft"}</Badge>;
    }
  };

  return (
    <FormCard title="Profile Status" icon={<Shield className="h-5 w-5" />}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status
          </Label>
          <div className="mt-1">{getStatusBadge(status)}</div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Created Date
          </Label>
          <div className="flex items-center space-x-1 mt-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{createdDate || "Not specified"}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Last Updated
          </Label>
          <div className="flex items-center space-x-1 mt-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{lastUpdated || "Not specified"}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Completeness
          </Label>
          <div className="mt-1">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${profileCompleteness}%`,
                  }}
                />
              </div>
              <span className="text-sm font-medium">
                {profileCompleteness}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </FormCard>
  );
}
