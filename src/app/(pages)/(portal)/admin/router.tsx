import { Home, Briefcase, User, LayoutDashboard, Key } from "lucide-react";

const basePath = "/admin";

export const AdminRoutes = {
  home: `${basePath}/home`,
  profile: `${basePath}/profile`,
  jobs: `${basePath}/jobs`,
  employers: `${basePath}/employers`,
  employersCreate: `${basePath}/employers/create`,
  employersView: (id) => `${basePath}/employers/view/${id}`,
  jobView: (id) => `${basePath}/jobs/view/${id}`,
  allJobSeekers: `${basePath}/job-seekers`,
  roles: `${basePath}/roles`,
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
    path: AdminRoutes.jobs,
    section: "Admin",
  },
  {
    icon: User,
    label: "Employers",
    path: AdminRoutes.employers,
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
    path: AdminRoutes.roles,
    section: "Admin",
  },
];
