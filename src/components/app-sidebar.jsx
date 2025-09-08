"use client"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  LayoutDashboard,
  Home,
  Users,
  Briefcase,
  Building2,
  User,
} from "lucide-react"

import React from "react"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { Logo } from "./icons/icons"
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}




export function AppSidebar({
  ...props
}) {
  const { state } = useSidebar()
  const pathname = usePathname();
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
      icon: User,
      label: "Employers Managment",
      path: "/admin/employers-managment",
      isActive: pathname === "/admin/employers-managment",
      section: "Admin",
    },
    {
      icon: LayoutDashboard,
      label: "Job Seekers",
      path: "/admin/all-job-seekers",
      isActive: pathname === "/admin/all-job-seekers",
      section: "Admin",
    },
  ];
  
  return (
    <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                {state === "collapsed" ? (
                  <a
                    href="#"
                    data-slot="sidebar-menu-button"
                    className="flex items-center justify-center"
                    aria-label="Acme Inc"
                  >
                    <div className="flex items-center justify-center rounded-lg">
                      <Logo className="!size-9" />
                    </div>
                  </a>
                ) : (
                  <SidebarMenuButton size="lg" asChild>
                    <a href="#" className="gap-0">
                      <div className="flex aspect-square rounded-lg">
                        <Logo className="size-11" />
                      </div>
                      <div className="grid flex-1 text-left text-3xl leading-tight">
                        <span className="truncate font-bold">Pollen</span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>  
          {navigationItems.map((item,idx) => {
            const prev = navigationItems[idx - 1];
            const sectionLabel = (idx === 0 || prev.section !== item.section);
            return (
              <React.Fragment key={item.path}>
                      {sectionLabel && (
                <SidebarGroupLabel>{item.section}</SidebarGroupLabel>
            )}
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <a href={item.path}>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </React.Fragment>
          );
        })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
