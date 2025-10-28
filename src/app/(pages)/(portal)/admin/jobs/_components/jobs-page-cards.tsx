"use client";
import {
  Briefcase,
  FileText,
  Eye,
  Pause,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { JOB_STATUS } from "@/constants/filters";

export function StatisticsCards({
  statistics,
  selectedStatus,
  setSelectedStatus,
  loading,
}) {
  const handleCardClick = (status: string) => {
    setSelectedStatus(status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {loading ? (
        <>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="w-full">
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
        </>
      ) : (
        <>
          <Card
            className={cn(
              "w-full cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
              selectedStatus === "all" && "ring-2 ring-primary",
            )}
            onClick={() => handleCardClick("all")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Jobs
                  </p>
                  <p className="text-2xl font-bold">{statistics.total}</p>
                </div>
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "w-full cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
              selectedStatus === JOB_STATUS.DRAFT && "ring-2 ring-yellow-500",
            )}
            onClick={() => handleCardClick(JOB_STATUS.DRAFT)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Draft
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {statistics.draft}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "w-full cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
              selectedStatus === JOB_STATUS.LIVE && "ring-2 ring-green-500",
            )}
            onClick={() => handleCardClick(JOB_STATUS.LIVE)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Live
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {statistics.live}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "w-full cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
              selectedStatus === JOB_STATUS.PAUSED && "ring-2 ring-orange-500",
            )}
            onClick={() => handleCardClick(JOB_STATUS.PAUSED)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Paused
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {statistics.paused}
                  </p>
                </div>
                <Pause className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
