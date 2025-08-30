import EmployerProfileConsolidated from "./employer-profile-consolidated";
import { employerProfile } from "./(mocks)/employer-profile-mock";
import { fetchEmployerProfile } from "./actions"

export default async function EmployerReviewPage() {
  const { data, error } = await fetchEmployerProfile(1)

  console.log(data)
  console.log(error)

  return <EmployerProfileConsolidated employerProfile={employerProfile} />
}