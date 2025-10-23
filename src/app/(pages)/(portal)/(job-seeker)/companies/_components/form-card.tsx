import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useCompanies } from "../_hooks/useCompanies";
import { PrimaryButton } from "@/components/design-system/primary-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { JobSeekerRoutes } from "../../router";
import { Skeleton } from "@/components/ui/skeleton";

export function RecommendedCompaniesFormCard() {
  const { companies, loading } = useCompanies();
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Card
              key={`company-skeleton-${i}`}
              className="border-blue-200 bg-white/80"
            >
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-16 w-16 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-40 bg-gray-200" />
                    <Skeleton className="h-3 w-24 bg-gray-200" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-5/6 bg-gray-200" />
                  <Skeleton className="h-4 w-2/3 bg-gray-200" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-9 w-28 bg-gray-200" />
                </div>
              </CardContent>
            </Card>
          ))
        : companies.map((company) => (
            <Card key={company.id} className="border-blue-200 bg-white/80">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      className=""
                      src={company.logo}
                      alt={company.name}
                    />
                    <AvatarFallback className="">
                      <Building2 className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-xl">{company.name}</div>
                    <p className="font-poppins text-sm text-gray-600">
                      {company.industry}
                    </p>
                  </div>
                </div>
                <p
                  className="text-sm text-gray-700"
                  style={{ fontFamily: "Poppins" }}
                >
                  {company.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-semibold text-green-600 uppercase"
                    style={{
                      fontFamily: "Sora",
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {company.openRoles} OPEN ROLES
                  </span>
                  <PrimaryButton
                    className=""
                    text="View Details"
                    onClick={() =>
                      router.push(`/main/companies/review/${company.id}`)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  );
}

export function AllCompaniesFormCard() {
  const { companies, loading } = useCompanies();
  const router = useRouter();

  return (
    <>
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={`all-company-skeleton-${i}`}
              className="flex p-4 gap-6 justify-between"
            >
              <CardHeader className="">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Skeleton className="h-16 w-16 rounded-full bg-gray-200" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <Skeleton className="h-5 w-40 bg-gray-200" />
                    <Skeleton className="h-3 w-24 bg-gray-200" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="">
                <div className="ml-1 space-y-2 mb-3">
                  <Skeleton className="h-4 w-28 bg-gray-200" />
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-4 w-32 bg-gray-200" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-32 bg-gray-200" />
                </div>
              </CardContent>
            </Card>
          ))
        : companies.map((company) => (
            <Card
              key={company.id}
              className="flex p-4 gap-6 justify-between hover:shadow-lg transition-shadow"
            >
              <CardHeader className="">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      className=""
                      src={company.logo}
                      alt={company.name}
                    />
                    <AvatarFallback className="">
                      <Building2 className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle
                      className="text-base sm:text-lg font-bold"
                      style={{ fontFamily: "Sora" }}
                    >
                      {company.name}
                    </CardTitle>
                    <p
                      className="text-xs sm:text-sm text-gray-600"
                      style={{ fontFamily: "Poppins" }}
                    >
                      {company.industry}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="">
                <div className="ml-1 space-y-2 mb-3">
                  <div
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                    style={{ fontFamily: "Poppins" }}
                  >
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{company.location}</span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                    style={{ fontFamily: "Poppins" }}
                  >
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{company.size}</span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                    style={{ fontFamily: "Poppins" }}
                  >
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                    <span>{company.openRoles} open roles</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="default"
                    className="flex-1 text-xs sm:text-sm"
                    variant="outline"
                    style={{ fontFamily: "Sora" }}
                    onClick={() => {
                      router.push(JobSeekerRoutes.companyView(company.id));
                    }}
                  >
                    View Company
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
    </>
  );
}
