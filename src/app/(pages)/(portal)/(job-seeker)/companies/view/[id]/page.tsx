import CompanyProfileView from "../_view/company-view-page";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { id?: string } }) {
  const { id } = params;

  if (!id) {
    return notFound();
  }

  return <CompanyProfileView id={id} />;
}
