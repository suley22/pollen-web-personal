"use client";
import { Building2, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEmployerManagementContext } from "@/employers/_context/admin-employers-context";
import { cn } from "@/lib/utils";

export function StatisticsCards() {
  const { statistics, selectedStatus, setSelectedStatus, loading } =
    useEmployerManagementContext();

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
            selectedStatus === "approved" && "ring-2 ring-green-500",
          )}
          onClick={() => handleCardClick("approved")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Approved
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {statistics.approved}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "w-full cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
            selectedStatus === "draft" && "ring-2 ring-yellow-500",
          )}
          onClick={() => handleCardClick("draft")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Draft
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {statistics.pending}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "w-full cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
            selectedStatus === "rejected" && "ring-2 ring-red-500",
          )}
          onClick={() => handleCardClick("rejected")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Rejected
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {statistics.rejected}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
