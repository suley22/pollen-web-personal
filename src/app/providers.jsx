"use client";

import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { JobSeekerRoutes } from "./(pages)/(portal)/(job-seeker)/router";
import { AdminRoutes } from "./(pages)/(portal)/admin/router";
import { LoginRoutes } from "./(pages)/login/router";

const UserContext = createContext();

const defaultValues = {
  name: "Guest User",
  email: "",
  avatar: "https://www.gravatar.com/avatar/?d=mp",
  role: "job_seeker",
};

export function useUser() {
  return useContext(UserContext);
}

export function Providers({ children, user }) {
  // Internal state to manage initial loading and prevent avatar flickering
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Effect to handle the initial load state
  useEffect(() => {
    // Only set initial load to false once we have determined user state
    if (user !== undefined) {
      // Small delay to ensure smooth transition without flickering
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const userData = useMemo(() => {
    const session = user?.user || null;
    const email = session?.email || defaultValues.email;
    const metadata = session?.user_metadata || {};
    const firstName = metadata.first_name || "";
    const lastName = metadata.last_name || "";
    const avatarUrl = metadata?.avatar_url || defaultValues.avatar;
    const role = metadata?.role || defaultValues.role;
    const isAdmin = role === "admin";
    const isLogged = !!session;
    // Use internal state for better control over loading states
    const isCheckingSession = user === undefined || isInitialLoad;
    const redirectUrl = isLogged
      ? isAdmin
        ? AdminRoutes.home
        : JobSeekerRoutes.home
      : LoginRoutes.login;

    return {
      name: firstName + " " + lastName,
      email: email,
      avatar: avatarUrl,
      role: role,
      isAdmin: isAdmin,
      redirectUrl: redirectUrl,
      isLogged: isLogged,
      isCheckingSession: isCheckingSession,
    };
  }, [user, isInitialLoad]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={userData}>{children}</UserContext.Provider>
    </QueryClientProvider>
  );
}
