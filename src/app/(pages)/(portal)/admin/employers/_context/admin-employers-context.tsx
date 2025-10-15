"use client";

import { createContext, useContext, ReactNode } from "react";
import { useEmployerManagement } from "@/admin/employers/_hooks/useEmployerManagement";

type AdminEmployersContextType = ReturnType<typeof useEmployerManagement>;

const AdminEmployersContext = createContext<
  AdminEmployersContextType | undefined
>(undefined);

export function AmdinEmployersProvider({ children }: { children: ReactNode }) {
  const employerManagement = useEmployerManagement();

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
