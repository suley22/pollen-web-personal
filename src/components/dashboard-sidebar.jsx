"use client";
import React from "react";
import {
  Home,
  Users,
  Briefcase,
  Building2,
  Heart,
  FileText,
  Calendar,
  Menu,
  ChevronLeft,
  User,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  var section = "";

  const navigationItems = [
    {
      icon: Home,
      label: "Home",
      path: "/dashboard/home",
      isActive: pathname === "/dashboard/home",
      section: "main",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      path: "/dashboard/jobs",
      isActive: pathname === "/dashboard/jobs",
      section: "main",
    },
    {
      icon: Building2,
      label: "Companies",
      path: "/dashboard/companies",
      isActive: pathname === "/dashboard/companies",
      section: "main",
    },
    {
      icon: Users,
      label: "Community",
      path: "/dashboard/community",
      isActive: pathname === "/dashboard/community",
      section: "main",
    },
    {
      icon: LayoutDashboard,
      label: "Admin Dashboard",
      path: "/admin",
      isActive: pathname === "/admin",
      section: "Admin",
    },
    {
      icon: User,
      label: "Admin Dashboard",
      path: "/admin/employers-managment",
      isActive: pathname === "/admin/employers-managment",
      section: "Admin",
    },
  ];

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300`}
    >
      {/* Logo/Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E2007A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-xl text-gray-900">Pollen</h1>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 h-8 w-8 hover:bg-gray-100"
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-3 space-y-4">
        {/* Main Navigation */}
        {/* <div>
          {!isCollapsed && (
            <h3 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2 px-3">
              Main
            </h3>
          )}
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={item.isActive ? "default" : "ghost"}
                  className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                    item.isActive
                      ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => router.push(item.path)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && (
                    <>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge > 9 ? "9+" : item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Button>
              );
            })}
          </div>
        </div> */}

        {/* Main Navigation */}
        <div>
          <div className="space-y-1">
            {navigationItems.map((item, idx) => {
              const Icon = item.icon;
              const prev = navigationItems[idx - 1];
              const showHeader =
                !isCollapsed && (idx === 0 || prev.section !== item.section);

              return (
                <React.Fragment key={item.path}>
                  {showHeader && (
                    <h3 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2 px-3">
                      {item.section}
                    </h3>
                  )}

                  <Button
                    variant={item.isActive ? "default" : "ghost"}
                    className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                      item.isActive
                        ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => router.push(item.path)}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && (
                      <>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {item.badge > 9 ? "9+" : item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Secondary Navigation */}
        {/* <div>
          {!isCollapsed && (
            <h3 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2 px-3">
              My Activity
            </h3>
          )}
          <div className="space-y-1">
            <Button
              variant={pathname === "/dashboard/profile" ? "default" : "ghost"}
              className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                pathname === "/dashboard/profile"
                  ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => router.push("/dashboard/profile")}
              title={isCollapsed ? "My Profile" : undefined}
            >
              <User className="w-5 h-5" />
              {!isCollapsed && <span>My Profile</span>}
            </Button>
            <Button
              variant={
                pathname === "/dashboard/saved-items" ? "default" : "ghost"
              }
              className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                pathname === "/dashboard/saved-items"
                  ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => router.push("/dashboard/saved-items")}
              title={isCollapsed ? "Saved Items" : undefined}
            >
              <Heart className="w-5 h-5" />
              {!isCollapsed && <span>Saved Items</span>}
            </Button>
            <Button
              variant={
                pathname === "/dashboard/applications" ? "default" : "ghost"
              }
              className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                pathname === "/dashboard/applications"
                  ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => router.push("/dashboard/applications")}
              title={isCollapsed ? "My Applications" : undefined}
            >
              <FileText className="w-5 h-5" />
              {!isCollapsed && <span>My Applications</span>}
            </Button>
            <Button
              variant={
                pathname === "/dashboard/interview-schedule"
                  ? "default"
                  : "ghost"
              }
              className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                pathname === "/dashboard/interview-schedule"
                  ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => router.push("/dashboard/interview-schedule")}
              title={isCollapsed ? "Interview Schedule" : undefined}
            >
              <Calendar className="w-5 h-5" />
              {!isCollapsed && <span>Interview Schedule</span>}
            </Button>
          </div>
        </div>
        <div>
          {!isCollapsed && (
            <h3 className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2 px-3">
              Admin
            </h3>
          )}
          <div className="space-y-1">
            <Button
              variant={
                pathname === "/dashboard/employer/profile" ? "default" : "ghost"
              }
              className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                pathname === "/dashboard/admin/employers-managment"
                  ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() =>
                router.push("/dashboard/admin/employers-managment")
              }
              title={isCollapsed ? "My Profile" : undefined}
            >
              <User className="w-5 h-5" />
              {!isCollapsed && <span>Employers Managment</span>}
            </Button>
          </div>{" "}
        </div> */}
      </nav>
    </div>
  );
}
