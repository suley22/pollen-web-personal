import { Header } from "@/components/header";
import DashboardSidebar from "@/components/dashboard-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen max-h-screen min-w-screen max-w-screen">
      <div className="flex bg-gray-50 w-full">
        <DashboardSidebar />
        <div className="flex flex-col w-full">
          {/* <JobSeekrHeader onLogout={handleLogout} /> */}
          <Header />
          <main className="flex flex-col flex-1 items-center overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
