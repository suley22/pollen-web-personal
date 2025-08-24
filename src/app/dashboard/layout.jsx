import DashboardSidebar from "@/components/dashboard-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        {/* <JobSeekerHeader onLogout={handleLogout} /> */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
