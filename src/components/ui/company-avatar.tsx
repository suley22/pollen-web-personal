"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";

interface CompanyAvatarProps {
  logoUrl?: string;
  companyName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function CompanyAvatar({
  logoUrl,
  companyName = "Company",
  size = "xl",
  className = "",
}: CompanyAvatarProps) {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-48 w-48",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage
        className="rounded-md"
        src={logoUrl || ""}
        alt={`${companyName} logo`}
      />
      <AvatarFallback className="bg-muted text-muted-foreground rounded-md">
        <Building2 className={iconSizes[size]} />
      </AvatarFallback>
    </Avatar>
  );
}
