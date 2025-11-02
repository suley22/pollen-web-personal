"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  /**
   * When true, the component will expand to fill its parent's height/width.
   * Useful to center content within any sized container (not the whole screen).
   */
  fill?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
  fill = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-4 text-center ${fill ? "h-full w-full" : ""} ${className}`}
    >
      {Icon && (
        <div className="rounded-full bg-gray-100 p-5 mb-2">
          <Icon className="h-9 w-9 text-gray-400" />
        </div>
      )}
      <div className="text-lg font-semibold text-gray-900">{title}</div>
      <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
