"use client";

import { PageContainer, PageHeader } from "@/components/design-system";
import { CompanyInformation } from "@/app/(pages)/(portal)/admin/employers/view/_components/employers-view-company-information";
import { AccoladesAccreditations } from "@/job-seeker/companies/view/_components/companies-view-accolades";
import { SocialMedia } from "@/app/(pages)/(portal)/admin/employers/view/_components/employers-view-social-media";
import { DescriptionCard } from "@/components/design-system";
import { FileText, Users, Heart, GraduationCap } from "lucide-react";
import { useEmployerView } from "@/app/(pages)/(portal)/admin/employers/view/_hooks/employers-view-hook";
import { useRouter } from "next/navigation";
import { CompanyProfileSkeleton } from "./company-view-skeleton";

export default function CompanyProfileView({
  id = null,
}: {
  id?: string | null;
}) {
  const { profile, isLoading } = useEmployerView(id);
  const router = useRouter();

  return isLoading ? (
    <CompanyProfileSkeleton />
  ) : (
    <>
      <PageContainer>
        <PageHeader
          showBackButton={true}
          onBack={() => router.back()}
          title={profile?.company_name}
        />

        <div className="lg:col-span-2 space-y-6">
          <CompanyInformation company={profile} />

          <DescriptionCard
            title="About the Company"
            icon={<FileText className="h-5 w-5" />}
            value={profile?.company_about}
          />

          <DescriptionCard
            title="Work Environment"
            icon={<Users className="h-5 w-5" />}
            value={profile?.work_environment}
          />

          <DescriptionCard
            title="Pollen Loves"
            icon={<Heart className="h-5 w-5" />}
            value={profile?.company_loves}
          />

          <DescriptionCard
            title="Entry Level Support"
            icon={<GraduationCap className="h-5 w-5" />}
            value={profile?.company_entry_level}
          />

          <AccoladesAccreditations accolades={profile?.company_accolades} />
          <SocialMedia socialMediaLinks={profile?.social_medias} />
        </div>
      </PageContainer>
    </>
  );
}
