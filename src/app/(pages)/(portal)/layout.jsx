"use client";

import { SidebarProvider, SidebarInset } from "@/components/sidebar/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Header } from "@/components/ui/header";

export default function RootLayout({ children }) {
  return (
    <>
      <SidebarProvider className="testing-sidebar-layout">
        <AppSidebar />
        <SidebarInset className="bg-gray-50">
          <Header />
          <div className="flex flex-col items-center justify-items-center px-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
