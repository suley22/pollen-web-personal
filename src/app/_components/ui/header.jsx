"use client";

import { NavUser } from "@/app/components/sidebar/nav-user";
import { useLogout } from "@/app/_lib/hooks/useLogout";

export function Header() {
  const { onLogout, isLogoutInProgress } = useLogout();

  return (
    <>
      <div className="bg-background sticky top-0 z-40 flex justify-end gap-2 border-b py-2 px-4  pl-2">
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
