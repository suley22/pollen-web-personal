import JobsViewComponent from "../_view/jobs-view-page";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return <JobsViewComponent id={id} />;
}
