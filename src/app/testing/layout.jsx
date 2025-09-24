import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <SidebarProvider className="testing-sidebar-layout">
      <AppSidebar user={user} />
      <SidebarInset className="bg-gray-50">
        <>
          <div className="bg-background sticky top-0 z-40 flex items-center gap-2 border-b p-2 pl-2">
            <SidebarTrigger />
          </div>
          <div className="p-4">{children}</div>
        </>
      </SidebarInset>
    </SidebarProvider>
  );
}
