"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/buttons/button";
import { Calendar, User, ClipboardCheck } from "lucide-react";

// Map de colores para diferentes sub_status
const SUB_STATUS_STYLES = {
  "Review Not Started": "bg-blue-50 text-blue-700 border-blue-200",
  "Pollen Interview Complete": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Invited to Pollen Interview":
    "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Interview Requested": "bg-green-50 text-green-700 border-green-200",
  "Offer Issued": "bg-green-50 text-green-700 border-green-200",
  "Interview Complete": "bg-green-50 text-green-700 border-green-200",
  "Interview Booked": "bg-green-50 text-green-700 border-green-200",
  Hired: "bg-gray-900 text-white border-gray-900",
  "Not Progressing": "bg-gray-100 text-gray-700 border-gray-300",
};

export default function JobSeekerCard({
  jobSeeker,
  columnId,
  onDragStart,
  onDragEnd,
  onClick,
}) {
  // Datos reales desde el jobSeeker (job_application + job_seeker)
  const candidateName = jobSeeker.name;
  const candidateAvatar = jobSeeker.avatar_url;
  const matchScore = jobSeeker.match_score;
  const appliedDate = jobSeeker.applied_date;
  const subStatus = jobSeeker.sub_status;

  // Obtener estilo del sub_status
  const subStatusStyle =
    SUB_STATUS_STYLES[subStatus] || "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, jobSeeker, columnId)}
      onDragEnd={onDragEnd}
      onClick={() => onClick(jobSeeker, columnId)}
      className="bg-white rounded-lg border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-move group"
      data-card-item="true"
    >
      <div className="flex flex-col gap-3 p-4">
        {/* Header: Avatar, Name, Score */}
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm flex-shrink-0">
            <AvatarImage src={candidateAvatar} alt={candidateName} />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm">
              {candidateName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate text-sm leading-tight mb-1">
              {candidateName}
            </h3>
            <div className="flex items-center gap-1 text-xs text-red-600 font-medium">
              <span className="text-lg leading-none">↗</span>
              <span>{matchScore}% Score</span>
            </div>
          </div>
        </div>

        {/* Applied Date */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>Applied {appliedDate}</span>
        </div>

        {/* Sub Status Badge */}
        <Badge
          variant="secondary"
          className={`w-full justify-center text-xs py-1.5 font-medium border ${subStatusStyle}`}
        >
          {subStatus}
        </Badge>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-8 px-3 hover:bg-gray-100 text-gray-600 text-xs font-normal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <User className="h-3.5 w-3.5 mr-1.5" />
            Profile
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-8 px-3 hover:bg-gray-100 text-gray-600 text-xs font-normal"
            onClick={(e) => {
              e.stopPropagation();
              onClick(jobSeeker, columnId);
            }}
          >
            <ClipboardCheck className="h-3.5 w-3.5 mr-1.5" />
            Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}
