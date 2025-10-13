"use client";

import React, { useTransition, useCallback, useMemo } from "react";
import {
  Home,
  Briefcase,
  Building2,
  Users,
  User,
  LayoutDashboard,
  Key,
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
import { useUser } from "@/app/providers";

export function NavigationItems() {
  const user = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { state } = useSidebar();

  // Optimized navigation handler
  const handleNavigation = useCallback(
    (path) => {
      // For same-domain navigation, use Next.js router for better performance
      if (pathname !== path) {
        startTransition(() => {
          router.push(path);
        });
      }
    },
    [router, pathname, startTransition],
  );

  // Memoize navigation items to avoid recreating on every render
  const itemsJobSeeker = useMemo(
    () => [
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
    ],
    [pathname],
  );

  const itemsAdmin = useMemo(
    () => [
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
    ],
    [pathname],
  );

  const items = useMemo(
    () => (user?.isAdmin ? itemsAdmin : itemsJobSeeker),
    [user?.isAdmin, itemsAdmin, itemsJobSeeker],
  );

  // Render items with optimized section handling
  return (
    <>
      {items.map((item, idx) => {
        const prev = items[idx - 1];
        const showSectionLabel = idx === 0 || prev?.section !== item.section;
        const IconComponent = item.icon;

        return (
          <React.Fragment key={item.path}>
            {showSectionLabel && state !== "collapsed" && (
              <SidebarGroupLabel>{item.section}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <CustomSidebarMenuButton
                    isActive={item.isActive}
                    tooltip={item.label}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <IconComponent className="w-4 h-4" />
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
