/**
 * Helper functions for displaying toast notifications
 */

/**
 * Show a success toast
 * @param {Function} toast - Toast function from useToast hook
 * @param {string} title - Toast title
 * @param {string} description - Toast description
 */
export function showSuccessToast(toast, title, description) {
  toast({
    title,
    description,
    variant: "success",
  });
}

/**
 * Show an error toast
 * @param {Function} toast - Toast function from useToast hook
 * @param {string} title - Toast title
 * @param {string} description - Toast description
 */
export function showErrorToast(toast, title, description) {
  toast({
    title,
    description,
    variant: "error",
  });
}

/**
 * Show an info toast
 * @param {Function} toast - Toast function from useToast hook
 * @param {string} title - Toast title
 * @param {string} description - Toast description
 */
export function showInfoToast(toast, title, description) {
  toast({
    title,
    description,
    variant: "info",
  });
}

/**
 * Show a warning toast
 * @param {Function} toast - Toast function from useToast hook
 * @param {string} title - Toast title
 * @param {string} description - Toast description
 */
export function showWarningToast(toast, title, description) {
  toast({
    title,
    description,
    variant: "warning",
  });
}

/**
 * Handle action state and show appropriate toast
 * @param {Object} state - Action state object
 * @param {Function} toast - Toast function from useToast hook
 * @param {Object} options - Configuration options
 * @param {string} options.successTitle - Title for success toast
 * @param {string} options.successMessage - Default message for success
 * @param {string} options.errorTitle - Title for error toast
 * @returns {boolean} - Returns true if state was handled
 */
export function handleActionStateToast(state, toast, options = {}) {
  const {
    successTitle = "Success!",
    successMessage = "Operation completed successfully",
    errorTitle = "Error",
  } = options;

  if (!state) {
    return false;
  }

  if (state.success) {
    showSuccessToast(toast, successTitle, state.message || successMessage);
    return true;
  }

  if (state.error) {
    showErrorToast(toast, errorTitle, state.error);
    return true;
  }

  return false;
}
