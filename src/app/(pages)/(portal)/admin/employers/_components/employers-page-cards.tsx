"use client";
import { Building2, FileText, Eye, EyeOff } from "lucide-react";
import {
  StatisticsCards as StatisticsCardsBase,
  StatisticCard,
} from "@/components/design-system";
import { EMPLOYER_STATUS } from "@/constants/filters";

export function StatisticsCards({
  statistics,
  selectedStatus,
  setSelectedStatus,
  loading,
}) {
  const cards: StatisticCard[] = [
    {
      id: "all",
      label: "Total Companies",
      count: statistics.total,
      icon: Building2,
      color: "text-foreground",
      ringColor: "ring-primary",
    },
    {
      id: EMPLOYER_STATUS.DRAFT,
      label: "Draft",
      count: statistics.draft,
      icon: FileText,
      color: "text-yellow-600",
      ringColor: "ring-yellow-500",
    },
    {
      id: EMPLOYER_STATUS.LIVE,
      label: "Live",
      count: statistics.live,
      icon: Eye,
      color: "text-green-600",
      ringColor: "ring-green-500",
    },
    {
      id: EMPLOYER_STATUS.HIDDEN,
      label: "Hidden",
      count: statistics.hidden,
      icon: EyeOff,
      color: "text-gray-600",
      ringColor: "ring-gray-500",
    },
  ];

  return (
    <StatisticsCardsBase
      cards={cards}
      selectedId={selectedStatus}
      onCardClick={setSelectedStatus}
      isLoading={loading}
      gridCols={{
        base: "grid-cols-1",
        md: "md:grid-cols-4",
      }}
    />
  );
}
