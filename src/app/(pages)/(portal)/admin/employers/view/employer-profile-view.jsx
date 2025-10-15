"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
import { useEmployerProfileForm } from "./hooks/useEmployerProfileForm";
import { fetchJobsByEmployer } from "./actions";

export default function EmployerProfileView({ employerProfile }) {
  const router = useRouter();

  // Log the received data
  useEffect(() => {
    console.log("📋 EmployerProfileView received:", {
      hasProfile: !!employerProfile,
      profileId: employerProfile?.id,
      profileData: employerProfile,
    });
  }, [employerProfile]);

  const {
    company,
    jobs,
    isLoadingJobs,
    setJobs,
    setIsLoadingJobs,
    handleEdit,
    handleSetLive,
    handleHideProfile,
    handleDelete,
  } = useEmployerProfileForm(employerProfile);

  // Log the company data from hook
  useEffect(() => {
    console.log("🏢 Company data from hook:", {
      hasCompany: !!company,
      companyId: company?.id,
      companyData: company,
    });
  }, [company]);

  // Fetch jobs when component mounts or company.id changes
  useEffect(() => {
    const loadJobs = async () => {
      if (company?.id) {
        console.log("🔍 Loading jobs for company:", company.id);
        setIsLoadingJobs(true);
        try {
          const result = await fetchJobsByEmployer(company.id);
          console.log("📦 Jobs fetch result:", result);

          if (result.error) {
            console.error("❌ Error fetching jobs:", result.error);
            setJobs([]);
          } else if (Array.isArray(result.data)) {
            console.log(
              "✅ Jobs loaded successfully:",
              result.data.length,
              "jobs",
            );
            setJobs(result.data);
          } else {
            console.warn("⚠️ Result data is not an array:", result.data);
            setJobs([]);
          }
        } catch (error) {
          console.error("❌ Exception fetching jobs:", error);
          setJobs([]);
        } finally {
          setIsLoadingJobs(false);
        }
      } else {
        console.warn("⚠️ No company.id available");
        setIsLoadingJobs(false);
      }
    };

    loadJobs();
  }, [company?.id, setIsLoadingJobs, setJobs]);

  // Show skeleton while profile is loading
  if (!employerProfile) {
    return <EmployerProfileSkeleton />;
  }

  return (
    <div className="flex flex-col w-full mx-auto py-6 gap-6">
      {/* Header */}
      <EmployerProfileHeader
        companyName={company.company_name}
        companyStatus={company.status}
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
          {/* Company Information */}
          <CompanyInformation company={company} />

          {/* About Company */}
          <AboutCompany about={company.about} />

          {/* Work Environment */}
          <WorkEnvironment workEnvironment={company.workEnvironment} />

          {/* Why does Pollen love this company */}
          <PollenLoves pollenLove={company.pollenLove} />

          {/* Entry-Level Support */}
          <EntryLevelSupport entryLevelSupport={company.entryLevelSupport} />

          {/* Accolades & Accreditations */}
          <AccoladesAccreditations accolades={company.accolades} />

          {/* Social Media Links */}
          <SocialMedia
            socialMediaLinks={company.socialMediaLinks}
            glassdoorPage={company.glassdoorPage}
          />
        </div>

        {/* Right Column - Contact & Meta Information */}
        <div className="space-y-6">
          {/* Contact Information */}
          <ContactInformation
            contactName={company.contactName}
            contactJobTitle={company.contactJobTitle}
            contactEmail={company.contactEmail}
            contactPhone={company.contactPhone}
          />

          {/* Profile Metadata */}
          <ProfileStatus
            status={company.status}
            createdDate={company.createdDate}
            lastUpdated={company.lastUpdated}
            profileCompleteness={company.profileCompleteness}
          />

          {/* Internal Pollen Data */}
          <InternalPollenData
            howDidTheyHearAboutUs={company.howDidTheyHearAboutUs}
            howDidTheyHearMoreInfo={company.howDidTheyHearMoreInfo}
            entryLevelHiringFrequency={company.entryLevelHiringFrequency}
            previousHiringMethods={company.previousHiringMethods}
            additionalNotes={company.additionalNotes}
          />
        </div>
      </div>

      {/* Job Postings Section - Full Width */}
      <JobPostings
        jobs={jobs}
        isLoading={isLoadingJobs}
        companyId={company.id}
      />
    </div>
  );
}
