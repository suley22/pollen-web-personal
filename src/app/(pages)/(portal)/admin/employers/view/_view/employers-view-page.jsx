"use client";

import { useRouter } from "next/navigation";
import { CompanyInformation } from "@/app/(pages)/(portal)/admin/employers/view/_components/employers-view-company-information";
import { AccoladesAccreditations } from "@/app/(pages)/(portal)/admin/employers/view/_components/employers-view-accolades";
import { SocialMedia } from "@/app/(pages)/(portal)/admin/employers/view/_components/employers-view-social-media";
import { ContactInformation } from "@/app/(pages)/(portal)/admin/employers/view/_components/employers-view-contact-information";
import { ProfileStatus } from "@/app/(pages)/(portal)/admin/employers/view/_components/employers-view-profile-status";
import { InternalPollenData } from "@/app/(pages)/(portal)/admin/employers/view/_components/employers-view-internal-pollen-data";
import { EmployerProfileViewHeader } from "@/app/(pages)/(portal)/admin/employers/view/_components/employers-view-header";
import { EmployerProfileSkeleton } from "@/employers/view/_view/employers-view-skeleton";
import { useEmployerView } from "@/employers/view/_hooks/employers-view-hook";
import { DescriptionCard } from "@/components/design-system";
import { FileText, Users, Heart, GraduationCap } from "lucide-react";
import { AdminRoutes } from "@/admin/router";

export default function EmployerProfileView({ id = null }) {
  const router = useRouter();

  const {
    profile,
    isLoading,
    handleSetLive,
    handleHideProfile,
    handleDelete,
    isUpdating,
    isDeleting,
  } = useEmployerView(id);

  if (!profile || isLoading) {
    return <EmployerProfileSkeleton />;
  }

  // Handlers - simple and direct
  const handleEdit = () => {
    router.push(AdminRoutes.employersEdit(id));
  };

  return (
    <div className="flex flex-col w-full mx-auto py-6 gap-6">
      {/* Header */}
      <EmployerProfileViewHeader
        companyName={profile.company_name}
        approvalStatus={profile.approval_status}
        onBack={() => router.back()}
        onEdit={handleEdit}
        onSetLive={handleSetLive}
        onHideProfile={handleHideProfile}
        onDelete={handleDelete}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
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
            value={profile.company_entry_level}
          />

          <AccoladesAccreditations accolades={profile.company_accolades} />
          <SocialMedia socialMediaLinks={profile.social_medias} />
        </div>

        {/* Right Column - Contact & Meta Information */}
        <div className="space-y-6">
          <ProfileStatus
            status={profile.approval_status}
            createdDate={profile.created_at}
            lastUpdated={profile.updated_at}
            profileCompleteness={profile.profile_completeness}
          />

          <ContactInformation
            contactName={profile.contact_name}
            contactJobTitle={profile.job_title}
            contactEmail={profile.contact_email}
            contactPhone={profile.contact_phone}
          />

          <InternalPollenData
            howDidTheyHearAboutUs={profile.how_did_you_hear_about_us}
            howDidTheyHearMoreInfo={profile.more_info}
            entryLevelHiringFrequency={profile.hiring_frequency}
            previousHiringMethods={profile.previous_hiring_methods}
            additionalNotes={profile.additional_notes}
          />
        </div>
      </div>
    </div>
  );
}
