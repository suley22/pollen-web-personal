"use client";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { Logo } from "./icons/icons";
import { useLogout } from "@/app/hooks/useLogout";
import { NavigationItems } from "@/components/sidebar/navigation-items";

export function AppSidebar({ user, ...props }) {
  const { onLogout, isLogoutInProgress } = useLogout();

  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {state === "collapsed" ? (
              <a
                href="#"
                data-slot="sidebar-menu-button"
                className="flex items-center justify-center"
                aria-label="Acme Inc"
              >
                <div className="flex items-center justify-center rounded-lg">
                  <Logo className="!size-9" />
                </div>
              </a>
            ) : (
              <SidebarMenuButton size="lg" asChild>
                <a href="#" className="gap-0">
                  <div className="flex aspect-square rounded-lg">
                    <Logo className="size-11" />
                  </div>
                  <div className="grid flex-1 text-left text-3xl leading-tight">
                    <span className="truncate font-bold">Pollen</span>
                  </div>
                </a>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NavigationItems isActive/>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={user}
          onLogout={onLogout}
          isLogoutInProgress={isLogoutInProgress}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
