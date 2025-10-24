"use client";

import { CommunityCardExtended } from "./_components/community-card";
import { PageContainer, PageHeader } from "@/components/design-system";
import { CommunityCardGrid } from "./_components/community-card-grid";

export default function CommunityPage() {
  console.log("Community page rendering...");

  return (
    <PageContainer>
      <PageHeader
        title="Community Hub"
        subtitle="Connect, learn, and grow with fellow job seekers."
      />

      {/* Join Slack Banner */}
      <CommunityCardExtended
        badgeText="Instant Access"
        title="Join our Slack Community"
        subtitle="Get instant support from the Pollen team and connect with other
                job seekers. This is the quickest way to get help, hear about
                new jobs, and make requests about what we offer."
      />

      {/* Main Sections Grid */}
      <CommunityCardGrid />
    </PageContainer>
  );
}
