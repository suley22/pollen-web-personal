"use client";

import * as React from "react";
import { FormCard } from "./form-card";
import { cn } from "@/lib/utils";

interface DescriptionCardProps {
  title: string;
  icon?: React.ReactNode;
  value?: string | null;
  placeholder?: string;
  className?: string;
  textClassName?: string;
}

/**
 * Read-only card component for displaying description text
 * Combines FormCard with formatted text display
 */
export function DescriptionCard({
  title,
  icon,
  value,
  placeholder = "Not specified",
  className,
  textClassName,
}: DescriptionCardProps) {
  return (
    <FormCard title={title} icon={icon} className={className}>
      {value ? (
        <p
          className={cn("text-sm leading-relaxed text-gray-700", textClassName)}
        >
          {value ? (
            <span
              className={cn("text-sm leading-relaxed text-gray-700", className)}
            >
              {value}
            </span>
          ) : (
            <span className={cn("text-sm text-muted-foreground", className)}>
              {placeholder}
            </span>
          )}
        </p>
      ) : (
        <p className={cn("text-sm text-muted-foreground", textClassName)}>
          {placeholder}
        </p>
      )}
    </FormCard>
  );
}
