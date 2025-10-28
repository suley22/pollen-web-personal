"use client";

import { FileText, FilePen, Play, Pause, Archive } from "lucide-react";
import {
  StatisticsCards as StatisticsCardsBase,
  StatisticCard,
} from "@/components/design-system";

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
  const cards: StatisticCard[] = [
    {
      id: "all",
      label: "Total Assessments",
      count: statistics.total,
      icon: FileText,
      color: "text-foreground",
      ringColor: "ring-primary",
    },
    {
      id: "draft",
      label: "Draft",
      count: statistics.draft,
      icon: FilePen,
      color: "text-yellow-600",
      ringColor: "ring-yellow-500",
    },
    {
      id: "live",
      label: "Live",
      count: statistics.live,
      icon: Play,
      color: "text-green-600",
      ringColor: "ring-green-500",
    },
    {
      id: "paused",
      label: "Paused",
      count: statistics.paused,
      icon: Pause,
      color: "text-orange-600",
      ringColor: "ring-orange-500",
    },
    {
      id: "archived",
      label: "Archived",
      count: statistics.archived,
      icon: Archive,
      color: "text-gray-600",
      ringColor: "ring-gray-500",
    },
  ];

  return (
    <StatisticsCardsBase
      cards={cards}
      selectedId={selectedStatus}
      onCardClick={onStatusChange}
      isLoading={isLoading}
      gridCols={{
        base: "grid-cols-1",
        md: "md:grid-cols-5",
      }}
    />
  );
}
