import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobViewSkeleton() {
  return (
    <div className="flex flex-col w-full mx-auto py-6 gap-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-md bg-gray-200" />
          <Skeleton className="h-10 w-80 bg-gray-200" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24 bg-gray-200" />
          <Skeleton className="h-9 w-28 bg-gray-200" />
          <Skeleton className="h-9 w-24 bg-gray-200" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex space-x-2">
        <Skeleton className="h-10 w-32 bg-gray-200" />
        <Skeleton className="h-10 w-32 bg-gray-200" />
        <Skeleton className="h-10 w-32 bg-gray-200" />
      </div>

      {/* Content Cards Skeleton */}
      <div className="space-y-6">
        {/* Card 1 */}
        <Card className="overflow-hidden py-6">
          <CardHeader className="pb-3 px-6">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 bg-gray-200" />
              <Skeleton className="h-6 w-48 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="px-6 space-y-4">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-3/4 bg-gray-200" />
            <Skeleton className="h-4 w-5/6 bg-gray-200" />
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="overflow-hidden py-6">
          <CardHeader className="pb-3 px-6">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 bg-gray-200" />
              <Skeleton className="h-6 w-48 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="px-6 space-y-4">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-3/4 bg-gray-200" />
            <Skeleton className="h-4 w-5/6 bg-gray-200" />
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="overflow-hidden py-6">
          <CardHeader className="pb-3 px-6">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 bg-gray-200" />
              <Skeleton className="h-6 w-48 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="px-6 space-y-4">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-3/4 bg-gray-200" />
            <Skeleton className="h-4 w-5/6 bg-gray-200" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
