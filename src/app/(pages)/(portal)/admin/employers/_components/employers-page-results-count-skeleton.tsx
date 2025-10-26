import { Skeleton } from "@/components/ui/skeleton";

export function ResultsCountSkeleton() {
  // Simula la paginación con un rectángulo largo y algunos círculos para los botones
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-32 bg-gray-200 rounded" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
        <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
        <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
