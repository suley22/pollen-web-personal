"use client";

import { Button } from "@/components/ui/buttons/button";
import { Loader } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useUser } from "@/app/providers";
import { LoginRoutes } from "@/login/router";
import { useCallback, memo } from "react";
import Link from "next/link";
import NextImage from "next/image";

export const LoginStatusButton = memo(() => {
  const user = useUser();

  const onClick = useCallback(() => {
    // Use window.location for faster navigation
    const targetUrl = user?.redirectUrl || LoginRoutes.login;
    window.location.href = targetUrl;
  }, [user?.redirectUrl]);

  // Show nothing while session is being checked to prevent flickering
  if (!user || user.isCheckingSession) {
    return (
      <div className="flex flex-row items-center min-w-[150px]">
        <Loader className="animate-spin h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center min-w-[150px]">
      {/* Show login button when user is not logged in */}
      {!user.isLogged && (
        <Button
          onClick={onClick}
          className="bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50"
          size="sm"
          variant="solid"
        >
          Login
        </Button>
      )}

      {/* Show avatar and user info when user is logged in */}
      {user.isLogged && (
        <Link
          href={user.redirectUrl}
          className="flex flex-row gap-2 cursor-pointer"
        >
          <div className="h-8 w-8 rounded-lg">
            <NextImage
              src={user.avatar}
              alt={user.name}
              width={32}
              height={32}
              className="rounded-lg object-cover"
              priority
            />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </Link>
      )}
    </div>
  );
});
