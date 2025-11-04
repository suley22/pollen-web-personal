"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function JobSeekersTableSkeleton({ rows = 6 }) {
  const skeletonRows = Array.from({ length: rows });

  return (
    <tbody>
      {skeletonRows.map((_, idx) => (
        <tr key={idx} className="border-b">
          {/* Job Seeker Column */}
          <td className="py-4 px-4">
            <div className="flex items-center gap-2 space-x-3">
              <div className="flex-shrink-0">
                <Skeleton className="h-16 w-16 rounded-full bg-gray-200" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-40 bg-gray-200" />
                <Skeleton className="h-3 w-32 bg-gray-200" />
                <Skeleton className="h-3 w-28 bg-gray-200" />
              </div>
            </div>
          </td>

          {/* Role Column */}
          <td className="py-2 px-4">
            <Skeleton className="h-4 w-24 bg-gray-200" />
          </td>

          {/* Status Column */}
          <td className="py-2 px-4">
            <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
          </td>

          {/* Profile Column */}
          <td className="py-2 px-4">
            <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
          </td>

          {/* Actions Column */}
          <td className="py-2 px-4">
            <Skeleton className="h-8 w-20 rounded-md bg-gray-200" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
