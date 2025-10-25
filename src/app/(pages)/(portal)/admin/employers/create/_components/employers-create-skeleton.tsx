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

export function EmployersCreateSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left Column - Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Company Information Skeleton */}
        <SkeletonCard>
          <div className="space-y-6">
            {/* Avatar and Logo Row */}
            <div className="flex flex-row items-center gap-6">
              {/* Company Avatar */}
              <div className="flex-shrink-0">
                <Skeleton className="h-20 w-20 rounded-full bg-gray-200" />
              </div>

              <div className="w-full flex flex-col gap-3">
                {/* Company Name */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-10 w-full bg-gray-200" />
                </div>

                {/* Logo URL */}
                <div className="flex flex-row gap-4 items-end">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                    <Skeleton className="h-10 w-full bg-gray-200" />
                  </div>
                  <Skeleton className="h-9 w-24 bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Company Information Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Company Size */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-200" />
              </div>

              {/* Founded Year */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-200" />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-200" />
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-200" />
              </div>
            </div>

            {/* Industry Section */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-16 bg-gray-200" />
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 bg-gray-200" />
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SkeletonCard>

        {/* Text Area Cards */}
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i}>
            <div className="space-y-2">
              <Skeleton className="h-32 w-full bg-gray-200" />
            </div>
          </SkeletonCard>
        ))}

        {/* Internal Pollen Data */}
        <SkeletonCard>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-200" />
              <Skeleton className="h-10 w-full bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 bg-gray-200" />
              <Skeleton className="h-10 w-full bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-200" />
              <Skeleton className="h-10 w-full bg-gray-200" />
            </div>
          </div>
        </SkeletonCard>
      </div>

      {/* Right Column - Sidebar */}
      <div className="space-y-6">
        {/* Contact Information */}
        <SkeletonCard>
          <div className="space-y-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20 bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-200" />
              </div>
            ))}
          </div>
        </SkeletonCard>

        {/* Social Media */}
        <SkeletonCard>
          <div className="space-y-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-16 bg-gray-200" />
                <Skeleton className="h-10 w-full bg-gray-200" />
              </div>
            ))}
          </div>
        </SkeletonCard>

        {/* Accolades & Accreditations */}
        <SkeletonCard>
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-20 w-full bg-gray-200" />
              </div>
            ))}
          </div>
        </SkeletonCard>
      </div>
    </div>
  );
}
