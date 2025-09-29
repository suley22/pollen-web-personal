"use client";

import { LogOut, ChevronDown, User2, Settings } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuButton,
} from "@/components/sidebar/sidebar";
import { useUser } from "@/app/providers";

export function NavUser({ onLogout }) {
  const user = useUser();

  return (
    <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
                className="hover:text-accent-foreground data-[state=open]:text-accent-foreground focus:ring-0 focus:outline-none"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-lg"
            side="bottom"
            align="center"
            sideOffset={4}
          >
            <DropdownMenuItem className="cursor-pointer text-gray-600 focus-visible:ring-0 focus:ring-0 focus:outline-none">
              <User2 className="hover:text-accent-foreground"/>
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-gray-600 focus-visible:ring-0 focus:ring-0 focus:outline-none">
              <Settings className="hover:text-accent-foreground"/>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-500 focus-visible:ring-0 focus:ring-0 focus:outline-none">
              <LogOut className="text-red-500"/>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}
