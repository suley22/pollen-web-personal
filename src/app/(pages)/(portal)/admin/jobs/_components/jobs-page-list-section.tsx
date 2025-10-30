"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EmptyState, Pagination } from "@/components/design-system";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { JobCardItem } from "@/admin/jobs/_components/jobs-page-card-item";
import { Building2 } from "lucide-react";

export function JobListSection({
  jobs,
  isLoading,
  pagination,
  handlePageChange,
  handlePageSizeChange,
}) {
  if (isLoading) {
    // Skeleton loading state
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48 bg-gray-200" />
        </div>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-1/2 bg-gray-200" />
                  <Skeleton className="h-4 w-1/3 bg-gray-200" />
                  <Skeleton className="h-4 w-1/4 bg-gray-200" />
                  <Skeleton className="h-4 w-1/2 bg-gray-200" />
                </div>
                <div className="flex flex-col space-y-2 ml-4 w-32">
                  <Skeleton className="h-8 w-full bg-gray-200" />
                  <Skeleton className="h-7 w-full bg-gray-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="No jobs found"
        description="No jobs match your current filters. Try adjusting your search criteria or clear filters to see all jobs."
      />
    );
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="items-center justify-between">
        {pagination && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            pageSize={pagination.pageSize}
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
            from={pagination.from}
            to={pagination.to}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobCardItem key={job.id} job={job} showAdminBadge={true} />
        ))}
      </div>

      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
          from={pagination.from}
          to={pagination.to}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
