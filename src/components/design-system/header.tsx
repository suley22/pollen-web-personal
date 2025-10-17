"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: ReactNode;
  titleSize?: string;
  subtitle?: ReactNode;
  className?: string;
}

export function Header({ title, subtitle, className, titleSize }: HeaderProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className={cn("font-sora font-bold", titleSize, "text-gray-900")}>
        {title}
      </div>
      {subtitle && (
        <div className="flex flex-row justify-between ">
          <p className="text-base font-sora text-gray-600 inline-block align-middle">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
