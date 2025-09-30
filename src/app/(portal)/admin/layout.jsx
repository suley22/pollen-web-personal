
import { Header } from "@/components/ui/header";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
