"use client";

import { createContext, useContext, ReactNode } from "react";
import { useEmployerManagement } from "@/admin/employers/_hooks/useEmployerManagement";

type EmployerManagementContextType = ReturnType<typeof useEmployerManagement>;

const EmployerManagementContext = createContext<
  EmployerManagementContextType | undefined
>(undefined);

export function EmployerManagementProvider({
  children,
}: {
  children: ReactNode;
}) {
  const employerManagement = useEmployerManagement();

  return (
    <EmployerManagementContext.Provider value={employerManagement}>
      {children}
    </EmployerManagementContext.Provider>
  );
}

export function useEmployerManagementContext() {
  const context = useContext(EmployerManagementContext);
  if (context === undefined) {
    throw new Error(
      "useEmployerManagementContext must be used within an EmployerManagementProvider",
    );
  }
  return context;
}
