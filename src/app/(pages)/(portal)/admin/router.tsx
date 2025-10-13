const basePath = "/admin";

export const AdminRoutes = {
  home: `${basePath}/home`,
  applications: `${basePath}/applications`,
  profile: `${basePath}/profile`,
  jobsManagement: `${basePath}/jobs-management`,
  employersManagement: `${basePath}/employers-management`,
  allJobSeekers: `${basePath}/all-job-seekers`,
  roleManagement: `${basePath}/role-management`,
};

export const ADMIN_ROUTES = Object.values(AdminRoutes);
