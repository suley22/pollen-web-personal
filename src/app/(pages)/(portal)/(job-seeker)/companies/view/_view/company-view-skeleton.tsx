"use client";

import { PageContainer } from "@/components/design-system";
import { Skeleton } from "@/components/ui/skeleton";

export function CompanyProfileSkeleton() {
  return (
    <PageContainer>
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-md bg-gray-200" />
          <Skeleton className="h-10 w-80 bg-gray-200" />
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Company Information Card */}
        <div className="rounded-lg border p-6 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48 bg-gray-200" />
              <Skeleton className="h-4 w-32 bg-gray-200" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-3/4 bg-gray-200" />
            <Skeleton className="h-4 w-5/6 bg-gray-200" />
            <Skeleton className="h-4 w-2/3 bg-gray-200" />
          </div>
        </div>

        {/* Description Sections */}
        {["About", "Work Env", "Pollen Loves", "Entry Level"].map((k) => (
          <div key={k} className="rounded-lg border p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 bg-gray-200" />
              <Skeleton className="h-6 w-48 bg-gray-200" />
            </div>
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-3/4 bg-gray-200" />
            <Skeleton className="h-4 w-5/6 bg-gray-200" />
          </div>
        ))}

        {/* Accolades */}
        <div className="rounded-lg border p-6 space-y-4">
          <Skeleton className="h-5 w-40 bg-gray-200" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={`accolade-${i}`}
                className="h-6 w-24 rounded-full bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="rounded-lg border p-6 space-y-4">
          <Skeleton className="h-5 w-28 bg-gray-200" />
          <div className="flex items-center gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={`social-${i}`}
                className="h-10 w-10 rounded-full bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
