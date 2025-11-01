import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
  return (
    <Card className="border-border/40">
      <CardContent className="px-5 py-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1">
                {/* Job Title and Status */}
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <Skeleton className="h-6 w-48 bg-gray-200" />
                  <Skeleton className="h-5 w-20 rounded-full bg-gray-200" />
                </div>

                {/* Job Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex flex-row items-start gap-4">
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                    <Skeleton className="h-4 w-40 bg-gray-200" />
                  </div>
                </div>
              </div>

              {/* Right Section - Total Applications */}
              <div className="flex flex-col justify-start">
                <div className="px-4 py-2 rounded-lg">
                  <Skeleton className="h-3 w-28 mb-2 bg-gray-200" />
                  <Skeleton className="h-6 w-12 bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50 pt-3 mt-3">
              <div className="flex flex-row justify-between items-center">
                {/* Status Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
                  <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
                  <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
                  <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  <Skeleton className="h-6 w-36 bg-gray-200" />
                  <Skeleton className="h-6 w-28 bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
