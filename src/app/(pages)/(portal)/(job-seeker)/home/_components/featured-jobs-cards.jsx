import { JobCard } from "./job-card";
import { Skeleton } from "@/components/ui/skeleton";

export function FeatureJobCards({ jobs, loading, saveFavoriteJob }) {
  return loading ? (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`job-skeleton-${i}`}
          className="flex flex-col border rounded-lg p-3 gap-3"
        >
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-2/3 bg-gray-200" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-20 bg-gray-200" />
              <Skeleton className="h-3 w-16 bg-gray-200" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <Skeleton className="h-4 w-5/6 bg-gray-200" />
            <Skeleton className="h-4 w-1/2 bg-gray-200" />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <Skeleton className="h-3 w-1/3 bg-gray-200" />
            <Skeleton className="h-3 w-1/4 bg-gray-200" />
          </div>
          <div className="flex gap-2 pt-3 mt-3 border-t">
            <Skeleton className="h-9 flex-1 bg-gray-200" />
            <Skeleton className="h-9 w-10 bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-4">
      {jobs.map((job) => {
        return (
          <JobCard
            key={job.id}
            job={job}
            isSaved={job.isSaved}
            onToggleSave={() => saveFavoriteJob(job.id)}
          />
        );
      })}
    </div>
  );
}
