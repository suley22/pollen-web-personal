"use client";

import { useRef, useState } from "react";
import { PrimaryButton } from "@/components/ui/buttons/primary-button";
import { UploadIcon } from "lucide-react";

/**
 * File selector component that only sets the filename without uploading
 */
export function FileSelector({
  onFileSelect,
  acceptedTypes = "image/*",
  buttonText = "Select File",
  buttonIcon = <UploadIcon />,
  className = "",
  disabled = false,
  ...props
}) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const validateImageFile = (file) => {
    if (!file) return "No file selected";

    // Check file type
    if (!file.type.startsWith("image/")) {
      return "File must be an image";
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    // Check file extension
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(`.${ext}`),
    );

    if (!hasValidExtension) {
      return `File must have one of these extensions: ${allowedExtensions.join(", ")}`;
    }

    return null; // No errors
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate the file
    const validationError = validateImageFile(file);
    if (validationError) {
      alert(validationError); // You might want to use a better error display
      return;
    }

    setSelectedFile(file);

    // Call the callback with the file object and filename
    if (onFileSelect) {
      onFileSelect(file, file.name);
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
        {...props}
      />

      <PrimaryButton
        type="button"
        icon={buttonIcon}
        text={buttonText}
        onClick={handleFileSelect}
        disabled={disabled}
        className={className}
      />
    </>
  );
}
