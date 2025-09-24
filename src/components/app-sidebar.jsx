"use client";

import {
  LayoutDashboard,
  Home,
  Users,
  Briefcase,
  Building2,
  User,
} from "lucide-react";

import React from "react";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { Logo } from "./icons/icons";
import { usePathname } from "next/navigation";

export function AppSidebar({ user, ...props }) {
  const { state } = useSidebar();
  const pathname = usePathname();
  const navigationItems = [
    {
      icon: Home,
      label: "Home",
      path: "/main/home",
      isActive: pathname === "/main/home",
      section: "main",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      path: "/main/jobs",
      isActive: pathname === "/main/jobs",
      section: "main",
    },
    {
      icon: Building2,
      label: "Companies",
      path: "/main/companies",
      isActive: pathname === "/main/companies",
      section: "main",
    },
    {
      icon: Users,
      label: "Community",
      path: "/main/community",
      isActive: pathname === "/main/community",
      section: "main",
    },
    {
      icon: User,
      label: "Employers Managment",
      path: "/admin/employers-managment",
      isActive: pathname === "/admin/employers-managment",
      section: "Admin",
    },
    {
      icon: LayoutDashboard,
      label: "Job Seekers",
      path: "/admin/all-job-seekers",
      isActive: pathname === "/admin/all-job-seekers",
      section: "Admin",
    },
  ];

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
          {navigationItems.map((item, idx) => {
            const prev = navigationItems[idx - 1];
            const sectionLabel = idx === 0 || prev.section !== item.section;
            return (
              <React.Fragment key={item.path}>
                {sectionLabel && (
                  <SidebarGroupLabel>{item.section}</SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip={item.title} asChild>
                        <a href={item.path}>
                          <item.icon />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </React.Fragment>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogout={() => {}} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
