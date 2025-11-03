import JobApplicantsView from "./_view/job-applicants-view";

export default function JobApplicantsPage() {
  // TODO: En el futuro, recibir jobId desde params o searchParams
  // Ejemplo: const jobId = params.jobId || searchParams.get('jobId')
  const MOCK_JOB_ID = "139ad003-8062-4cf2-8aee-354451d51798"; // UUID temporal para desarrollo

  return <JobApplicantsView jobId={MOCK_JOB_ID} />;
}
