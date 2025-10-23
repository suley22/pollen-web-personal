"use client";

import { useState, useRef, useEffect, useCallback} from "react";
import { useActionState } from "react";
import { useToastNotifications } from "@/hooks/useToastNotifications";
import { useNavigation } from "@/hooks/useNavigation";
import { usePendingFileUpload } from "@/hooks/usePendingFileUpload";
import { AdminRoutes } from "../../router";
import { fetchEmployerById } from "../_services/employersService";
import { createStorageService } from "@/services/storageService";
import { createEmployerService } from "@/services/employerService";
import { createUserService } from "@/services/userService";

/**
 * Custom hook to manage the employer form state and logic (create/edit)
 */
export function useEmployersPage({ id = null}) {
  const formRef = useRef(null);
  const { navigateTo, navigateWithDelay } = useNavigation();
  const { showSuccess, showError } = useToastNotifications();
  const lastProcessedState = useRef(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [employer, setEmployer] = useState(null);

  // Pending file uploads
  const {
    addPendingFile,
    hasPendingFiles,
    isUploading: isUploadingFiles,
  } = usePendingFileUpload();

  const loadProfile = useCallback(async () => {
    console.log("Loading employer profile for ID:", id);
        if (id) {
          setIsLoadingProfile(true);
          try {
            const result = await fetchEmployerById(id);
            setEmployer(result.error ? null : result.data);
          } catch (error) {
            console.error("Error fetching jobs:", error);
            setEmployer(null);
          } finally {
            setIsLoadingProfile(false);
          }
        } else {
          setIsLoadingProfile(false);
        }
      }, [id]);
  
  useEffect(() => {
      loadProfile();
    }, [loadProfile]);

    

  // Form field states - Initialize with employer data if in edit mode
  const [checked, setChecked] = useState(false);
  const [customIndustries, setCustomIndustries] = useState(() => {
    if (employer?.industries) {
      return employer.industries;
    }
    return [];
  });
  const [industryValue, setIndustryValue] = useState("");
  const [logoUrl, setLogoUrl] = useState(() => employer?.logo_url || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle navigation
  const handleBack = () => {
    navigateTo(AdminRoutes.employers);
  };

  // Handle file selection
  const handleFileSelect = (fieldName, file, fileName) => {
    addPendingFile(fieldName, file, fileName);
  };

  const updateEmployerAction = async (
    id: string,
    prevState: any,
    formData: FormData,
  ) => {
    try {
      
      const imageFieldName = "logo_url";
      const logoUrl = await getImageUrl(formData, imageFieldName);
      formData.set(imageFieldName, logoUrl);
      // Get current user
      const userService = await createUserService();
      const userId = await userService.getLoggedInUserId();
  
      if (!userId) {
        console.error("No authenticated user found");
        return { error: "User not authenticated" };
      }
  
      // Use EmployerService to update the employer
      const employerService = await createEmployerService();
      const result = await employerService.updateEmployer(id, formData, userId);
  
      return result;
    } catch (error) {
      console.error("Action: Unexpected error updating company:", error);
      return {
        success: false,
        error: "Failed to update company profile",
      };
    }
  }

  const createEmployerAction = async (prevState: any, formData: FormData) => {
    try {
  
      const imageFieldName = "logo_url";
      const logoUrl = await getImageUrl(formData, imageFieldName);
      formData.set(imageFieldName, logoUrl);
  
      // Get current user
      const userService = await createUserService();
      const userId = await userService.getLoggedInUserId();
  
      if (!userId) {
        console.error("No authenticated user found");
        return { error: "User not authenticated" };
      }
  
      // Use EmployerService to create the employer
      const employerService = await createEmployerService();
      const result = await employerService.createEmployer(formData, userId);
  
      return result;
    } catch (error) {
      console.error("Action: Unexpected error creating company:", error);
      return {
        success: false,
        error: "Failed to create company profile",
      };
    }
  }

  const getImageUrl = async (formData: FormData, imageFieldName: string) => {
    const file = formData.get(imageFieldName);
    const bucketName = "images";
    const folder = "employer_logo";
    
    if (file && file instanceof File && file.size > 0) {
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return {
          success: false,
          error: "Invalid file type. Please upload an image file."
        };
      }

      const storageService = await createStorageService();
      const publicUrl = await storageService.uploadFile(file, bucketName, folder);

      console.log("Image uploaded successfully to:", publicUrl);
      return publicUrl;
    } else {
      console.log("No valid file found");
      return null;
    }
}

  return {
    // Refs
    formRef,
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
    handleFileSelect,
    // File upload state
    hasPendingFiles,
    updateEmployerAction,
    createEmployerAction,
  };
}
