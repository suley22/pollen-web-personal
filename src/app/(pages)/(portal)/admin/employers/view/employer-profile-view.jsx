"use client";

import { useRouter } from "next/navigation";
import { CompanyInformation } from "@/employers/view/_components/view/company-information";
import { AboutCompany } from "@/employers/view/_components/view/about-company";
import { WorkEnvironment } from "@/employers/view/_components/view/work-environment";
import { PollenLoves } from "@/employers/view/_components/view/pollen-loves";
import { EntryLevelSupport } from "@/employers/view/_components/view/entry-level-support";
import { AccoladesAccreditations } from "@/employers/view/_components/view/accolades-accreditations";
import { SocialMedia } from "@/employers/view/_components/view/social-media";
import { ContactInformation } from "@/employers/view/_components/view/contact-information";
import { ProfileStatus } from "@/employers/view/_components/view/profile-status";
import { InternalPollenData } from "@/employers/view/_components/view/internal-pollen-data";
import { JobPostings } from "@/employers/view/_components/view/job-postings";
import { EmployerProfileHeader } from "@/employers/view/_components/view/employer-profile-header";
import { EmployerProfileSkeleton } from "@/employers/view/_components/employer-profile-skeleton";
import { useEmployerProfileForm } from "@/employers/view/hooks/useEmployerProfileForm";

export default function EmployerProfileView({ employerProfile }) {
  const router = useRouter();

  const {
    profile,
    jobs,
    isLoadingJobs,
    handleEdit,
    handleSetLive,
    handleHideProfile,
    handleDelete,
  } = useEmployerProfileForm(employerProfile);

  if (!profile) {
    return <EmployerProfileSkeleton />;
  }

  return (
    <div className="flex flex-col w-full mx-auto py-6 gap-6">
      {/* Header */}
      <EmployerProfileHeader
        companyName={profile.company_name}
        companyStatus={profile.status}
        onBack={() => router.back()}
        onEdit={handleEdit}
        onSetLive={handleSetLive}
        onHideProfile={handleHideProfile}
        onDelete={handleDelete}
        onOpenEmployerPortal={() => window.open("/employer-portal", "_blank")}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <CompanyInformation company={profile} />
          <AboutCompany about={profile.company_about} />
          <WorkEnvironment workEnvironment={profile.work_environment} />
          <PollenLoves pollenLove={profile.company_loves} />
          <EntryLevelSupport entryLevelSupport={profile.entry_level_support} />
          <AccoladesAccreditations accolades={profile.accolades} />
          <SocialMedia socialMediaLinks={profile.social_media_links} />
        </div>

        {/* Right Column - Contact & Meta Information */}
        <div className="space-y-6">
          <ContactInformation
            contactName={profile.contact_name}
            contactJobTitle={profile.job_title}
            contactEmail={profile.contact_email}
            contactPhone={profile.contact_phone}
          />

          <ProfileStatus
            status={profile.approval_status}
            createdDate={profile.created_at}
            lastUpdated={profile.updated_at}
            profileCompleteness={profile.profile_completeness}
          />

          <InternalPollenData
            howDidTheyHearAboutUs={profile.how_did_you_hear_about_us}
            howDidTheyHearMoreInfo={profile.more_info}
            entryLevelHiringFrequency={profile.hiring_frequency}
            previousHiringMethods={profile.how_hired_previously}
            additionalNotes={profile.additional_notes}
          />
        </div>
      </div>

      {/* Job Postings Section - Full Width */}
      <JobPostings
        jobs={jobs}
        isLoading={isLoadingJobs}
        companyId={profile.id}
      />
    </div>
  );
}
