import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FiltersSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-row gap-4 items-center">
          {/* Search Input Skeleton */}
          <div className="flex flex-1 relative">
            <Skeleton className="h-9 w-full bg-gray-200" />
          </div>

          {/* Filter Skeletons - showing 2 by default */}
          <Skeleton className="h-9 w-56 bg-gray-200" />
          <Skeleton className="h-9 w-56 bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
}
