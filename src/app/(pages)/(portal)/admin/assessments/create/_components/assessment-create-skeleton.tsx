import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = ({ children }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
    {/* Card Header Skeleton */}
    <div className="flex items-center gap-2 mb-6">
      <Skeleton className="h-5 w-5 bg-gray-200" />
      <Skeleton className="h-5 w-32 bg-gray-200" />
    </div>
    {children}
  </div>
);

export function AssessmentCreateSkeleton() {
  return (
    <div className="space-y-6">
      {/* Assessment Details Card Skeleton */}
      <SkeletonCard>
        <div className="space-y-6">
          {/* Internal Pollen Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40 bg-gray-200" />
            <Skeleton className="h-10 w-full bg-gray-200" />
          </div>

          {/* Assessment Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-gray-200" />
            <Skeleton className="h-10 w-full bg-gray-200" />
          </div>

          {/* Assessment Subtitle */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-36 bg-gray-200" />
            <Skeleton className="h-10 w-full bg-gray-200" />
          </div>

          {/* Estimated Duration */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40 bg-gray-200" />
            <Skeleton className="h-10 w-full bg-gray-200" />
          </div>

          {/* Instructions Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-36 bg-gray-200" />
            <Skeleton className="h-10 w-full bg-gray-200" />
          </div>

          {/* Instructions Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-44 bg-gray-200" />
            <Skeleton className="h-24 w-full bg-gray-200" />
          </div>
        </div>
      </SkeletonCard>

      {/* Assessment Type Selector Skeleton */}
      <SkeletonCard>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Three type cards */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg"
              >
                <Skeleton className="h-12 w-12 rounded-lg bg-gray-200 mb-3" />
                <Skeleton className="h-5 w-32 bg-gray-200 mb-2" />
                <Skeleton className="h-4 w-40 bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </SkeletonCard>
    </div>
  );
}
