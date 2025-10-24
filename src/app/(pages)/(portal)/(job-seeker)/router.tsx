import { Home, Briefcase, Building2, Users } from "lucide-react";

export const JobSeekerRoutes = {
  home: `/home`,
  dashboard: `/dashboard`,
  applications: `/applications`,
  profile: `/profile`,
  jobs: `/jobs`,
  companies: `/companies`,
  community: `/community`,
  applyJobs: (id) => `/jobs/apply/${id}`,
  companyView: (id) => `/companies/view/${id}`,
};

export const JOB_SEEKER_ROUTES = Object.values(JobSeekerRoutes);

export const JOB_SEEKER_NAVIGATION = [
  {
    icon: Home,
    label: "Home",
    path: JobSeekerRoutes.home,
    section: "Main",
  },
  {
    icon: Briefcase,
    label: "Jobs",
    path: JobSeekerRoutes.jobs,
    section: "Main",
  },
  {
    icon: Building2,
    label: "Companies",
    path: JobSeekerRoutes.companies,
    section: "Main",
  },
  {
    icon: Users,
    label: "Community",
    path: JobSeekerRoutes.community,
    section: "Main",
  },
];
