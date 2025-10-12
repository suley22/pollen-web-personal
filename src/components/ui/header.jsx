"use client";

import { NavUser } from "@/components/sidebar/nav-user";
import { useLogout } from "@/app/hooks/useLogout";
import { SidebarTrigger } from "@/components/sidebar/sidebar";

export function Header() {
  const { onLogout, isLogoutInProgress } = useLogout();

  return (
    <>
      <div className="bg-background sticky top-0 z-40 flex justify-between md:justify-end gap-2 border-b py-2 px-4  pl-2">
        <div className="md:hidden flex items-center">
          <SidebarTrigger />
        </div>
        <div className="flex items-center">
          {isLogoutInProgress ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              <span className="ml-2 text-sm">Cargando...</span>
            </div>
          ) : (
            <NavUser onLogout={onLogout} />
          )}
        </div>
      </div>
    </>
  );
}
