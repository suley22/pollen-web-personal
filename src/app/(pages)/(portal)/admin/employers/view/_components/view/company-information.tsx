"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InfoField } from "./info-field";

export function CompanyInformation({ company }) {
  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2 ">
          <Building2 className="h-5 w-5" />
          <span className="">Company Information</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1  justify-center" />
      <CardContent className="px-6 pt-4">
        <div className="flex flex-row">
          {/* Company Logo - Left Side (Full Height) */}
          <div className="flex flex-col justify-center pr-6">
            <Avatar className="h-48 w-48">
              <AvatarImage
                className="rounded-md"
                src={company.logo}
                alt={company.company_name}
              />
              <AvatarFallback className="bg-muted text-muted-foreground">
                <Building2 className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Company Information - Right Side (Two Columns) */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Industry */}
              <InfoField
                label="Industry"
                value={
                  company.industries.length > 0
                    ? company.industries.map((industry) => (
                        <Badge key={industry} variant="outline">
                          {industry}
                        </Badge>
                      ))
                    : "Not specified"
                }
              />

              {/* Company Size */}
              <InfoField label="Company Size" value={company.size} />

              {/* Location */}
              <InfoField
                label="Location"
                value={company.location}
                icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
              />

              {/* Founded */}
              <InfoField label="Founded" value={company.foundedYear} />

              {/* Website */}
              <InfoField
                label="Website"
                value={
                  company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate"
                    >
                      {company.website}
                    </a>
                  ) : null
                }
                icon={
                  company.website ? (
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  ) : undefined
                }
                className="col-span-2"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
