import { fetchJobProfile } from "../actions"
import JobProfileConsolidated from "../job-profile-consolidated";

export default async function JobReviewPage({ params }) {
  const { id } = await params;
  console.log('Employer ID from URL:', id);

  const { data, error } = await fetchJobProfile(id);

  console.log('Fetched data:', data);
  console.log('Error:', error);

  const jobData = data && !error ? data : jobProfile;

  return <JobProfileConsolidated job={jobData} />
}
