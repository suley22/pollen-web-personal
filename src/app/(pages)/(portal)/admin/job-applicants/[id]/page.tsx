import JobApplicantsView from "../_view/job-applicants-view";
import { notFound } from "next/navigation";

export default async function JobApplicantsPage({ params }) {
  const { id } = await params;
  if (!id) {
    return notFound();
  }
  return <JobApplicantsView jobId={id} />;
}
