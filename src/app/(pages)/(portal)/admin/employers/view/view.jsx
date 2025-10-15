"use client";

import { useRouter } from "next/navigation";
import { CompanyInformation } from "@/employers/view/_components/company-information";
import { AccoladesAccreditations } from "@/employers/view/_components/accolades-accreditations";
import { SocialMedia } from "@/employers/view/_components/social-media";
import { ContactInformation } from "@/employers/view/_components/contact-information";
import { ProfileStatus } from "@/employers/view/_components/profile-status";
import { InternalPollenData } from "@/employers/view/_components/internal-pollen-data";
import { JobPostings } from "@/employers/view/_components/job-postings";
import { EmployerProfileHeader } from "@/employers/view/_components/header";
import { EmployerProfileSkeleton } from "@/employers/view/view-skeleton";
import { useEmployerView } from "@/employers/view/hooks/useEmployerView";
import { DescriptionCard } from "@/components/design-system";
import { FileText, Users, Heart, GraduationCap } from "lucide-react";

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
  } = useEmployerView(employerProfile);

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
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <CompanyInformation company={profile} />

          <DescriptionCard
            title="About the Company"
            icon={<FileText className="h-5 w-5" />}
            value={profile.company_about}
          />

          <DescriptionCard
            title="Work Environment"
            icon={<Users className="h-5 w-5" />}
            value={profile.work_environment}
          />

          <DescriptionCard
            title="Pollen Loves"
            icon={<Heart className="h-5 w-5" />}
            value={profile.company_loves}
          />

          <DescriptionCard
            title="Entry Level Support"
            icon={<GraduationCap className="h-5 w-5" />}
            value={profile.entry_level_support}
          />

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
