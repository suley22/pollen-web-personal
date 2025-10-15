"use client";

import { Button } from "@/components/ui/buttons/button";
import { LayoutTemplate, Loader } from "lucide-react";
import { useUser } from "@/app/providers";
import { LoginRoutes } from "@/public/router";
import { useCallback, memo } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { useLogout } from "@/hooks/useLogout";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut, Settings, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const LoginStatusButton = memo(() => {
  const user = useUser();
  const { onLogout, isLogoutInProgress } = useLogout();
  const router = useRouter();

  function formatString(str) {
    return str
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

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
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="hover:text-accent-foreground data-[state=open]:text-accent-foreground cursor-pointer flex flex-row items-center gap-2 focus:ring-0 focus:outline-none">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    className="rounded-lg"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.name}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.fullName}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronDown className="ml-auto size-4" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-lg"
              side="bottom"
              align="center"
              sideOffset={4}
            >
              <DropdownMenuItem
                inset={<User2 className="hover:text-accent-foreground" />}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(user.redirectUrl);
                }}
                className="cursor-pointer text-gray-600 focus-visible:ring-0 focus:ring-0 focus:outline-none"
              >
                <LayoutTemplate className="hover:text-accent-foreground" />
                Go to {formatString(user.role)} Portal
              </DropdownMenuItem>
              <DropdownMenuItem
                inset={<Settings className="hover:text-accent-foreground" />}
                className="cursor-pointer text-gray-600 focus-visible:ring-0 focus:ring-0 focus:outline-none"
              >
                <Settings className="hover:text-accent-foreground" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                inset={<LogOut className="text-red-500" />}
                onClick={onLogout}
                className="cursor-pointer text-red-500 focus-visible:ring-0 focus:ring-0 focus:outline-none"
              >
                <LogOut className="text-red-500" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
});
