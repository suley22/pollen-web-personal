"use client";

import { SidebarProvider, SidebarInset } from "@/components/sidebar/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
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
