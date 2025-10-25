"use client";

import { useState, useEffect, useRef } from "react";
import { Input, Select } from "@/components/design-system";
import { Building2, UploadIcon } from "lucide-react";
import { CompanyAvatar } from "@/components/ui/company-avatar";
import { FormCard } from "@/components/design-system/form-card";
import { FileSelector } from "@/components/ui/file-selector";
import { INDUSTRY_OPTIONS } from "@/lib/configs/constants/industries";
import { COMPANY_SIZE_OPTIONS } from "@/lib/configs/constants/company-size";
import { InputCheckboxGroup } from "@/ds/input-checkbox-group";

export function CompanyInformation({
  initialData = null,
  logoUrl,
  onLogoUrlChange,
}) {
  // Estado para manejar la URL de previsualización temporal de la imagen
  const [previewUrl, setPreviewUrl] = useState(null);
  // Ref para el input file hidden
  const hiddenFileInputRef = useRef(null);

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
                readOnly={true}
                label="Company Logo"
                type="text"
                name="logo_url"
                id="logo_url"
                placeholder="No logo selected"
                value={logoUrl || initialData?.logo_url || ""}
                className="cursor-not-allowed bg-gray-50"
              />

              <FileSelector
                name="file_selector_logo"
                onFileSelect={(file, fileName) => {
                  // Validar tamaño de archivo (máximo 5MB)
                  const maxSize = 5 * 1024 * 1024; // 5MB
                  if (file.size > maxSize) {
                    alert(
                      `El archivo es demasiado grande. Máximo permitido: 5MB. Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
                    );
                    return;
                  }

                  // Limpiar URL anterior si existe
                  if (previewUrl && previewUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(previewUrl);
                  }

                  // Crear URL temporal para previsualización
                  const newPreviewUrl = URL.createObjectURL(file);
                  setPreviewUrl(newPreviewUrl);

                  // CLAVE: Asignar el archivo al input hidden usando DataTransfer API
                  if (hiddenFileInputRef.current) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    hiddenFileInputRef.current.files = dataTransfer.files;
                  } else {
                    console.error("Hidden file input ref is not available!");
                  }

                  // Set only the filename in the input field for display
                  console.log("🔍 DEBUG: Actualizando logo_url en form:", {
                    fileName,
                    fileSize: file.size,
                    fileType: file.type,
                    hiddenInputHasFiles:
                      hiddenFileInputRef.current?.files?.length || 0,
                    currentLogoUrl: logoUrl,
                  });
                  onLogoUrlChange?.(fileName);

                  // NO usar pending files - el archivo se envía directamente via input hidden
                  // onFileSelect?.("logo_url", file, fileName);
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
            defaultValue={initialData?.company_size?.trim()}
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
          allowCustomItems={true}
          customItemsPlaceholder="Add your custom industry and press Enter"
          columns={3}
        />

        {/* Hidden file input to send the actual file in FormData */}
        <input
          ref={hiddenFileInputRef}
          type="file"
          name="logo_url_file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={() => {
            console.log("🔍 DEBUG: Hidden file input changed:", {
              filesCount: hiddenFileInputRef.current?.files?.length || 0,
              fileName: hiddenFileInputRef.current?.files?.[0]?.name || "none",
            });
          }}
        />
      </div>
    </FormCard>
  );
}
