import {
  fetchJobProfile,
  fetchPersonaData,
  fetchAssessmentData,
} from "../actions";
import JobsManagmentReviewPage from "../view";

export default async function JobReviewPage({ params }) {
  const { id } = await params;
  console.log("Employer ID from URL:", id);

  const { job, error } = await fetchJobProfile(id);
  const job_id = job?.id;
  const { persona_data, error: personaError } = await fetchPersonaData(job_id);
  const { assessment_data, error: assessmentError } =
    await fetchAssessmentData(job_id);

  const jobData = job;
  const personaData = persona_data;
  const assessmentData = assessment_data;

  console.log("Fetched data:", job);
  console.log("Error:", error);
  console.log("Fetched persona data:", personaData);
  console.log("Persona error:", personaError);
  console.log("Fetched assessment data:", assessmentData);
  console.log("Assessment error:", assessmentError);

  return (
    <JobsManagmentReviewPage
      job={jobData}
      personaData={personaData}
      assessmentData={assessmentData}
    />
  );
}
