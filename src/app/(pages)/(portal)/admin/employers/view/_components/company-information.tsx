"use client";

import { FormCard } from "@/components/design-system/form-card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Globe } from "lucide-react";
import { CompanyAvatar } from "@/components/ui/company-avatar";
import { InfoField } from "@/components/design-system/info-field";
import { UrlHelper } from "@/helpers/url-helper";

export function CompanyInformation({ company }) {
  return (
    <FormCard
      title="Company Information"
      icon={<Building2 className="h-5 w-5" />}
    >
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
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Location */}
          <InfoField
            label="Location"
            value={company.company_location}
            icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
          />
          {/* Company Size */}
          <InfoField label="Company Size" value={company.company_size} />

          {/* Website */}
          <InfoField
            label="Website"
            value={
              company.website_url ? (
                <div className="flex">
                  <a
                    href={UrlHelper.formatUrl(company.website_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate"
                  >
                    {company.website_url.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              ) : null
            }
            icon={
              company.website_url ? (
                <Globe className="h-4 w-4 text-muted-foreground" />
              ) : undefined
            }
          />

          {/* Founded */}
          <InfoField label="Founded" value={company.founded_year} />

          {/* Industry */}
          <InfoField
            label="Industry"
            className="col-span-2"
            value={
              <div className="flex flex-wrap gap-2">
                {company.industries.length > 0
                  ? company.industries.map((industry) => (
                      <Badge
                        key={industry}
                        variant="outline"
                        className="flex flex-wrap"
                      >
                        {industry}
                      </Badge>
                    ))
                  : "Not specified"}
              </div>
            }
          />
        </div>
      </div>
    </FormCard>
  );
}
