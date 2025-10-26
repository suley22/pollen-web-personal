"use client";
import { Building2, FileText, Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { EMPLOYER_STATUS } from "@/constants/filters";

export function StatisticsCards({
  statistics,
  selectedStatus,
  setSelectedStatus,
  loading,
}) {
  const handleCardClick = (status: string) => {
    setSelectedStatus(status);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  Total Companies
                </p>
                <p className="text-2xl font-bold">{statistics.total}</p>
              </div>
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "w-full cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
            selectedStatus === EMPLOYER_STATUS.DRAFT &&
              "ring-2 ring-yellow-500",
          )}
          onClick={() => handleCardClick(EMPLOYER_STATUS.DRAFT)}
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
            selectedStatus === EMPLOYER_STATUS.LIVE && "ring-2 ring-green-500",
          )}
          onClick={() => handleCardClick(EMPLOYER_STATUS.LIVE)}
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
            selectedStatus === EMPLOYER_STATUS.HIDDEN && "ring-2 ring-gray-500",
          )}
          onClick={() => handleCardClick(EMPLOYER_STATUS.HIDDEN)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Hidden
                </p>
                <p className="text-2xl font-bold text-gray-600">
                  {statistics.hidden}
                </p>
              </div>
              <EyeOff className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
