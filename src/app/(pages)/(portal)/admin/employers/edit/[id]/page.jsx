import { fetchEmployerProfile } from "./actions";
import EditEmployerPage from "./edit-page";

export default async function Page({ params }) {
  const { id } = await params;
  const { data, error } = await fetchEmployerProfile(id);

  if (error || !data) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-semibold text-gray-900">
          Error loading employer profile
        </h1>
        <p className="text-gray-600 mt-2">{error || "Profile not found"}</p>
      </div>
    );
  }

  return <EditEmployerPage employerData={data} />;
}
