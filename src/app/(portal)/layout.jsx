import { SidebarProvider, SidebarInset } from "@/components/sidebar/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default async function RootLayout({ children, user }) {
  return (
    <>
      <SidebarProvider className="testing-sidebar-layout">
        <AppSidebar user={user} />
        <SidebarInset className="bg-gray-50">{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
