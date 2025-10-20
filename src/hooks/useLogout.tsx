"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/utils/supabase/client";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);

      console.log("🔴 LOGOUT INITIATED - Starting logout process");

      // Step 1: Clear Supabase session
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("🔴 Supabase logout error:", error);
      } else {
        console.log("🔴 Supabase session cleared successfully");
      }

      // Step 2: Clear all local storage and session storage
      console.log("🔴 Clearing local and session storage");
      localStorage.clear();
      sessionStorage.clear();

      // Step 3: Clear any cookies related to authentication
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie =
          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });

      // Step 4: Force a hard reload to landing page to ensure clean state
      console.log("🔴 Forcing page reload to landing page");
      window.location.href = "/";
    } catch (error) {
      console.error("🔴 Logout error:", error);
      setLoading(false);

      // Even if there's an error, try to redirect
      console.log("🔴 Fallback: redirecting to landing page");
      window.location.href = "/";
    }
  }, []);

  return { onLogout: handleLogout, isLogoutInProgress: loading };
};
