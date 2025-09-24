"use client";

import { NavUser } from "@/components/sidebar/nav-user";
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
} from "@/components/sidebar/sidebar";
import { useSidebar } from "@/components/sidebar/sidebar";
import { Logo } from "../icons/icons";
import { useLogout } from "@/app/hooks/useLogout";
import { NavigationItems } from "@/components/sidebar/navigation-items";

export function AppSidebar({ user, ...props }) {
  const { onLogout, isLogoutInProgress } = useLogout();

  const { state } = useSidebar();
  const isLoading = !user || isLogoutInProgress;

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
          <NavigationItems />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            {state !== "collapsed" && (
              <span className="ml-2 text-sm">Cargando...</span>
            )}
          </div>
        ) : (
          <NavUser
            user={user}
            onLogout={onLogout}
            isLogoutInProgress={isLogoutInProgress}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
