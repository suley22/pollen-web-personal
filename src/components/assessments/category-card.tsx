"use client";

import { Card } from "@/components/ui/card";
import type { AssessmentCategory } from "@/types/assessment-category";

interface CategoryCardProps {
  category: AssessmentCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card
      className="p-4"
      style={{
        borderColor: category.color,
        borderWidth: "2px",
        backgroundColor: `${category.color}10`, // 10% opacity
      }}
    >
      <h3
        className="font-semibold text-lg mb-2"
        style={{ color: category.color }}
      >
        {category.name}
      </h3>
      <p className="text-sm text-gray-600">{category.description}</p>
    </Card>
  );
}
