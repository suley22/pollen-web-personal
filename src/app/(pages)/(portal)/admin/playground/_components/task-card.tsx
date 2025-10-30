"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/buttons/button";
import {
  Calendar,
  User,
  FileText,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function JobSeekerCard({
  jobSeeker,
  columnId,
  onDragStart,
  onClick,
}) {
  // Datos reales desde el jobSeeker (job_application + job_seeker)
  const candidateName = jobSeeker.name;
  const candidateAvatar = jobSeeker.avatar_url;
  const matchScore = jobSeeker.match_score;
  const appliedDate = jobSeeker.applied_date;
  const subStatus = jobSeeker.sub_status;
  const isVerified = jobSeeker.is_verified;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, jobSeeker, columnId)}
      onClick={() => onClick(jobSeeker, columnId)}
      className="bg-white rounded-lg border border-border/40 hover:border-primary/20 hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <div className="flex flex-col gap-4 p-4 ">
        {/* Header: Avatar, Name, Score */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-border flex-shrink-0">
            <AvatarImage src={candidateAvatar} alt={candidateName} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {candidateName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1  flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-foreground truncate text-sm">
                {candidateName}
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span>↗</span>
              <span>{matchScore}%</span>
              <span>Score</span>
            </div>
          </div>
        </div>

        {/* Applied Date */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Applied {appliedDate}</span>
        </div>

        {/* Sub Status Badge */}
        <Badge
          variant="secondary"
          className="w-full justify-center  bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100"
        >
          {subStatus}
        </Badge>

        {/* Separator */}
        <Separator />

        {/* Action Buttons */}
        <div className="flex flex-row items-center justify-between gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-muted"
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
            className="h-4 w-4 p-0 hover:bg-muted"
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
            className="h-4 w-4 p-0 hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              // Handle messages action
            }}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
