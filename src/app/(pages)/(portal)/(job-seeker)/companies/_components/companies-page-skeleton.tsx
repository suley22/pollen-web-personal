"use client";

import { PageContainer } from "@/components/design-system";
import { Skeleton } from "@/components/ui/skeleton";

export function CompaniesPageSkeleton() {
  return (
    <PageContainer className="flex flex-col gap-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 bg-gray-200" />
        <Skeleton className="h-4 w-96 bg-gray-200" />
      </div>

      {/* Recommended Companies Section */}
      <div className="space-y-3">
        <div className="space-y-1">
          <Skeleton className="h-6 w-56 bg-gray-200" />
          <Skeleton className="h-4 w-80 bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={`rec-${i}`} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-md bg-gray-200" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40 bg-gray-200" />
                  <Skeleton className="h-4 w-28 bg-gray-200" />
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                </div>
              </div>
              <Skeleton className="h-4 w-full bg-gray-200" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28 bg-gray-200" />
                <Skeleton className="h-8 w-28 bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Companies Section */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-40 bg-gray-200" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`all-${i}`} className="rounded-lg border">
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-md bg-gray-200" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-44 bg-gray-200" />
                    <Skeleton className="h-4 w-28 bg-gray-200" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-3/4 bg-gray-200" />
                <div className="flex items-center justify-between pt-1">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-8 w-24 bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="rounded-xl border p-8 space-y-4">
        <Skeleton className="h-7 w-72 bg-gray-200" />
        <Skeleton className="h-4 w-2/3 bg-gray-200" />
        <Skeleton className="h-10 w-40 bg-gray-200" />
      </div>
    </PageContainer>
  );
}
