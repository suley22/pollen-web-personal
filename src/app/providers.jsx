"use client";

import { createContext, useContext } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function Providers({ children, user }) {
  const session = user?.user || null;

  const userData = {
    name: session?.user_metadata?.full_name || "Guest User",
    email: session?.email || "",
    avatar:
      session?.user_metadata?.avatar_url ||
      "https://www.gravatar.com/avatar/?d=mp",
  };

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
