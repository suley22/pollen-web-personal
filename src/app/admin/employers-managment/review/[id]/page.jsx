import EmployerProfileConsolidated from "../employer-profile-consolidated";
import { employerProfile } from "../(mocks)/employer-profile-mock";
import { fetchEmployerProfile } from "../actions"

export default async function EmployerReviewPage({ params }) {
  const { id } = await params;
  console.log('Employer ID from URL:', id);

  const { data, error } = await fetchEmployerProfile(id);

  console.log('Fetched data:', data);
  console.log('Error:', error);

  const employerData = data && !error ? data : employerProfile;

  return <EmployerProfileConsolidated employerProfile={employerData} />
}
