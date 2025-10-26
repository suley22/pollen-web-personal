import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResultsCountSkeleton } from "./employers-page-results-count-skeleton";

export function ListSkeleton() {
  const skeletonItems = [1, 2, 3];

  return (
    <div className="space-y-4">
      {/* Skeleton de paginación/Resultados arriba */}
      <ResultsCountSkeleton />
      {skeletonItems.map((id) => (
        <Card key={`skeleton-${id}`} className="">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-row items-center space-x-6">
                {/* Avatar skeleton */}
                <Skeleton className="h-24 w-24 rounded-lg bg-gray-200" />

                <div className="space-y-2 flex-1">
                  {/* Company name and status */}
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-6 w-48 bg-gray-200" />
                    <Skeleton className="h-5 w-20 rounded-full bg-gray-200" />
                  </div>

                  {/* Company info */}
                  <div className="flex items-center space-x-4 space-y-2">
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                    <Skeleton className="h-4 w-28 bg-gray-200" />
                  </div>

                  {/* Contact info */}
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-40 bg-gray-200" />
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                  </div>

                  {/* Assigned to */}
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                  </div>

                  {/* Job counts */}
                  <div className="flex items-center space-x-3 mt-4 pt-2">
                    <Skeleton className="h-6 w-24 rounded-md bg-gray-200" />
                    <Skeleton className="h-6 w-24 rounded-md bg-gray-200" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Profile completion and date */}
                <div className="text-right space-y-1">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-3 w-32 bg-gray-200" />
                </div>

                {/* Dropdown menu button */}
                <Skeleton className="h-8 w-8 rounded-md bg-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {/* Skeleton de paginación/Resultados abajo */}
      <ResultsCountSkeleton />
    </div>
  );
}
