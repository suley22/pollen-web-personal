import { Header } from "@/components/header";

export default function DashboardLayout({ children }) {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 flex">
      {/* <DashboardSidebar/> */}
      <div className="min-h-screen max-h-screen flex-1 flex flex-col">
        {/* <JobSeekrHeader onLogout={handleLogout} /> */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
    </>
  );
}
