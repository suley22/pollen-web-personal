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
import { Divider } from "../design-system";
import { NavUser } from "./nav-user";
import { useLogout } from "@/hooks/useLogout";

export function AppSidebar({ ...props }) {
  const { state } = useSidebar();
  const handleLogout = useLogout();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarRail />
        <SidebarMenu>
          <SidebarMenuItem>
            {state === "collapsed" ? (
              <div className="flex flex-col items-center justify-center pt-2">
                <SidebarTrigger />
                <Divider />
              </div>
            ) : (
              <div className="flex items-center justify-between w-full px-2">
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
                <SidebarTrigger />
              </div>
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
        <NavUser onLogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  );
}
