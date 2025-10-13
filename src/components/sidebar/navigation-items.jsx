"use client";

import React, { useTransition, useCallback, useMemo } from "react";

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

import { ADMIN_NAVIGATION } from "@/admin/router";
import { JOB_SEEKER_NAVIGATION } from "@/job-seeker/router";

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

  const items = useMemo(
    () =>
      (user?.isAdmin ? ADMIN_NAVIGATION : JOB_SEEKER_NAVIGATION).map(
        (item) => ({
          ...item,
          isActive: pathname === item.path,
        }),
      ),
    [user?.isAdmin, pathname],
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
