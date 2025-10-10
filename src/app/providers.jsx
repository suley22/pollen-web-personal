"use client";

import { createContext, useContext } from "react";

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
  const metadata = session?.user_metadata || {};
  const firstName = metadata.first_name || "";
  const lastName = metadata.last_name || "";
  const fullName = firstName + " " + lastName;

  const userData = {
    name: fullName,
    email: session?.email || defaultValues.email,
    avatar: session?.user_metadata?.avatar_url || defaultValues.avatar,
    role: session?.user_metadata?.role || defaultValues.role,
  };

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
