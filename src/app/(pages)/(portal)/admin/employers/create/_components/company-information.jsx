"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Building2, UploadIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PrimaryButton } from "@/components/ui/buttons/primary-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { IndustryCategoriesSection } from "./industry-categories";
import { CustomIndustriesSection } from "./custom-industries-section";
import { Checkbox } from "@/components/ui/checkbox";

export function CompanyInformation({
  industryValue,
  onIndustryValueChange,
  customIndustries,
  onCustomIndustriesChange,
  showCustomIndustries,
  onShowCustomIndustriesChange,
  logoUrl,
  onLogoUrlChange,
  initialData = {},
}) {
  // Debug: Log the initial company size value
  console.log("CompanyInformation initialData:", initialData);
  console.log("Company size value:", initialData.company_size);

  return (
    <Card className="overflow-hidden py-6">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-md font-semibold flex items-center space-x-2">
          <Building2 className="h-5 w-5" />
          <span>Company Information</span>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-row w-full h-[1px] bg-gray-200 my-1 justify-center" />
      <CardContent className="px-6 pt-4">
        <div className="space-y-6">
          {/* First Row: Avatar and Logo URL */}
          <div className="flex flex-row items-center gap-6">
            {/* Company Logo - Left Side */}
            <div className="flex-shrink-0">
              <Avatar className="h-48 w-48">
                <AvatarImage
                  className="rounded-md"
                  src={logoUrl || ""}
                  alt="Company Logo"
                />
                <AvatarFallback className="bg-muted text-muted-foreground rounded-md">
                  <Building2 className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="w-full flex flex-col gap-3">
              <div className="flex-1">
                {/* Company Name */}
                <div className="col-span-2">
                  <Label
                    htmlFor="company_name"
                    className="text-sm font-medium text-gray-700 mb-1.5 block"
                  >
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    name="company_name"
                    id="company_name"
                    placeholder="Enter company name"
                    className="w-full"
                    defaultValue={initialData.company_name || ""}
                  />
                </div>
              </div>
              {/* Company Logo URL - Right Side */}
              <div className="flex-1">
                <Label
                  htmlFor="logo_url"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Company Logo
                </Label>

                <div className="flex flex-row gap-4">
                  <Input
                    type="text"
                    name="logo_url"
                    id="logo_url"
                    placeholder="Logo URL"
                    className="w-full"
                    value={logoUrl || initialData.logo_url || ""}
                    onChange={(e) => onLogoUrlChange?.(e.target.value)}
                  />
                  <PrimaryButton
                    type="button"
                    icon={<UploadIcon />}
                    text="Upload Logo"
                    className="w-fit"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Second Row: Company Information Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Company Size */}
            <div>
              <Label
                htmlFor="company_size"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Company Size
              </Label>
              <Select
                name="company_size"
                id="company_size"
                defaultValue={initialData.company_size || undefined}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="501-1000">501-1000 employees</SelectItem>
                  <SelectItem value="1001+">1001+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Founded Year */}
            <div>
              <Label
                htmlFor="founded_year"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Founded Year
              </Label>
              <Input
                type="text"
                name="founded_year"
                id="founded_year"
                placeholder="e.g., 2020"
                className="w-full"
                defaultValue={initialData.founded_year || ""}
              />
            </div>

            {/* Location */}
            <div>
              <Label
                htmlFor="location"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Location
              </Label>
              <Input
                type="text"
                name="location"
                id="location"
                placeholder="City, State/Country"
                className="w-full"
                defaultValue={initialData.location || ""}
              />
            </div>

            {/* Website */}
            <div>
              <Label
                htmlFor="website"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Website
              </Label>
              <Input
                name="website"
                id="website"
                placeholder="https://example.com"
                className="w-full"
                defaultValue={initialData.website || ""}
              />
            </div>
          </div>
          {/* Industry */}
          <div className="flex flex-col w-full gap-2">
            <Label
              htmlFor="industries"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Industry
            </Label>
            <IndustryCategoriesSection
              value={industryValue}
              onValueChange={onIndustryValueChange}
              initialSelectedIndustries={initialData.industries || []}
            />
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="custom_industry"
                checked={showCustomIndustries}
                onCheckedChange={onShowCustomIndustriesChange}
              />
              <Label
                htmlFor="custom_industry"
                className="text-sm font-normal text-gray-600 cursor-pointer"
              >
                Add custom industry
              </Label>
            </div>
            {/* Custom Industries */}
            {showCustomIndustries && (
              <CustomIndustriesSection
                customIndustries={customIndustries}
                setCustomIndustries={onCustomIndustriesChange}
                placeholder="Add your custom industry types and press Enter"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
