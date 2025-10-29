"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/buttons/button";
import { User, FileText, MessageSquare, CheckCircle } from "lucide-react";

export default function GridRow({ task, onClick }) {
  // Datos reales desde el task (job_application + job_seeker)
  const candidateName = task.name;
  const candidateAvatar = task.avatar_url;
  const matchScore = task.match_score;
  const appliedDate = task.applied_date;
  const subStatus = task.sub_status;
  const isVerified = task.is_verified;

  return (
    <div
      onClick={() => onClick(task, task.status)}
      className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer items-center"
    >
      {/* Candidate (Avatar + Name) */}
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 border-2 border-border flex-shrink-0">
          <AvatarImage src={candidateAvatar} alt={candidateName} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
            {candidateName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex items-center gap-1.5">{candidateName}</div>
      </div>

      {/* Match Score */}
      <div className="flex items-center gap-1 text-sm font-semibold">
        <span>↗</span>
        <span>{matchScore}%</span>
      </div>

      {/* Applied Date */}
      <div className="text-sm text-muted-foreground">{appliedDate}</div>

      {/* SubStatus */}
      <div>
        <Badge
          variant="secondary"
          className="bg-yellow-50 text-yellow-800 border-yellow-200 text-xs"
        >
          {subStatus}
        </Badge>
      </div>

      {/* Status Badge */}
      <div>
        <span
          className={`${task.statusColor} text-white text-xs px-2 py-1 rounded-full`}
        >
          {task.statusLabel}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-muted"
          onClick={(e) => {
            e.stopPropagation();
            // Handle profile action
          }}
        >
          <User className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-muted"
          onClick={(e) => {
            e.stopPropagation();
            // Handle documents action
          }}
        >
          <FileText className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-muted"
          onClick={(e) => {
            e.stopPropagation();
            // Handle messages action
          }}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
