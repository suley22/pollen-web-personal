"use client";

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
  SidebarTrigger,
} from "@/components/sidebar/sidebar";
import { useSidebar } from "@/components/sidebar/sidebar";
import { Logo } from "../icons/icons";
import { NavigationItems } from "@/components/sidebar/navigation-items";

export function AppSidebar({ user, ...props }) {
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
          <NavigationItems user={user} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
