import { SidebarProvider, SidebarInset } from "@/components/sidebar/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { createClient } from "@/utils/supabase/server";
import { Header } from "@/components/ui/header";

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <SidebarProvider className="testing-sidebar-layout">
        <AppSidebar user={user} />
        <SidebarInset className="bg-gray-50">
          <>
            <Header />
            <div>{children}</div>
          </>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
