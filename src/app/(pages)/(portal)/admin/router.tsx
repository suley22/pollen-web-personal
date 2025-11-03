import {
  Home,
  Briefcase,
  User,
  LayoutDashboard,
  Key,
  ClipboardList as Clipboard,
  FlaskConical,
} from "lucide-react";

const basePath = "/admin";

export const AdminRoutes = {
  home: `${basePath}/home`,
  profile: `${basePath}/profile`,
  jobs: `${basePath}/jobs`,
  jobsCreate: `${basePath}/jobs/create`,
  jobsCreateExternal: `${basePath}/jobs/create/external`,
  jobsEdit: (id) => `${basePath}/jobs/edit/${id}`,
  employers: `${basePath}/employers`,
  employersCreate: `${basePath}/employers/create`,
  employersView: (id) => `${basePath}/employers/view/${id}`,
  jobView: (id) => `${basePath}/jobs/view/${id}`,
  employersEdit: (id) => `${basePath}/employers/edit/${id}`,
  allJobSeekers: `${basePath}/job-seekers`,
  roles: `${basePath}/roles`,
  jobsApplicants: (jobId) => `${basePath}/job-applicants/${jobId}`,
  jobPersonaResults: (jobId) => `${basePath}/jobs/persona-results/${jobId}`,
  assessments: `${basePath}/assessments`,
  assessmentCreate: `${basePath}/assessments/create`,
  assessmentEdit: (id) => `${basePath}/assessments/edit/${id}`,
  assessmentView: (id) => `${basePath}/assessments/view/${id}`,
  jobApplicants: `${basePath}/job-applicants`,
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
    icon: Clipboard,
    label: "Assessments",
    path: AdminRoutes.assessments,
    section: "Admin",
  },
  {
    icon: LayoutDashboard,
    label: "Job Seekers",
    path: AdminRoutes.allJobSeekers,
    section: "Development",
  },
  {
    icon: Key,
    label: "Roles",
    path: AdminRoutes.roles,
    section: "Development",
  },
  {
    icon: FlaskConical,
    label: "Job Applicants",
    path: AdminRoutes.jobApplicants,
    section: "Development",
  },
];
