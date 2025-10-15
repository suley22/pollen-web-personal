"use client";

import { Input, Select, CheckboxGroupField } from "@/components/design-system";
import { Building2, UploadIcon } from "lucide-react";
import { CompanyAvatar } from "@/components/ui/company-avatar";
import { FormCard } from "@/components/design-system/form-card";
import { PrimaryButton } from "@/components/ui/buttons/primary-button";
import { INDUSTRY_OPTIONS } from "@/lib/configs/constants/industries";
import { InputCheckboxGroup } from "@/ds/input-checkbox-group";

export function CompanyInformation({
  onIndustryValueChange,
  logoUrl,
  onLogoUrlChange,
  initialData = {},
}) {
  return (
    <FormCard
      title="Company Information"
      icon={<Building2 className="h-5 w-5" />}
    >
      <div className="space-y-6">
        {/* First Row: Avatar and Logo URL */}
        <div className="flex flex-row items-center gap-6">
          {/* Company Logo - Left Side */}
          <div className="flex-shrink-0">
            <CompanyAvatar
              logoUrl={logoUrl || initialData.logo_url}
              companyName={initialData.company_name || "Company"}
              size="xl"
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            {/* Company Name */}
            <Input
              label="Company Name"
              type="text"
              name="company_name"
              id="company_name"
              placeholder="Enter company name"
              defaultValue={initialData.company_name || ""}
            />

            {/* Company Logo URL - Right Side */}
            <div className="flex flex-row gap-4 items-end">
              <Input
                label="Company Logo"
                type="text"
                name="logo_url"
                id="logo_url"
                placeholder="Logo URL"
                value={logoUrl || initialData.logo_url || ""}
                onChange={(e) => onLogoUrlChange?.(e.target.value)}
              />
              <PrimaryButton
                type="button"
                icon={<UploadIcon />}
                text="Upload Logo"
                className="w-fit whitespace-nowrap h-9"
              />
            </div>
          </div>
        </div>

        {/* Second Row: Company Information Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Company Size */}
          <Select
            label="Company Size"
            name="company_size"
            id="company_size"
            placeholder="Select company size"
            defaultValue={initialData.company_size}
            options={[
              { value: "1-10", label: "1-10 employees" },
              { value: "11-50", label: "11-50 employees" },
              { value: "51-200", label: "51-200 employees" },
              { value: "201-500", label: "201-500 employees" },
              { value: "501-1000", label: "501-1000 employees" },
              { value: "1001+", label: "1001+ employees" },
            ]}
          />

          {/* Founded Year */}
          <Input
            label="Founded Year"
            type="text"
            name="founded_year"
            id="founded_year"
            placeholder="e.g., 2020"
            defaultValue={initialData.founded_year || ""}
          />

          {/* Location */}
          <Input
            label="Location"
            type="text"
            name="location"
            id="location"
            placeholder="City, State/Country"
            defaultValue={initialData.location || ""}
          />

          {/* Website */}
          <Input
            label="Website"
            name="website"
            id="website"
            placeholder="https://example.com"
            defaultValue={initialData.website || ""}
          />
        </div>
        {/* Industry */}
        <InputCheckboxGroup
          label="Industry"
          id="industries"
          name="industries"
          items={INDUSTRY_OPTIONS}
          initialSelectedItems={initialData.industries || []}
          onChange={onIndustryValueChange}
          allowCustomItems={true}
          customItemsPlaceholder="Add your custom industry and press Enter"
          columns={3}
        />
      </div>
    </FormCard>
  );
}
