import { SidebarProvider, SidebarInset } from "@/components/sidebar/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default async function RootLayout({ children }) {
  return (
    <>
      <SidebarProvider className="testing-sidebar-layout">
        <AppSidebar />
        <SidebarInset className="bg-gray-50">{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
