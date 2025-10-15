"use client";

import { useToast as useBaseToast } from "@/lib/hooks/use-toast";

/**
 * Custom hook for showing toast notifications with simplified API
 */
export function useToastNotifications() {
  const { toast } = useBaseToast();

  /**
   * Show a success toast
   * @param {string} title - Toast title
   * @param {string} description - Toast description
   */
  const showSuccess = (title, description) => {
    toast({
      title,
      description,
      variant: "success",
    });
  };

  /**
   * Show an error toast
   * @param {string} title - Toast title
   * @param {string} description - Toast description
   */
  const showError = (title, description) => {
    toast({
      title,
      description,
      variant: "error",
    });
  };

  /**
   * Show an info toast
   * @param {string} title - Toast title
   * @param {string} description - Toast description
   */
  const showInfo = (title, description) => {
    toast({
      title,
      description,
      variant: "info",
    });
  };

  /**
   * Show a warning toast
   * @param {string} title - Toast title
   * @param {string} description - Toast description
   */
  const showWarning = (title, description) => {
    toast({
      title,
      description,
      variant: "warning",
    });
  };

  /**
   * Handle action state and show appropriate toast
   * @param {Object} state - Action state object
   * @param {Object} options - Configuration options
   * @param {string} options.successTitle - Title for success toast
   * @param {string} options.successMessage - Default message for success
   * @param {string} options.errorTitle - Title for error toast
   * @returns {boolean} - Returns true if state was handled
   */
  const handleActionState = (state, options = {}) => {
    const {
      successTitle = "Success!",
      successMessage = "Operation completed successfully",
      errorTitle = "Error",
    } = options;

    if (!state) {
      return false;
    }

    if (state.success) {
      showSuccess(successTitle, state.message || successMessage);
      return true;
    }

    if (state.error) {
      showError(errorTitle, state.error);
      return true;
    }

    return false;
  };

  return {
    toast, // Original toast function for custom use
    showSuccess,
    showError,
    showInfo,
    showWarning,
    handleActionState,
  };
}
