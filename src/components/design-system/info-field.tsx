"use client";

import { Label } from "@/components/ui/label";

interface InfoFieldProps {
  label: string;
  value?: string | number | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function InfoField({
  label,
  value,
  icon,
  className = "",
}: InfoFieldProps) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-muted-foreground">
        {label}
      </Label>
      {icon ? (
        <div className="flex items-center space-x-2 mt-1">
          {icon}
          <span className="text-sm">{value || "Not specified"}</span>
        </div>
      ) : (
        <span className="mt-1 text-sm">{value || "Not specified"}</span>
      )}
    </div>
  );
}
