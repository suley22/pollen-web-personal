"use client";

import { useState, useEffect } from "react";
import { Input, Select, CheckboxGroupField } from "@/components/design-system";
import { Building2, UploadIcon } from "lucide-react";
import { CompanyAvatar } from "@/components/ui/company-avatar";
import { FormCard } from "@/components/design-system/form-card";
import { PrimaryButton } from "@/components/ui/buttons/primary-button";
import { FileSelector } from "@/components/ui/file-selector";
import { INDUSTRY_OPTIONS } from "@/lib/configs/constants/industries";
import { COMPANY_SIZE_OPTIONS } from "@/lib/configs/constants/company-size";
import { InputCheckboxGroup } from "@/ds/input-checkbox-group";

export function CompanyInformation({
  initialData = null,
  logoUrl,
  onLogoUrlChange,
  onIndustryValueChange,
  onFileSelect,
}) {
  // Estado para manejar la URL de previsualización temporal de la imagen
  const [previewUrl, setPreviewUrl] = useState(null);

  // Cleanup de URL blob cuando el componente se desmonta o cambia la previsualización
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
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
              logoUrl={previewUrl || logoUrl || initialData?.logo_url}
              companyName={initialData?.company_name || "?"}
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
              defaultValue={initialData?.company_name || ""}
            />

            {/* Company Logo URL - Right Side */}
            <div className="flex flex-row gap-4 items-end">
              <Input
                disabled={true}
                label="Company Logo"
                type="text"
                name="logo_url"
                id="logo_url"
                placeholder="Local file name"
                value={logoUrl || initialData?.logo_url || ""}
                onChange={(e) => {
                  // Limpiar previsualización cuando se cambia manualmente la URL
                  if (previewUrl && previewUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(null);
                  }
                  onLogoUrlChange?.(e.target.value);
                }}
              />
              <FileSelector
                onFileSelect={(file, fileName) => {
                  // Limpiar URL anterior si existe
                  if (previewUrl && previewUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(previewUrl);
                  }

                  // Crear URL temporal para previsualización
                  const newPreviewUrl = URL.createObjectURL(file);
                  setPreviewUrl(newPreviewUrl);

                  // Set only the filename in the input field
                  onLogoUrlChange?.(fileName);
                  // Notify parent about file selection for pending upload
                  onFileSelect?.("logo_url", file, fileName);
                }}
                buttonText="Upload Logo"
                buttonIcon={<UploadIcon />}
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
            defaultValue={initialData?.company_size}
            options={COMPANY_SIZE_OPTIONS}
          />

          {/* Founded Year */}
          <Input
            label="Founded Year"
            type="text"
            name="founded_year"
            id="founded_year"
            placeholder="e.g., 2020"
            defaultValue={initialData?.founded_year || ""}
          />

          {/* Location */}
          <Input
            label="Location"
            type="text"
            name="location"
            id="location"
            placeholder="City, State/Country"
            defaultValue={initialData?.company_location || ""}
          />

          {/* Website */}
          <Input
            label="Website"
            name="website"
            id="website"
            placeholder="https://example.com"
            defaultValue={initialData?.website_url || ""}
          />
        </div>

        {/* Industry */}
        <InputCheckboxGroup
          label="Industry"
          id="industries"
          name="industries"
          items={INDUSTRY_OPTIONS}
          initialSelectedItems={initialData?.industries || []}
          onChange={onIndustryValueChange}
          allowCustomItems={true}
          customItemsPlaceholder="Add your custom industry and press Enter"
          columns={3}
        />
      </div>
    </FormCard>
  );
}
