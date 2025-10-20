import { HomeHeader } from "@/admin/home/_components/header";
import { HomeCards } from "@/admin/home/_components/cards";
import { HomeJobs } from "./_components/jobs";
import { HomeFooter } from "./_components/footer";

export default function AdminHomePage() {
  return (
    <div className="w-full flex flex-col py-6 gap-4">
      <HomeHeader />

      <div className="flex flex-col w-full mx-auto gap-6">
        <HomeCards />
        <HomeJobs />
        <HomeFooter />
      </div>
    </div>
  );
}
