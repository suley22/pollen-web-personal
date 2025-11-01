"use client";

import { Card } from "@/components/ui/card";
import type { AssessmentCategory } from "@/types/assessment-types";

interface CategoryCardProps {
  category: AssessmentCategory;
  optionsCount?: number;
}

export function CategoryCard({ category, optionsCount }: CategoryCardProps) {
  return (
    <Card
      className="p-4"
      style={{
        borderColor: category.color,
        borderWidth: "2px",
        backgroundColor: `${category.color}10`, // 10% opacity
      }}
    >
      <div className="flex items-center gap-2 ">
        <div
          className="font-semibold text-lg"
          style={{ color: category.color }}
        >
          {category.name}
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <p className="text-sm text-gray-600">{category.description}</p>

        {optionsCount !== undefined && (
          <span
            className="text-xs font-medium px-2 py-1 rounded"
            style={{
              backgroundColor: category.color,
              color: "white",
            }}
          >
            {optionsCount} {optionsCount === 1 ? "option" : "options"}
          </span>
        )}
      </div>
    </Card>
  );
}
