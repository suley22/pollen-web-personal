"use client";

import { useState, useRef, useEffect } from "react";
import {
  useEmployer,
  useCreateEmployer,
  useUpdateEmployer,
} from "../../_hooks/use-employers-query";
import { uploadFile } from "@/services/storageService";
import { getLoggedInUserId } from "@/services/userService";
import { useRouter } from "next/navigation";

/**
 * Custom hook to manage the employer form state and logic (create/edit)
 */
export function useEmployersPage({ id = null }) {
  const router = useRouter();
  const formRef = useRef(null);

  // Use React Query hooks
  const { data: employer, isLoading: isLoadingProfile } = useEmployer(id || "");
  const createMutation = useCreateEmployer();
  const updateMutation = useUpdateEmployer();

  const [logoUrl, setLogoUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Update logoUrl when employer data loads
  useEffect(() => {
    if (employer?.logo_url) {
      setLogoUrl(employer.logo_url);
    }
  }, [employer]);

  // Handle navigation
  const handleBack = () => {
    router.back();
  };

  const saveEmployer = async () => {
    try {
      const formData = new FormData(formRef.current);

      formData.set("logo_url", await getImageUrl(formData));

      const userId = await getLoggedInUserId();

      if (!userId) {
        console.error("No authenticated user found");
        return { error: "User not authenticated" };
      }

      // Use mutations instead of direct service calls
      const result = id
        ? await updateMutation.mutateAsync({ id, formData, userId })
        : await createMutation.mutateAsync({ formData, userId });

      // Go back after successful save
      router.back();

      return result;
    } catch (error) {
      console.error("Action: Unexpected error updating company:", error);
      return {
        success: false,
        error: "Failed to update company profile",
      };
    }
  };

  const getImageUrl = async (formData) => {
    const imageFileUrl = formData.get("logo_url");

    if (imageFileUrl && imageFileUrl.startsWith("http")) {
      return formData.get("logo_url") || "";
    }

    const imageFile = formData.get("logo_url_file");
    const file = imageFile instanceof File ? imageFile : null;

    const bucketName = "images";
    const folder = "employer_logo";

    if (file && file instanceof File && file.size > 0) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return "";
      }

      const publicUrl = await uploadFile(file, bucketName, folder);

      console.log("Image uploaded successfully to:", publicUrl);
      return publicUrl;
    } else {
      console.log("No valid file found");
      return "";
    }
  };

  return {
    formRef,
    employer,
    isLoadingProfile:
      isLoadingProfile || createMutation.isPending || updateMutation.isPending,
    logoUrl,
    setLogoUrl,
    isDialogOpen,
    setIsDialogOpen,
    handleBack,
    handleSubmit: saveEmployer,
  };
}
