import { Home, Briefcase, User, LayoutDashboard, Key } from "lucide-react";

const basePath = "/admin";

export const AdminRoutes = {
  home: `${basePath}/home`,
  profile: `${basePath}/profile`,
  jobs: `${basePath}/jobs`,
  jobsCreate: `${basePath}/jobs/create`,
  jobsEdit: (id) => `${basePath}/jobs/edit/${id}`,
  employers: `${basePath}/employers`,
  employersCreate: `${basePath}/employers/create`,
  employersView: (id) => `${basePath}/employers/view/${id}`,
  jobView: (id) => `${basePath}/jobs/view/${id}`,
  employersEdit: (id) => `${basePath}/employers/edit/${id}`,
  allJobSeekers: `${basePath}/job-seekers`,
  roles: `${basePath}/roles`,
  jobsApplicants: (jobId) => `${basePath}/jobs/job-applicants/${jobId}`,
  jobPersonaResults: (jobId) => `${basePath}/jobs/persona-results/${jobId}`,
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
