import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EmployerProfileSkeleton() {
  return (
    <div className="flex flex-col w-full mx-auto py-6 gap-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-md bg-gray-200" />
          <Skeleton className="h-10 w-80 bg-gray-200" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24 bg-gray-200" />
          <Skeleton className="h-9 w-28 bg-gray-200" />
          <Skeleton className="h-9 w-24 bg-gray-200" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information Card */}
          <Card className="overflow-hidden py-6">
            <CardHeader className="pb-3 px-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 bg-gray-200" />
                <Skeleton className="h-6 w-48 bg-gray-200" />
              </div>
            </CardHeader>
            <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1" />
            <CardContent className="px-6 pt-4">
              <div className="flex flex-row gap-6">
                {/* Avatar */}
                <Skeleton className="h-48 w-48 rounded-md bg-gray-200" />

                {/* Info */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 bg-gray-200" />
                      <Skeleton className="h-6 w-full bg-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 bg-gray-200" />
                      <Skeleton className="h-6 w-full bg-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 bg-gray-200" />
                      <Skeleton className="h-6 w-full bg-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 bg-gray-200" />
                      <Skeleton className="h-6 w-full bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Company Card */}
          <Card className="overflow-hidden py-6">
            <CardHeader className="pb-3 px-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 bg-gray-200" />
                <Skeleton className="h-6 w-40 bg-gray-200" />
              </div>
            </CardHeader>
            <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1" />
            <CardContent className="px-6 pt-4 space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-3/4 bg-gray-200" />
            </CardContent>
          </Card>

          {/* Work Environment Card */}
          <Card className="overflow-hidden py-6">
            <CardHeader className="pb-3 px-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 bg-gray-200" />
                <Skeleton className="h-6 w-44 bg-gray-200" />
              </div>
            </CardHeader>
            <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1" />
            <CardContent className="px-6 pt-4 space-y-3">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
            </CardContent>
          </Card>

          {/* Additional Cards */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden py-6">
              <CardHeader className="pb-3 px-6">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-5 bg-gray-200" />
                  <Skeleton className="h-6 w-36 bg-gray-200" />
                </div>
              </CardHeader>
              <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1" />
              <CardContent className="px-6 pt-4 space-y-2">
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-5/6 bg-gray-200" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column - Contact & Meta Information */}
        <div className="space-y-6">
          {/* Contact Information Card */}
          <Card className="overflow-hidden py-6">
            <CardHeader className="pb-3 px-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 bg-gray-200" />
                <Skeleton className="h-6 w-40 bg-gray-200" />
              </div>
            </CardHeader>
            <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1" />
            <CardContent className="px-6 pt-4 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-5 w-full bg-gray-200" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-5 w-full bg-gray-200" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-5 w-full bg-gray-200" />
              </div>
            </CardContent>
          </Card>

          {/* Profile Status Card */}
          <Card className="overflow-hidden py-6">
            <CardHeader className="pb-3 px-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 bg-gray-200" />
                <Skeleton className="h-6 w-32 bg-gray-200" />
              </div>
            </CardHeader>
            <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1" />
            <CardContent className="px-6 pt-4 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-gray-200" />
                <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 bg-gray-200" />
                <Skeleton className="h-5 w-32 bg-gray-200" />
              </div>
            </CardContent>
          </Card>

          {/* Internal Pollen Data Card */}
          <Card className="overflow-hidden py-6">
            <CardHeader className="pb-3 px-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 bg-gray-200" />
                <Skeleton className="h-6 w-44 bg-gray-200" />
              </div>
            </CardHeader>
            <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1" />
            <CardContent className="px-6 pt-4 space-y-3">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-3/4 bg-gray-200" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Job Postings Section - Full Width */}
      <Card className="overflow-hidden py-6">
        <CardHeader className="pb-3 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 bg-gray-200" />
              <Skeleton className="h-6 w-32 bg-gray-200" />
            </div>
            <Skeleton className="h-9 w-28 bg-gray-200" />
          </div>
        </CardHeader>
        <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1" />
        <CardContent className="px-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="border rounded-lg p-4 bg-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-40 bg-gray-200" />
                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-3/4 bg-gray-200" />
                  </div>
                  <Skeleton className="h-3 w-32 bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
