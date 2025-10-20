"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormActionsProps {
  children: ReactNode;
  className?: string;
  showDivider?: boolean;
}

export function FormActions({
  children,
  className,
  showDivider = true,
}: FormActionsProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {showDivider && <div className="w-full h-[1px] bg-gray-200" />}
      <div className="flex justify-end gap-3">{children}</div>
    </div>
  );
}
