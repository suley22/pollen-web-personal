"use client";

import { useState, useRef, useEffect} from "react";
import { useActionState } from "react";
import { useToastNotifications } from "@/hooks/useToastNotifications";
import { useNavigation } from "@/hooks/useNavigation";
import { usePendingFileUpload } from "@/hooks/usePendingFileUpload";
import { AdminRoutes } from "../../router";
import { fetchEmployerById } from "../_services/employersService";

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
    clearPendingFiles,
    isUploading: isUploadingFiles,
  } = usePendingFileUpload();
  
  useEffect(() => {
      const loadProfile = async () => {
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
      };
  
      loadProfile();
    }, [id]);


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

  return {
    // Refs
    formRef,
    // Form state
    state,
    formAction,
    isPending: isPending || isUploadingFiles,
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
  };
}
