"use client";

import { useState, useRef, useEffect } from "react";
import { useActionState } from "react";
import { useToastNotifications } from "@/hooks/useToastNotifications";
import { useNavigation } from "@/hooks/useNavigation";
import { AdminRoutes } from "../../router";

/**
 * Custom hook to manage the employer form state and logic (create/edit)
 */
export function useEmployersPage({ action, employer = null }) {
  const formRef = useRef(null);
  const { navigateTo, navigateWithDelay } = useNavigation();
  const { showSuccess, showError } = useToastNotifications();
  const lastProcessedState = useRef(null);

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

  // Handle action state changes
  useEffect(() => {
    // Skip if state hasn't changed or is null
    if (!state || state === lastProcessedState.current) {
      return;
    }

    lastProcessedState.current = state;

    if (state?.success) {
      showSuccess("Success!", state.message);
      navigateWithDelay(AdminRoutes.employers);
    } else if (state?.error) {
      showError("Error", state.error);
      setIsDialogOpen(false);
    }
  }, [state, navigateWithDelay, showSuccess, showError, setIsDialogOpen]);

  // Handle form submission
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return {
    // Refs
    formRef,
    // Form state
    state,
    formAction,
    isPending,
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
  };
}
