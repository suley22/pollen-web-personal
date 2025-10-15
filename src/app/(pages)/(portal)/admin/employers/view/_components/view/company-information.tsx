"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Globe } from "lucide-react";
import { CompanyAvatar } from "@/components/ui/company-avatar";
import { InfoField } from "./info-field";
import { UrlHelper } from "@/helpers/url-helper";

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
            <CompanyAvatar
              logoUrl={company.logo_url}
              companyName={company.company_name}
              size="xl"
            />
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
                value={company.company_location}
                icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
              />

              {/* Founded */}
              <InfoField label="Founded" value={company.founded_year} />

              {/* Website */}
              <InfoField
                label="Website"
                value={
                  company.website_url ? (
                    <a
                      href={UrlHelper.formatUrl(company.website_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate"
                    >
                      {company.website_url.replace(/^https?:\/\//, "")}
                    </a>
                  ) : null
                }
                icon={
                  company.website_url ? (
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
