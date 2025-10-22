"use client";

import { JobSeekerHomeVideoSection } from "@/job-seeker/home/_components/job-seeker-home-video-section";
import { CompleteProfileBanner } from "@/job-seeker/home/_components/js-home-profile-banner";
import { FeaturedJobs } from "@/job-seeker/home/_components/featured-jobs";
import { CommunityFooter } from "@/job-seeker/home/_components/community-footer";
import { PageContainer, PageHeader } from "@/components/design-system";

import { useUser } from "@/app/providers";

export default function Home() {
  const user = useUser();

  return (
    <PageContainer>
      <PageHeader
        title={<>Welcome back, {user?.firstName}! 👋</>}
        titleSize="text-5xl"
        subtitle={"Let's find you a job you love."}
      />
      <JobSeekerHomeVideoSection />
      <CompleteProfileBanner />
      <FeaturedJobs />
      <CommunityFooter />
    </PageContainer>
  );
}
