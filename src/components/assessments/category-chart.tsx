"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CategoryStats } from "@/types/assessment-category";

interface CategoryChartProps {
  stats: CategoryStats[];
}

export function CategoryChart({ stats }: CategoryChartProps) {
  const total = stats.reduce((sum, stat) => sum + stat.count, 0);

  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="">Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No answers selected yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="">Category Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress bars */}
        <div className="space-y-3">
          {stats.map((stat) => (
            <div key={stat.categoryId} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium" style={{ color: stat.color }}>
                  {stat.categoryName}
                </span>
                <span className="text-muted-foreground">
                  {stat.count} ({stat.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 ease-out"
                  style={{
                    width: `${stat.percentage}%`,
                    backgroundColor: stat.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pie chart representation */}
        <div className="mt-6">
          <div className="flex h-8 rounded-full overflow-hidden">
            {stats.map((stat) => (
              <div
                key={stat.categoryId}
                className="transition-all duration-500 ease-out"
                style={{
                  width: `${stat.percentage}%`,
                  backgroundColor: stat.color,
                }}
                title={`${stat.categoryName}: ${stat.percentage.toFixed(1)}%`}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {stats.map((stat) => (
            <div key={stat.categoryId} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stat.color }}
              />
              <span className="text-xs text-muted-foreground">
                {stat.categoryName}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
