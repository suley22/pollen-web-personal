"use client";

import { useState, useRef, useEffect } from "react";
import { useActionState } from "react";
import { useToastNotifications } from "@/hooks/useToastNotifications";
import { useNavigation } from "@/hooks/useNavigation";
import { AdminRoutes } from "../../router";

/**
 * Custom hook to manage the create employer form state and logic
 */
export function useCreateEmployer(createCompanyAction) {
  const formRef = useRef(null);
  const { navigateTo, navigateWithDelay } = useNavigation();
  const { showSuccess, showError } = useToastNotifications();
  const lastProcessedState = useRef(null);

  // Form action state
  const [state, createCompany, isPending] = useActionState(
    createCompanyAction,
    null,
  );

  // Form field states
  const [checked, setChecked] = useState(false);
  const [accolades, setAccolades] = useState([]);
  const [customIndustries, setCustomIndustries] = useState([]);
  const [industryValue, setIndustryValue] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
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
      navigateWithDelay(AdminRoutes.employersView(state.companyId));
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
    createCompany,
    isPending,
    // Field states
    checked,
    setChecked,
    accolades,
    setAccolades,
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
