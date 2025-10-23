"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title = "Page Title",
  titleSize = "text-2xl",
  subtitle = "",
  showBackButton = false,
  onBack = () => {},
  children = null,
  className = "",
}) {
  return (
    <div className={cn("w-full flex items-center justify-between", className)}>
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        <div className="flex flex-col">
          <div className={`${titleSize} font-sora font-bold`}>{title}</div>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
