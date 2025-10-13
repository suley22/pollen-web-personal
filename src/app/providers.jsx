"use client";

import { createContext, useContext, useMemo } from "react";
import { JobSeekerRoutes } from "@/job-seeker/router";
import { AdminRoutes } from "@/admin/router";
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
    const isCheckingSession = user === undefined; // Checking if user data is still loading
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
  }, [user]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
