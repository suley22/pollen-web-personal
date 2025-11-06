import { PageContainer } from "@/components/design-system";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <PageContainer>
      {/* Header Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-64 mb-2 bg-gray-200" />
        <Skeleton className="h-4 w-96 bg-gray-200" />
      </div>

      {/* Filters Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-10 w-full max-w-md bg-gray-200" />
      </div>

      {/* Controls Skeleton */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-32 bg-gray-200" />
            <Skeleton className="h-10 w-24 bg-gray-200" />
          </div>
          <Skeleton className="h-10 w-24 bg-gray-200" />
        </div>
      </div>

      {/* Events Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="mb-4">
              <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
              <Skeleton className="h-5 w-20 bg-gray-200" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded bg-gray-200" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-1 bg-gray-200" />
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded bg-gray-200" />
                <Skeleton className="h-4 w-20 bg-gray-200" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded bg-gray-200" />
                <Skeleton className="h-4 w-40 bg-gray-200" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded bg-gray-200" />
                <Skeleton className="h-4 w-28 bg-gray-200" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Skeleton className="h-3 w-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
