"use client";

import React from "react";
import {
  Home,
  Briefcase,
  Building2,
  Users,
  User,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/sidebar/sidebar";

export function NavigationItems() {
  const pathname = usePathname();
  const {isCollapsedActive } = useSidebar();

  const items = [
    {
      icon: Home,
      label: "Home",
      path: "/main/home",
      isActive: pathname === "/main/home",
      section: "Main",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      path: "/main/jobs",
      isActive: pathname === "/main/jobs",
      section: "Main",
    },
    {
      icon: Building2,
      label: "Companies",
      path: "/main/companies",
      isActive: pathname === "/main/companies",
      section: "Main",
    },
    {
      icon: Users,
      label: "Community",
      path: "/main/community",
      isActive: pathname === "/main/community",
      section: "Main",
    },
    {
      icon: Home,
      label: "Home",
      path: "/admin/home",
      isActive: pathname === "/admin/home",
      section: "Admin",
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
    {
      icon: Briefcase,
      label: "Jobs Managment",
      path: "/admin/jobs-managment",
      isActive: pathname === "/admin/jobs-managment",
      section: "Admin",
    },
  ];

  return (
    <>
      {items.map((item, idx) => {
        const prev = items[idx - 1];
        const sectionLabel = idx === 0 || prev.section !== item.section;
        const isCollapsed = sectionLabel && isCollapsedActive;
        return (
          <React.Fragment key={item.path}>
            {isCollapsed && (
              <SidebarGroupLabel className="">{item.section}</SidebarGroupLabel>
            )}
            <SidebarGroupContent className="">
              <SidebarMenu className="">
                <SidebarMenuItem active={item.isActive} className="">
                  <SidebarMenuButton className="" tooltip={item.label} asChild>
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
    </>
  );
}