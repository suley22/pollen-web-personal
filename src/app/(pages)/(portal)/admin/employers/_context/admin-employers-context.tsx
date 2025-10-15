"use client";

import { createContext, useContext, ReactNode } from "react";
import { useEmployersContext } from "@/app/(pages)/(portal)/admin/employers/_hooks/useEmployersContext";

type AdminEmployersContextType = ReturnType<typeof useEmployersContext>;

const AdminEmployersContext = createContext<
  AdminEmployersContextType | undefined
>(undefined);

export function AmdinEmployersProvider({ children }: { children: ReactNode }) {
  const employerManagement = useEmployersContext();

  return (
    <AdminEmployersContext.Provider value={employerManagement}>
      {children}
    </AdminEmployersContext.Provider>
  );
}

export function useEmployerManagementContext() {
  const context = useContext(AdminEmployersContext);
  if (context === undefined) {
    throw new Error(
      "useEmployerManagementContext must be used within an EmployerManagementProvider",
    );
  }
  return context;
}
