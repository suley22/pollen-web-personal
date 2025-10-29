import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton para la pestaña de descripción del trabajo
 * Muestra skeletons para Job Overview, Employment Details y las cards de descripción
 */
export function JobDescriptionSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Job Overview Cards Skeleton */}
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden py-6">
          <CardHeader className="pb-3 px-6">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 bg-gray-200" />
              <Skeleton className="h-6 w-40 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="px-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-5 w-full bg-gray-200" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden py-6">
          <CardHeader className="pb-3 px-6">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 bg-gray-200" />
              <Skeleton className="h-6 w-48 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="px-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-gray-200" />
                  <Skeleton className="h-5 w-full bg-gray-200" />
                </div>
              ))}
              <div className="col-span-2 space-y-2">
                <Skeleton className="h-4 w-48 bg-gray-200" />
                <Skeleton className="h-5 w-full bg-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description Cards Skeleton */}
      {[...Array(5)].map((_, i) => (
        <Card key={i} className="overflow-hidden py-6">
          <CardHeader className="pb-3 px-6">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 bg-gray-200" />
              <Skeleton className="h-6 w-56 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="px-6 space-y-3">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-5/6 bg-gray-200" />
            <Skeleton className="h-4 w-4/5 bg-gray-200" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * Skeleton para la pestaña de persona
 * Muestra skeleton para el cuestionario de persona del empleador
 */
export function JobPersonaSkeleton() {
  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5 bg-gray-200" />
          <Skeleton className="h-6 w-72 bg-gray-200" />
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col bg-blue-50 rounded-lg border border-blue-200 p-4 gap-3">
            <Skeleton className="h-6 w-48 bg-gray-200" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-3/4 bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-200" />
              <Skeleton className="h-4 w-5/6 bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-200" />
              <Skeleton className="h-4 w-4/5 bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-40 bg-gray-200" />
              <Skeleton className="h-4 w-5/6 bg-gray-200" />
            </div>
          </div>

          <div className="flex flex-col bg-gray-50 rounded-lg p-4 gap-3">
            <Skeleton className="h-6 w-48 bg-gray-200" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-5/6 bg-gray-200" />
              <Skeleton className="h-4 w-4/5 bg-gray-200" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton para la pestaña de assessment
 * Muestra skeletons para las cards de evaluación de habilidades
 */
export function JobAssessmentSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="overflow-hidden py-6">
          <CardHeader className="pb-3 px-6">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 bg-gray-200" />
              <Skeleton className="h-6 w-64 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="px-6 space-y-4">
            <div className="space-y-3">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex items-start gap-3">
                  <Skeleton className="h-4 w-4 shrink-0 bg-gray-200 rounded-full" />
                  <Skeleton className="h-4 w-full bg-gray-200" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
