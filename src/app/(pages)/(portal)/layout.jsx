"use client";

import { SidebarProvider, SidebarInset } from "@/components/sidebar/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function RootLayout({ children }) {
  return (
    <>
      <SidebarProvider className="testing-sidebar-layout">
        <AppSidebar />
        <SidebarInset className="bg-gray-50">
          <div className="flex flex-col items-center justify-items-center px-8 flex-1 min-h-0 w-full">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
