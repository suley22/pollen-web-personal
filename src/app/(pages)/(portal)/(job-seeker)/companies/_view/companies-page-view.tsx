import { PageHeader, PageContainer } from "@/components/design-system";
import { CallToAction } from "@/job-seeker/companies/_components/call-to-action";
import {
  AllCompanies,
  RecommendedCompanies,
} from "@/job-seeker/companies/_components/companies-list";

export default function CompaniesPageView() {
  return (
    <PageContainer className="flex flex-col gap-6">
      <PageHeader
        title="Companies"
        subtitle={"Discover amazing companies and career opportunities."}
      />
      <RecommendedCompanies />
      <AllCompanies />
      <CallToAction />
    </PageContainer>
  );
}
