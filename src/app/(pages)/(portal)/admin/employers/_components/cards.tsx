"use client";
import { Building2, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatisticsCards() {
  // TODO: Armar las estadísticas reales
  const statistics = {
    total: 15,
    live: 10,
    draft: 5,
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="w-full">
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

        <Card className="w-full">
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
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Draft
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {statistics.draft}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
