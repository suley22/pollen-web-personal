import EmployerProfileConsolidated from "./employer-profile-consolidated";
import { fetchEmployerProfile } from "./actions";

export default async function EmployerReviewPage() {
  const { data, error } = await fetchEmployerProfile(1);

  console.log(data);
  console.log(error);

  return <EmployerProfileConsolidated employerProfile={data} />;
}

// Si la pagina tiene que cargar alguna información al momento de mostrarse
// Se debe crear un server component, hacer la consulta
// y pasarsela a los widget que lo necesiten

// Intener que la mayoría de componentes sean server components
// NO usan "use client";
