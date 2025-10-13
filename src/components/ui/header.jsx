"use client";

import { NavUser } from "@/components/sidebar/nav-user";
import { useLogout } from "@/hooks/useLogout";
import { useUser } from "@/app/providers";
import { Loader } from "lucide-react";

export function Header() {
  const { onLogout, isLogoutInProgress } = useLogout();
  const user = useUser();

  return (
    <>
      <div className="bg-background sticky top-0 z-40 flex justify-end gap-2 border-b py-2 px-4  pl-2">
        <div className="flex items-center min-w-[150px]">
          {/* Show spinner while session is being checked to prevent flickering */}
          {!user || user.isCheckingSession || isLogoutInProgress ? (
            <div className="flex items-center justify-center h-12 px-3">
              <Loader className="animate-spin h-4 w-4" />
            </div>
          ) : (
            <NavUser onLogout={onLogout} />
          )}
        </div>
      </div>
    </>
  );
}
