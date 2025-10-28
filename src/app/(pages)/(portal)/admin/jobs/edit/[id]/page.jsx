import { JobForm } from "../../create/_view/jobs-create-view";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return <JobForm id={id} />;
}
