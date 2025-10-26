import EmployerProfileView from "@/app/(pages)/(portal)/admin/employers/view/_view/employers-view-page";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return <EmployerProfileView id={id} />;
}
