import EmployerProfileView from "@/employers/view/view";
import { fetchEmployerProfileAction } from "@/employers/actions";

export default async function EmployerReviewPage({ params }) {
  // Await the params to get the actual parameters
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  // Fetch employer data on the server side
  const result = await fetchEmployerProfileAction(id);
  const employerData = result?.data || null;

  return <EmployerProfileView employerProfile={employerData} />;
}
