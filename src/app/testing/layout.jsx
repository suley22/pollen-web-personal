import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider className="testing-sidebar-layout">
      <AppSidebar />
      <SidebarInset className="bg-gray-50">
        <div className="bg-background sticky top-0 z-40 flex items-center gap-2 border-b p-2 pl-2">
          <SidebarTrigger />
        </div>
        <div className="p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  
   
//    <>
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         <Header />
//         <div className="flex-1 flex-row flex">
//           <DashboardSidebar />
//           <div className="flex-1 flex flex-col">
//             {/* <JobSeekrHeader onLogout={handleLogout} /> */}
//             <main className="flex-1 overflow-auto">{children}</main>
//           </div>
//         </div>
//       </div>
//     </>
  );
}
