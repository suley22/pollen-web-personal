"use client";

import { useRef } from "react";
import { PrimaryButton } from "@/components/ui/buttons/primary-button";
import { UploadIcon, Loader2 } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";

/**
 * File picker component for uploading images
 */
export function ImageUploader({ 
  onUploadComplete, 
  acceptedTypes = "image/*",
  buttonText = "Upload Image",
  buttonIcon = <UploadIcon />,
  bucketName = "company-logos",
  folder = "logos",
  className = "",
  disabled = false 
}) {
  const fileInputRef = useRef(null);
  const { uploadFile, isUploading } = useFileUpload();

  const handleFileSelect = () => {
    if (disabled || isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const uploadedUrl = await uploadFile(file, bucketName, folder);
    
    if (uploadedUrl && onUploadComplete) {
      onUploadComplete(uploadedUrl);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileChange}
        className="hidden"
      />
      
      <PrimaryButton
        type="button"
        icon={isUploading ? <Loader2 className="animate-spin" /> : buttonIcon}
        text={isUploading ? "Uploading..." : buttonText}
        onClick={handleFileSelect}
        disabled={disabled || isUploading}
        className={className}
      />
    </>
  );
}