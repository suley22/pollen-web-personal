import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResultsCount } from "./assessments-page-results-count";

export function ListSkeleton() {
  const skeletonItems = [1, 2, 3];

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Skeleton pagination top */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-48 bg-gray-200" />
        <Skeleton className="h-8 w-32 bg-gray-200" />
      </div>

      {skeletonItems.map((id) => (
        <Card key={`skeleton-${id}`} className="border-border/40">
          <CardContent className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              {/* Left Section - Icon and Info */}
              <div className="flex gap-4 flex-1 min-w-0">
                {/* Icon skeleton */}
                <Skeleton className="h-12 w-12 rounded-lg bg-gray-200" />

                <div className="flex-1 min-w-0 space-y-3">
                  {/* Title and badges */}
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-64 bg-gray-200" />
                    <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
                    <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
                  </div>

                  {/* Subtitle */}
                  <Skeleton className="h-4 w-96 bg-gray-200" />

                  {/* Details row 1 */}
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                    <Skeleton className="h-4 w-28 bg-gray-200" />
                  </div>

                  {/* Details row 2 */}
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-3 w-32 bg-gray-200" />
                    <Skeleton className="h-3 w-32 bg-gray-200" />
                    <Skeleton className="h-3 w-24 bg-gray-200" />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border/50 pt-3 mt-3">
                    <div className="flex items-center justify-end gap-2">
                      <Skeleton className="h-8 w-16 bg-gray-200" />
                      <Skeleton className="h-8 w-16 bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Stats */}
              <div className="flex flex-col justify-start gap-3">
                <div className="space-y-1 bg-muted/30 p-3 rounded-lg min-w-[120px]">
                  <Skeleton className="h-3 w-full bg-gray-200" />
                  <Skeleton className="h-7 w-16 bg-gray-200" />
                  <Skeleton className="h-3 w-full bg-gray-200" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Skeleton pagination bottom */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32 bg-gray-200" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 bg-gray-200" />
          <Skeleton className="h-8 w-20 bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
