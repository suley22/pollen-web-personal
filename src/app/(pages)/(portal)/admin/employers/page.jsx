import { Header } from "@/admin/employers/_components/header";
import { Filters } from "@/admin/employers/_components/filters";
import { StatisticsCards } from "@/admin/employers/_components/cards";
import { List } from "@/admin/employers/_components/list";
import { EmployerManagementProvider } from "@/admin/employers/_context/EmployerManagementContext";

export default function AdminEmployersManagement() {
  return (
    <EmployerManagementProvider>
      <div className="flex flex-col w-full mx-auto py-6 gap-6">
        <Header />
        <Filters />
        <StatisticsCards />
        <List />
      </div>
    </EmployerManagementProvider>
  );
}
