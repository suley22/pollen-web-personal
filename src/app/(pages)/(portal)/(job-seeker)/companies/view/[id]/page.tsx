import CompanyProfileView from "../_view/company-view-page";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id?: string } }) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return <CompanyProfileView id={id} />;
}
