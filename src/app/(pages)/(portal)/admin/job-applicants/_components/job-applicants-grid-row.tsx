"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/buttons/button";
import { User, ClipboardCheck } from "lucide-react";

// TODO(job_applicants):
// - Usar <tr>/<td> dentro de <table> si se prioriza accesibilidad de tablas.
// - Extraer los botones de acción a un subcomponente y estandarizar tooltips/aria-labels.
// - Memoizar filas si el dataset es grande para evitar renders innecesarios.
export default function GridRow({ jobSeeker, onClick }) {
  // Datos reales desde el jobSeeker (job_application + job_seeker)
  const candidateName = jobSeeker.name;
  const candidateAvatar = jobSeeker.avatar_url;
  const matchScore = jobSeeker.match_score;
  const appliedDate = jobSeeker.applied_date;
  const subStatus = jobSeeker.sub_status;

  return (
    <div
      onClick={() => onClick(jobSeeker, jobSeeker.status)}
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
          className={`${jobSeeker.statusColor} text-white text-xs px-2 py-1 rounded-full`}
        >
          {jobSeeker.statusLabel}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-600"
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
          className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-600"
          onClick={(e) => {
            e.stopPropagation();
            // Handle assessment action
          }}
        >
          <ClipboardCheck className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
