import { useState, useEffect } from "react";

export interface EmployerProfile {
  id: string;
  company_name: string;
  logo_url?: string;
  company_size?: string;
  company_location?: string;
  founded_year?: string;
  website_url?: string;
  industries?: string[];
  company_about?: string;
  work_environment?: string;
  company_loves?: string;
  company_accolades?: string[];
  twitter_url?: string;
  linkedin_url?: string;
  glassdoor_url?: string;
  contact_name?: string;
  contact_job_title?: string;
  contact_email?: string;
  contact_phone?: string;
  created_at?: string;
  updated_at?: string;
  approval_status?: "draft" | "live" | "hidden";
  how_did_you_hear_about_us?: string;
  more_info?: string;
  hiring_frequency?: string;
  previous_hiring_methods?: string[];
  additional_notes?: string;
  jobs?: any[];
}

export interface CompanyData extends EmployerProfile {
  profileCompleteness?: number;
  logo?: string;
  size?: string;
  location?: string;
  foundedYear?: string;
  website?: string;
  about?: string;
  workEnvironment?: string;
  pollenLove?: string;
  accolades?: string[];
  socialMediaLinks?: Array<{
    id: number;
    platform: string;
    url?: string;
  }>;
  contactName?: string;
  contactJobTitle?: string;
  contactEmail?: string;
  contactPhone?: string;
  createdDate?: string;
  lastUpdated?: string;
  status?: "draft" | "live" | "hidden";
  howDidTheyHearAboutUs?: string;
  howDidTheyHearMoreInfo?: string;
  entryLevelHiringFrequency?: string;
  previousHiringMethods?: string[];
  additionalNotes?: string;
  entryLevelSupport?: string;
  glassdoorPage?: string;
}

export function useEmployerProfileForm(
  employerProfile: EmployerProfile | null,
) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<CompanyData | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);

  // Transform employer profile to company data format
  const company: CompanyData = employerProfile
    ? {
        ...employerProfile,
        profileCompleteness: 70,
        logo: employerProfile.logo_url,
        size: employerProfile.company_size,
        location: employerProfile.company_location,
        foundedYear: employerProfile.founded_year,
        website: employerProfile.website_url,
        industries: employerProfile.industries || ["Technology"],
        about: employerProfile.company_about || "No description provided.",
        workEnvironment: employerProfile.work_environment || "Not specified.",
        pollenLove: employerProfile.company_loves || "Not specified.",
        accolades: employerProfile.company_accolades || [
          "Great Place to Work 2023",
        ],
        socialMediaLinks: [
          { id: 1, platform: "Twitter", url: employerProfile.twitter_url },
          { id: 2, platform: "LinkedIn", url: employerProfile.linkedin_url },
          { id: 3, platform: "Glassdoor", url: employerProfile.glassdoor_url },
        ],
        contactName: employerProfile.contact_name || "Not specified",
        contactJobTitle: employerProfile.contact_job_title || "Not specified",
        contactEmail: employerProfile.contact_email || "Not specified",
        contactPhone: employerProfile.contact_phone || "Not specified",
        createdDate: employerProfile.created_at || "19 Aug 2025",
        lastUpdated: employerProfile.updated_at || "19 Aug 2025",
        status: employerProfile.approval_status || "draft",
        howDidTheyHearAboutUs:
          employerProfile.how_did_you_hear_about_us || "Not specified",
        howDidTheyHearMoreInfo: employerProfile.more_info || "Not specified",
        entryLevelHiringFrequency:
          employerProfile.hiring_frequency || "Not specified",
        previousHiringMethods: employerProfile.previous_hiring_methods || [],
        additionalNotes: employerProfile.additional_notes || "Not specified",
      }
    : ({} as CompanyData);

  useEffect(() => {
    if (employerProfile?.jobs) {
      setJobs(employerProfile.jobs);
      setIsLoadingJobs(false);
    }
  }, [employerProfile]);

  const handleInputChange = (field: string, value: string | string[]) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(company);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleSave = () => {
    // TODO: Implement save functionality with API call
    console.log("Saving changes:", editData);
    setIsEditing(false);
    // Here you would typically call an API to save the data
  };

  const handleSetLive = () => {
    // TODO: Implement set live functionality
    console.log("Setting profile live");
  };

  const handleHideProfile = () => {
    // TODO: Implement hide profile functionality
    console.log("Hiding profile");
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Deleting profile");
  };

  return {
    company,
    isEditing,
    setIsEditing,
    editData,
    setEditData,
    jobs,
    isLoadingJobs,
    setJobs,
    setIsLoadingJobs,
    handleInputChange,
    handleEdit,
    handleCancel,
    handleSave,
    handleSetLive,
    handleHideProfile,
    handleDelete,
  };
}
