import { fetchJobProfile, fetchPersonaData } from "../actions";
import JobsManagmentReviewPage from "../job-profile-consolidated";

export default async function JobReviewPage({ params }) {
  const { id } = await params;
  console.log("Employer ID from URL:", id);

  const { job, error } = await fetchJobProfile(id);
  const { persona_data, error: personaError } = await fetchPersonaData(job.id);

  console.log("Fetched data:", job);
  console.log("Error:", error);

  const jobData = job;
  const personaData = persona_data;

  console.log("Fetched persona data:", personaData);
  console.log("Persona error:", personaError);

  return <JobsManagmentReviewPage job={jobData} personaData={personaData} />;
}
