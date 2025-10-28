"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface StatisticCard {
  id: string;
  label: string;
  count: number;
  icon: LucideIcon;
  color: string;
  ringColor: string;
}

interface StatisticsCardsProps {
  cards: StatisticCard[];
  selectedId: string;
  onCardClick: (id: string) => void;
  isLoading?: boolean;
  gridCols?: {
    base?: string;
    md?: string;
    lg?: string;
  };
}

export function StatisticsCards({
  cards,
  selectedId,
  onCardClick,
  isLoading = false,
  gridCols = {
    base: "grid-cols-1",
    md: "md:grid-cols-4",
    lg: undefined,
  },
}: StatisticsCardsProps) {
  const handleCardClick = (id: string) => {
    onCardClick(id);
  };

  // Build grid classes
  const gridClasses = cn("grid gap-4", gridCols.base, gridCols.md, gridCols.lg);

  if (isLoading) {
    return (
      <div className={gridClasses}>
        {cards.map((card) => (
          <Card key={card.id} className="w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-8 w-16 bg-gray-200" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = selectedId === card.id;

        return (
          <Card
            key={card.id}
            className={cn(
              "w-full cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
              isSelected && "ring-2",
              isSelected && card.ringColor,
            )}
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </p>
                  <p className={cn("text-2xl font-bold", card.color)}>
                    {card.count}
                  </p>
                </div>
                <Icon className={cn("h-8 w-8", card.color)} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
