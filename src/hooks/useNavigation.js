"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Custom hook for navigation with common patterns
 */
export function useNavigation() {
  const router = useRouter();

  /**
   * Navigate to a specific route
   * @param {string} route - The route to navigate to
   */
  const navigateTo = useCallback(
    (route) => {
      router.push(route);
    },
    [router],
  );

  /**
   * Navigate back to previous page
   */
  const navigateBack = useCallback(() => {
    router.back();
  }, [router]);

  /**
   * Navigate with a delay (useful for showing toast before redirect)
   * @param {string} route - The route to navigate to
   * @param {number} delay - Delay in milliseconds (default: 1500)
   * @returns {number} - setTimeout ID that can be cleared if needed
   */
  const navigateWithDelay = useCallback(
    (route, delay = 1500) => {
      return setTimeout(() => {
        router.push(route);
      }, delay);
    },
    [router],
  );

  /**
   * Replace current route (no history entry)
   * @param {string} route - The route to replace with
   */
  const replaceRoute = useCallback(
    (route) => {
      router.replace(route);
    },
    [router],
  );

  /**
   * Refresh the current page
   */
  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  return {
    navigateTo,
    navigateBack,
    navigateWithDelay,
    replaceRoute,
    refresh,
    router, // Original router for custom use
  };
}
