import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function HomeCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card Skeleton 1 - Purple */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Skeleton className="h-4 w-20 bg-purple-200" />
              <Skeleton className="h-8 w-16 bg-purple-200" />
            </div>
            <Skeleton className="h-16 w-16 rounded-full bg-purple-200" />
          </div>
          <div className="flex items-center gap-2 mb-2 mt-4">
            <Skeleton className="h-4 w-24 bg-purple-200" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 flex-1 bg-purple-200" />
            <Skeleton className="h-9 flex-1 bg-purple-200" />
          </div>
        </CardContent>
      </Card>

      {/* Card Skeleton 2 - Orange */}
      <Card className="border-2 border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-1">
              <Skeleton className="h-4 w-20 bg-orange-200" />
              <Skeleton className="h-8 w-16 bg-orange-200" />
            </div>
            <Skeleton className="h-16 w-16 rounded-full bg-orange-200" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 flex-1 bg-orange-200" />
            <Skeleton className="h-9 flex-1 bg-orange-200" />
          </div>
        </CardContent>
      </Card>

      {/* Card Skeleton 3 - Pink */}
      <Card className="border-2 border-pink-200 bg-pink-50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-1">
              <Skeleton className="h-4 w-20 bg-pink-200" />
              <Skeleton className="h-8 w-16 bg-pink-200" />
            </div>
            <Skeleton className="h-16 w-16 rounded-full bg-pink-200" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 flex-1 bg-pink-200" />
            <Skeleton className="h-9 flex-1 bg-pink-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
