import { notFound } from "next/navigation";
import { ProfileForm } from "@/app/(pages)/(portal)/admin/employers/create/_view/employers-create-view";

export default async function Page({ params }) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return <ProfileForm id={id} />;
}
