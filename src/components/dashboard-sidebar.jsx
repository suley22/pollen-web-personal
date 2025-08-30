"use client";

import React from "react";
import {
  Home,
  Users,
  Briefcase,
  Building2,
  Menu,
  ChevronLeft,
  Settings,
  UserCheck,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      icon: Home,
      label: "Home",
      path: "/main/home",
      isActive: pathname === "/main/home",
      section: "main",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      path: "/main/jobs",
      isActive: pathname === "/main/jobs",
      section: "main",
    },
    {
      icon: Building2,
      label: "Companies",
      path: "/main/companies",
      isActive: pathname === "/main/companies",
      section: "main",
    },
    {
      icon: Users,
      label: "Community",
      path: "/main/community",
      isActive: pathname === "/main/community",
      section: "main",
    },
    {
      icon: UserCheck,
      label: "Employers Managment",
      path: "/admin/employers-managment",
      isActive: pathname === "/admin/employers-managment",
      section: "Admin",
    },
    {
      icon: Settings,
      label: "Account Settings",
      path: "/admin/account-settings",
      isActive: pathname === "/admin/account-settings",
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
                    className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${item.isActive
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
              variant={pathname === "/main/profile" ? "default" : "ghost"}
              className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                pathname === "/main/profile"
                  ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => router.push("/main/profile")}
              title={isCollapsed ? "My Profile" : undefined}
            >
              <User className="w-5 h-5" />
              {!isCollapsed && <span>My Profile</span>}
            </Button>
            <Button
              variant={
                pathname === "/main/saved-items" ? "default" : "ghost"
              }
              className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                pathname === "/main/saved-items"
                  ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => router.push("/main/saved-items")}
              title={isCollapsed ? "Saved Items" : undefined}
            >
              <Heart className="w-5 h-5" />
              {!isCollapsed && <span>Saved Items</span>}
            </Button>
            <Button
              variant={
                pathname === "/main/applications" ? "default" : "ghost"
              }
              className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                pathname === "/main/applications"
                  ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => router.push("/main/applications")}
              title={isCollapsed ? "My Applications" : undefined}
            >
              <FileText className="w-5 h-5" />
              {!isCollapsed && <span>My Applications</span>}
            </Button>
            <Button
              variant={
                pathname === "/main/interview-schedule"
                  ? "default"
                  : "ghost"
              }
              className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                pathname === "/main/interview-schedule"
                  ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => router.push("/main/interview-schedule")}
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
                pathname === "/main/employer/profile" ? "default" : "ghost"
              }
              className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-3"} h-9 text-sm ${
                pathname === "/main/admin/employers-managment"
                  ? "bg-[#E2007A] text-white hover:bg-[#E2007A]/90"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() =>
                router.push("/admin/employers-managment")
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
