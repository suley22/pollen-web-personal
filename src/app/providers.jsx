"use client";

import { createContext, useContext } from "react";
import { JobSeekerRoutes } from "@/job-seeker/router";
import { AdminRoutes } from "@/admin/router";

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
  const session = user?.user || null;

  const email = session?.email || defaultValues.email;

  const metadata = session?.user_metadata || {};
  const firstName = metadata.first_name || "";
  const lastName = metadata.last_name || "";
  const avatarUrl = metadata?.avatar_url || defaultValues.avatar;
  const role = metadata?.role || defaultValues.role;
  const isAdmin = role === "admin";
  const isLogged = !!session;
  const redirectUrl = isLogged
    ? isAdmin
      ? AdminRoutes.home
      : JobSeekerRoutes.home
    : "/";

  const userData = {
    name: firstName + " " + lastName,
    email: email,
    avatar: avatarUrl,
    role: role,
    isAdmin: isAdmin,
    redirectUrl: redirectUrl,
    isLogged: isLogged,
  };

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
