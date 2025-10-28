"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, FilePen, Play, Pause, Archive } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { cn } from "@/lib/utils";

const statusCards = [
  {
    id: "all",
    label: "Total Assessments",
    key: "total",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    ringColor: "ring-blue-200",
  },
  {
    id: "draft",
    label: "Draft",
    key: "draft",
    icon: FilePen,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    ringColor: "ring-yellow-200",
  },
  {
    id: "live",
    label: "Live",
    key: "live",
    icon: Play,
    color: "text-green-600",
    bgColor: "bg-green-50",
    ringColor: "ring-green-200",
  },
  {
    id: "paused",
    label: "Paused",
    key: "paused",
    icon: Pause,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    ringColor: "ring-orange-200",
  },
  {
    id: "archived",
    label: "Archived",
    key: "archived",
    icon: Archive,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    ringColor: "ring-gray-200",
  },
];

interface AssessmentsStatisticsCardsProps {
  statistics: {
    total: number;
    draft: number;
    live: number;
    paused: number;
    archived: number;
    multiple_choice: number;
    free_input: number;
    file_upload: number;
  };
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  isLoading?: boolean;
}

export function AssessmentsStatisticsCards({
  statistics,
  selectedStatus,
  onStatusChange,
  isLoading = false,
}: AssessmentsStatisticsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {statusCards.map((card) => (
          <Card key={card.id} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {statusCards.map((card) => {
        const Icon = card.icon;
        const count = statistics[card.key as keyof typeof statistics] || 0;
        const isSelected = selectedStatus === card.id;

        return (
          <Button
            key={card.id}
            variant="ghost"
            size="sm"
            className={cn(
              "h-auto p-0 hover:bg-transparent",
              isSelected && "ring-2",
              isSelected && card.ringColor,
            )}
            onClick={() => onStatusChange(card.id)}
          >
            <Card
              className={cn(
                "w-full transition-all duration-200 cursor-pointer",
                "hover:shadow-md hover:border-primary/20",
                isSelected && "shadow-md border-primary/30",
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        card.bgColor,
                      )}
                    >
                      <Icon className={cn("w-5 h-5", card.color)} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {card.label}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {count}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Button>
        );
      })}
    </div>
  );
}
