"use client";

import { useState, useRef, useEffect, startTransition } from "react";
import { useActionState } from "react";
import { useToastNotifications } from "@/hooks/useToastNotifications";
import { useNavigation } from "@/hooks/useNavigation";
import { usePendingFileUpload } from "@/hooks/usePendingFileUpload";
import { AdminRoutes } from "../../router";

/**
 * Custom hook to manage the employer form state and logic (create/edit)
 */
export function useEmployersPage({ action, employer = null }) {
  const formRef = useRef(null);
  const { navigateTo, navigateWithDelay } = useNavigation();
  const { showSuccess, showError } = useToastNotifications();
  const lastProcessedState = useRef(null);

  // Pending file uploads
  const {
    addPendingFile,
    uploadAllPendingFiles,
    hasPendingFiles,
    clearPendingFiles,
    isUploading: isUploadingFiles
  } = usePendingFileUpload();

  // Form action state
  const [state, formAction, isPending] = useActionState(action, null);

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

  // Handle action state changes
  useEffect(() => {
    // Skip if state hasn't changed or is null
    if (!state || state === lastProcessedState.current) {
      return;
    }

    lastProcessedState.current = state;

    if (state?.success) {
      showSuccess("Success!", state.message);
      clearPendingFiles(); // Clear pending files on success
      navigateWithDelay(AdminRoutes.employers);
    } else if (state?.error) {
      showError("Error", state.error);
      setIsDialogOpen(false);
    }
  }, [state, navigateWithDelay, showSuccess, showError, setIsDialogOpen, clearPendingFiles]);

  // Handle form submission with file uploads
  const handleSubmit = async () => {
    if (!formRef.current) return;

    // If there are pending files, upload them first
    if (hasPendingFiles()) {
      try {
        // Upload all pending files
        const uploadResults = await uploadAllPendingFiles("images", "employer_logo");
        
        // Update form with the uploaded URLs
        const formData = new FormData(formRef.current);
        
        // Replace filename with actual URL for each uploaded file
        Object.entries(uploadResults).forEach(([fieldName, url]) => {
          if (url) {
            formData.set(fieldName, url);
          }
        });

        // Create a new form with updated data and submit it
        const tempForm = document.createElement('form');
        tempForm.style.display = 'none';
        
        // Copy all form data to temp form
        for (const [key, value] of formData.entries()) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          tempForm.appendChild(input);
        }
        
        document.body.appendChild(tempForm);
        
        // Submit with the action
        const submitFormData = new FormData(tempForm);
        console.log("Debug: submitFormData type check:", {
          isFormData: submitFormData instanceof FormData,
          hasEntries: typeof submitFormData?.entries === 'function',
          entries: Array.from(submitFormData.entries())
        });
        startTransition(() => {
          formAction(submitFormData);
        });
        
        document.body.removeChild(tempForm);
        
      } catch (error) {
        showError("Upload Failed", "Failed to upload files. Please try again.");
        console.error("File upload error:", error);
      }
    } else {
      // No pending files, submit normally
      formRef.current.requestSubmit();
    }
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
    handleSubmit,
    handleFileSelect,
    // File upload state
    hasPendingFiles,
  };
}
