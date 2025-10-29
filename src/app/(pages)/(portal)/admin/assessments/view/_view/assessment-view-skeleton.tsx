import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
    {/* Card Header Skeleton */}
    <div className="flex items-center gap-2 mb-6">
      <Skeleton className="h-5 w-5 bg-gray-200" />
      <Skeleton className="h-5 w-32 bg-gray-200" />
    </div>
    {children}
  </div>
);

export function AssessmentViewSkeleton() {
  return (
    <div className="flex flex-col w-full mx-auto py-6 gap-6">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 bg-gray-200" />
            <Skeleton className="h-4 w-48 bg-gray-200" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24 bg-gray-200" />
            <Skeleton className="h-10 w-24 bg-gray-200" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16 bg-gray-200" />
          <Skeleton className="h-6 w-32 bg-gray-200" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assessment Information */}
          <SkeletonCard>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-6 w-full bg-gray-200" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* Instructions */}
          <SkeletonCard>
            <div className="space-y-2">
              <Skeleton className="h-32 w-full bg-gray-200" />
            </div>
          </SkeletonCard>

          {/* Questions */}
          <SkeletonCard>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4 bg-gray-200" />
                      <Skeleton className="h-4 w-full bg-gray-200" />
                      <Skeleton className="h-4 w-5/6 bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SkeletonCard>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Metadata */}
          <SkeletonCard>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-6 w-full bg-gray-200" />
                </div>
              ))}
            </div>
          </SkeletonCard>

          {/* Categories (if applicable) */}
          <SkeletonCard>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full bg-gray-200" />
              ))}
            </div>
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
}
