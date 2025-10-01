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
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/sidebar/sidebar";
import { CustomSidebarMenuButton } from "@/components/sidebar/custom-sidebar-menu-button";

export function NavigationItems({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();

  console.log("User in NavigationItems:", user);

  const itemsJobSeeker = [
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
  ];

  const itemsAdmin = [
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

  const items = user?.role === "admin" ? itemsAdmin : itemsJobSeeker;

  return (
    <>
      {items.map((item, idx) => {
        const prev = items[idx - 1];
        const showSectionLabel = idx === 0 || prev.section !== item.section;
        return (
          <React.Fragment key={item.path}>
            {showSectionLabel && state !== "collapsed" && (
              <SidebarGroupLabel className="">{item.section}</SidebarGroupLabel>
            )}
            <SidebarGroupContent className="">
              <SidebarMenu className="">
                <SidebarMenuItem className="">
                  <CustomSidebarMenuButton
                    isActive={item.isActive}
                    tooltip={item.label}
                    onClick={() => router.push(item.path)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </CustomSidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </React.Fragment>
        );
      })}
    </>
  );
}
