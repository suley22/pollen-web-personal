import EmployerProfileView from "@/employers/view/view";
import { fetchEmployerByIdAction } from "@/employers/actions";

export default async function EmployerReviewPage({ params }) {
  const { id } = await params;
  const { data, error } = await fetchEmployerByIdAction(id);

  const employerData = data && !error ? data : null;

  return <EmployerProfileView employerProfile={employerData} />;
}
