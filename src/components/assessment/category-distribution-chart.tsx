"use client";

import { useMemo } from "react";
import type { AssessmentCategory } from "@/types/assessment-category";
import type { AssessmentQuestion } from "@/types/assessment-question";

interface CategoryDistributionChartProps {
  categories: AssessmentCategory[];
  questions: AssessmentQuestion[];
}

export function CategoryDistributionChart({
  categories,
  questions,
}: CategoryDistributionChartProps) {
  const categoryStats = useMemo(() => {
    const allOptions = questions.flatMap((q) => q.options);
    const totalOptions = allOptions.length;

    return categories.map((category) => {
      const categoryOptions = allOptions.filter(
        (opt) => opt.categoryId === category.id,
      );
      const count = categoryOptions.length;
      const percentage = totalOptions > 0 ? (count / totalOptions) * 100 : 0;

      return {
        ...category,
        count,
        percentage,
      };
    });
  }, [categories, questions]);

  const maxPercentage = Math.max(...categoryStats.map((s) => s.percentage), 0);

  return (
    <div className="space-y-4">
      {categoryStats.map((stat) => (
        <div key={stat.id} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: stat.color }}
              />
              <span className="font-medium">{stat.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {stat.count} option{stat.count !== 1 ? "s" : ""}
              </span>
              <span className="font-semibold" style={{ color: stat.color }}>
                {stat.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="relative w-full h-8 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-500 ease-out rounded-full"
              style={{
                backgroundColor: stat.color,
                width: `${stat.percentage}%`,
              }}
            />
          </div>
        </div>
      ))}

      {categoryStats.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No categories with options yet
        </p>
      )}
    </div>
  );
}
