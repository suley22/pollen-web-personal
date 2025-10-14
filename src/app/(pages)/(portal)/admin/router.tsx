import { Home, Briefcase, User, LayoutDashboard, Key } from "lucide-react";

const basePath = "/admin";

export const AdminRoutes = {
  home: `${basePath}/home`,
  applications: `${basePath}/applications`,
  profile: `${basePath}/profile`,
  jobsManagement: `${basePath}/jobs`,
  employersManagement: `${basePath}/employers`,
  allJobSeekers: `${basePath}/job-seekers`,
  roleManagement: `${basePath}/roles`,
};

export const ADMIN_ROUTES = Object.values(AdminRoutes);

export const ADMIN_NAVIGATION = [
  {
    icon: Home,
    label: "Home",
    path: AdminRoutes.home,
    section: "Admin",
  },
  {
    icon: Briefcase,
    label: "Jobs",
    path: AdminRoutes.jobsManagement,
    section: "Admin",
  },
  {
    icon: User,
    label: "Employers",
    path: AdminRoutes.employersManagement,
    section: "Admin",
  },
  {
    icon: LayoutDashboard,
    label: "Job Seekers",
    path: AdminRoutes.allJobSeekers,
    section: "Admin",
  },
  {
    icon: Key,
    label: "Roles",
    path: AdminRoutes.roleManagement,
    section: "Admin",
  },
];
