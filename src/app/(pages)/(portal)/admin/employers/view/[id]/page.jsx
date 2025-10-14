import EmployerProfileConsolidated from "../employer-profile-consolidated";
import { fetchEmployerProfile } from "../actions";

export default async function EmployerReviewPage({ params }) {
  const { id } = await params;
  const { data, error } = await fetchEmployerProfile(id);

  const employerData = data && !error ? data : null;

  return <EmployerProfileConsolidated employerProfile={employerData} />;
}
