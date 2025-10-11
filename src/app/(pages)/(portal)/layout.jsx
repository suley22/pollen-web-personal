"use client";

import {
  SidebarProvider,
  SidebarInset,
} from "@/app/components/sidebar/sidebar";
import { AppSidebar } from "@/app/components/sidebar/app-sidebar";
import { useUser } from "@/app/providers";

export default function RootLayout({ children }) {
  const user = useUser();

  return (
    <>
      <SidebarProvider className="testing-sidebar-layout">
        <AppSidebar user={user} />
        <SidebarInset className="bg-gray-50">{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
