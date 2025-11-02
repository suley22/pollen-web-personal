import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { JobCardSkeleton } from "./job-card-skeleton";

export function HomeJobsSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border h-full">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40 bg-gray-200" />
          <Skeleton className="h-6 w-32 bg-gray-200" />
        </div>
      </div>

      <div className="p-6 space-y-3">
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
      </div>
    </div>
  );
}
