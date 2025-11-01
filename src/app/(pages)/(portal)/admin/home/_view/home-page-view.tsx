import { HomeHeader } from "@/admin/home/_components/header";
import { HomeCards } from "@/admin/home/_components/cards";
import { HomeJobs } from "./../_components/jobs";
import { HomeFooter } from "./../_components/footer";
import { PageContainer } from "@/components/design-system";

export function AdminHomeView() {
  return (
    <PageContainer className="flex flex-col justify-between min-h-screen">
      <HomeHeader />
      <div className="flex flex-col h-full justify-between gap-6">
        <HomeCards />
        <HomeJobs />
        <HomeFooter />
      </div>
    </PageContainer>
  );
}
