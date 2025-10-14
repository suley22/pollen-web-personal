import { Header } from "@/app/(pages)/(portal)/admin/employers/_components/header";
import { Filters } from "@/app/(pages)/(portal)/admin/employers/_components/filters";
import { StatisticsCards } from "@/app/(pages)/(portal)/admin/employers/_components/cards";
import { List } from "@/app/(pages)/(portal)/admin/employers/_components/list";

export default function AdminEmployersManagement() {
  return (
    <div className="flex flex-col w-full mx-auto py-6 gap-6">
      <Header />
      <Filters />
      <StatisticsCards />
      <List />
    </div>
  );
}
