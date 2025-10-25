"use client";

import { useState, useRef, useEffect } from "react";
import { useToastNotifications } from "@/hooks/useToastNotifications";
import { useNavigation } from "@/hooks/useNavigation";
import { AdminRoutes } from "../../../router";
import { fetchEmployerById } from "../../_services/employers-service";
import { uploadFile } from "@/services/storageService";
import { getLoggedInUserId } from "@/services/userService";
import {
  updateEmployer,
  createEmployer,
} from "../../_services/employers-service";
import { useRouter } from "next/navigation";

/**
 * Custom hook to manage the employer form state and logic (create/edit)
 */
export function useEmployersPage({ id = null }) {
  const router = useRouter();
  const formRef = useRef(null);

  const { navigateTo } = useNavigation();
  const { showSuccess, showError } = useToastNotifications();
  const [isLoadingProfile, setIsLoadingProfile] = useState(!!id); // Start loading if ID exists
  const [employer, setEmployer] = useState(null);

  // Form field states - Initialize empty, update when employer loads
  const [checked, setChecked] = useState(false);
  const [customIndustries, setCustomIndustries] = useState([]);
  const [industryValue, setIndustryValue] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load employer profile on mount if ID exists
  useEffect(() => {
    if (!id) {
      setIsLoadingProfile(false);
      return;
    }

    let cancelled = false;

    const loadEmployerProfile = async () => {
      setIsLoadingProfile(true);

      try {
        const result = await fetchEmployerById(id);

        if (cancelled) return;

        if (result.error) {
          setEmployer(null);
        } else {
          setEmployer(result.data);
          // Update dependent states after data loads
          setLogoUrl(result.data?.logo_url || "");
          setCustomIndustries(result.data?.industries || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching employer profile:", error);
          setEmployer(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingProfile(false);
        }
      }
    };

    loadEmployerProfile();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Handle navigation
  const handleBack = () => {
    navigateTo(AdminRoutes.employers);
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

      const result = id
        ? await updateEmployer(id, formData, userId)
        : await createEmployer(formData, userId);

      router.push(AdminRoutes.employers);

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
    // Refs
    formRef,
    // Data
    employer,
    // Form state
    isLoadingProfile,
    // Field states
    checked,
    setChecked,
    customIndustries,
    setCustomIndustries,
    industryValue,
    setIndustryValue,
    logoUrl,
    setLogoUrl,
    isDialogOpen,
    setIsDialogOpen,
    // Handlers
    handleBack,
    handleSubmit: saveEmployer,
  };
}
