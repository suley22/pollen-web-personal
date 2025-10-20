"use client";

import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BaseBadgeProps {
  children: ReactNode;
  className?: string;
}

// Success Badge - Verde
export function SuccessBadge({ children, className }: BaseBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "bg-green-50 text-green-700 border-green-200 font-medium",
        className,
      )}
    >
      {children}
    </Badge>
  );
}

// Warning Badge - Amarillo
export function WarningBadge({ children, className }: BaseBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "bg-yellow-50 text-yellow-700 border-yellow-200 font-medium",
        className,
      )}
    >
      {children}
    </Badge>
  );
}

// Error/Danger Badge - Rojo
export function ErrorBadge({ children, className }: BaseBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "bg-red-50 text-red-700 border-red-200 font-medium",
        className,
      )}
    >
      {children}
    </Badge>
  );
}

// Info Badge - Azul
export function InfoBadge({ children, className }: BaseBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "bg-blue-50 text-blue-700 border-blue-200 font-medium",
        className,
      )}
    >
      {children}
    </Badge>
  );
}

// Neutral Badge - Gris
export function NeutralBadge({ children, className }: BaseBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "bg-gray-50 text-gray-700 border-gray-200 font-medium",
        className,
      )}
    >
      {children}
    </Badge>
  );
}

// Orange Badge - Naranja (para paused, etc.)
export function OrangeBadge({ children, className }: BaseBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "bg-orange-50 text-orange-700 border-orange-200 font-medium",
        className,
      )}
    >
      {children}
    </Badge>
  );
}

// Purple Badge - Púrpura
export function PurpleBadge({ children, className }: BaseBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "bg-purple-50 text-purple-700 border-purple-200 font-medium",
        className,
      )}
    >
      {children}
    </Badge>
  );
}

// Status-specific badges for common use cases
export function LiveBadge({ children, className }: BaseBadgeProps) {
  return <SuccessBadge className={className}>{children}</SuccessBadge>;
}

export function DraftBadge({ children, className }: BaseBadgeProps) {
  return <WarningBadge className={className}>{children}</WarningBadge>;
}

export function HiddenBadge({ children, className }: BaseBadgeProps) {
  return <NeutralBadge className={className}>{children}</NeutralBadge>;
}

export function PausedBadge({ children, className }: BaseBadgeProps) {
  return <OrangeBadge className={className}>{children}</OrangeBadge>;
}

export function PendingBadge({ children, className }: BaseBadgeProps) {
  return <WarningBadge className={className}>{children}</WarningBadge>;
}

export function ApprovedBadge({ children, className }: BaseBadgeProps) {
  return <SuccessBadge className={className}>{children}</SuccessBadge>;
}

export function RejectedBadge({ children, className }: BaseBadgeProps) {
  return <ErrorBadge className={className}>{children}</ErrorBadge>;
}

// Job count badges
export function JobCountBadge({
  count,
  type,
  className,
}: {
  count: number;
  type: "live" | "draft" | "hidden" | "paused";
  className?: string;
}) {
  const text = `${count} ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  switch (type) {
    case "live":
      return <LiveBadge className={className}>{text}</LiveBadge>;
    case "draft":
      return <DraftBadge className={className}>{text}</DraftBadge>;
    case "hidden":
      return <HiddenBadge className={className}>{text}</HiddenBadge>;
    case "paused":
      return <PausedBadge className={className}>{text}</PausedBadge>;
    default:
      return <NeutralBadge className={className}>{text}</NeutralBadge>;
  }
}

// New badges: Pollen Approved and External
export function PollenApprovedBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "bg-green-100 text-green-800 border-green-200 font-semibold",
        className,
      )}
    >
      Pollen Approved
    </Badge>
  );
}

export function ExternalBadge({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "bg-transparent text-black border-gray-200 font-semibold",
        className,
      )}
    >
      {children ?? "External"}
    </Badge>
  );
}

// Boolean switcher: if approvedByPollen is true -> Pollen Approved, else -> External
export function ApprovalSourceBadge({
  approvedByPollen,
  className,
}: {
  approvedByPollen: boolean;
  className?: string;
}) {
  if (approvedByPollen) {
    return <PollenApprovedBadge className={className} />;
  }
  return <ExternalBadge className={className} />;
}
