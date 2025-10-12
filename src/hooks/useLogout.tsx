"use client";

import { useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      console.log("Logging out...");

      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("There was a problem logging out. Please try again.");
      setLoading(false);
    }
  };

  return { onLogout: handleLogout, isLogoutInProgress: loading };
};
