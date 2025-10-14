import EmployerProfileView from "../employer-profile-view";
import { fetchEmployerProfile } from "../actions";

export default async function EmployerReviewPage({ params }) {
  const { id } = await params;
  const { data, error } = await fetchEmployerProfile(id);

  const employerData = data && !error ? data : null;

  return <EmployerProfileView employerProfile={employerData} />;
}
