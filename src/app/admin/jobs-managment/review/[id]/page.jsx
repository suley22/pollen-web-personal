import { fetchJobProfile } from "../actions";
import JobsManagmentReviewPage from "../job-profile-consolidated";

export default async function JobReviewPage({ params }) {
  const { id } = await params;
  console.log("Employer ID from URL:", id);

  const { job, error } = await fetchJobProfile(id);

  console.log("Fetched data:", job);
  console.log("Error:", error);

  const jobData = job;

  return <JobsManagmentReviewPage job={jobData} />;
}
