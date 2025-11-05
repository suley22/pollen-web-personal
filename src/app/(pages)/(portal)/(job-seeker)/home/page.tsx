"use client";

import { JobSeekerHomeVideoSection } from "@/job-seeker/home/_components/job-seeker-home-video-section";
import { CompleteProfileBanner } from "@/app/(pages)/(portal)/(job-seeker)/home/_components/job-seeker-home-profile-banner";
import { FeaturedJobs } from "@/app/(pages)/(portal)/(job-seeker)/home/_components/job-seeker-home-featured-jobs";
import { CommunityFooter } from "@/job-seeker/home/_components/community-footer";
import { PageContainer, PageHeader } from "@/components/design-system";

import { useUser } from "@/app/providers";
import MyApplications from "./_components/job-seeker-home-my-applications";

export default function Home() {
  const user = useUser();

  return (
    <PageContainer>
      <PageHeader
        title={`Welcome back, ${user?.firstName}! 👋`}
        titleSize="text-5xl"
        subtitle={"Let's find you a job you love."}
      />
      <JobSeekerHomeVideoSection />
      <CompleteProfileBanner />
      <MyApplications />
      <FeaturedJobs />
      <CommunityFooter />
    </PageContainer>
  );
}
