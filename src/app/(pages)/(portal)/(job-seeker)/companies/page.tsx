"use client";

import { PageHeader, PageContainer } from "@/components/design-system";
import { CallToAction } from "./_components/call-to-action";
import {
  AllCompanies,
  RecommendedCompanies,
} from "./_components/companies-list";

export default function CompaniesPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Companies"
        subtitle={"Discover amazing companies and career opportunities."}
      />
      <RecommendedCompanies />

      <div className="m-8">
        <AllCompanies />
        <CallToAction />
      </div>
    </PageContainer>
  );
}
