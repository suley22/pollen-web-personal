"use client";

import React from "react";
import {
  Home,
  Briefcase,
  Building2,
  Users,
  User,
  LayoutDashboard,
  Key,
  Heart,
  FileText,
  Calendar,
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
      path: "/home",
      isActive: pathname === "/home",
      section: "Main",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      path: "/jobs",
      isActive: pathname === "/jobs",
      section: "Main",
    },
    {
      icon: Building2,
      label: "Companies",
      path: "/companies",
      isActive: pathname === "/companies",
      section: "Main",
    },
    {
      icon: Users,
      label: "Community",
      path: "/community",
      isActive: pathname === "/community",
      section: "Main",
    },
    {
      icon: User,
      label: "My Profile",
      path: "/profile",
      isActive: pathname === "/profile",
      section: "My Activity",
    },
    {
      icon: Heart,
      label: "Saved Items",
      path: "/saved-items",
      isActive: pathname === "/saved-items",
      section: "My Activity",
    },
    {
      icon: FileText,
      label: "My Applications",
      path: "/applications",
      isActive: pathname === "/applications",
      section: "My Activity",
    },
    {
      icon: Calendar,
      label: "Interview Schedule",
      path: "/interview-schedule",
      isActive: pathname === "/interview-schedule",
      section: "My Activity",
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
      icon: Briefcase,
      label: "Jobs",
      path: "/admin/jobs-managment",
      isActive: pathname === "/admin/jobs-managment",
      section: "Admin",
    },
    {
      icon: User,
      label: "Employers",
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
      icon: Key,
      label: "Roles",
      path: "/admin/role-managment",
      isActive: pathname === "/admin/role-managment",
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
              <SidebarGroupLabel
                className={`uppercase text-2xl font-medium mb-2 pt-4 ${showSectionLabel && idx !== 0 ? "mt-4" : ""}`}
              >
                {item.section}
              </SidebarGroupLabel>
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
