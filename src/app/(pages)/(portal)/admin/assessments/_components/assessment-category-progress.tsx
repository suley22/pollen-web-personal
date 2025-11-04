"use client";

import type { AssessmentCategory } from "@/types/assessment-types";

interface CategoryWithProgress extends AssessmentCategory {
  percentage: number;
  count?: number;
}

interface AssessmentCategoryProgressProps {
  categories: CategoryWithProgress[];
}

export function AssessmentCategoryProgress({
  categories,
}: AssessmentCategoryProgressProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div
          key={category.id}
          className="rounded-lg p-4 border-2 transition-all hover:shadow-sm"
          style={{
            borderColor: category.color,
            backgroundColor: `${category.color}10`,
          }}
        >
          <div
            className="text-2xl font-bold mb-1"
            style={{ color: category.color }}
          >
            {category.percentage}%
          </div>
          <div className="font-semibold text-gray-900 dark:text-gray-100">
            {category.name}
          </div>
          {category.description && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {category.description}
            </div>
          )}
          {category.count !== undefined && (
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {category.count} {category.count === 1 ? "answer" : "answers"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
