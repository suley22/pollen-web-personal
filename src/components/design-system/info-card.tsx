"use client";

import { FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  color?: "blue" | "green" | "purple" | "orange" | "red" | "gray";
}

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
    title: "text-blue-900",
    description: "text-blue-800",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "text-green-600",
    title: "text-green-900",
    description: "text-green-800",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "text-purple-600",
    title: "text-purple-900",
    description: "text-purple-800",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "text-orange-600",
    title: "text-orange-900",
    description: "text-orange-800",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-600",
    title: "text-red-900",
    description: "text-red-800",
  },
  gray: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    icon: "text-gray-600",
    title: "text-gray-900",
    description: "text-gray-800",
  },
};

export function InfoCard({
  title,
  description,
  icon: Icon = FileText,
  color = "blue",
}: InfoCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
      <div className="flex items-center gap-4">
        <Icon className={`h-5 w-5 ${colors.icon}`} />
        <div>
          <div className={`font-semibold ${colors.title} mb-1`}>{title}</div>
          {description && (
            <p className={`text-sm ${colors.description}`}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
