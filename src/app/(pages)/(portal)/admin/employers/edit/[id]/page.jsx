import {
  fetchEmployerByIdAction,
  updateEmployerAction,
} from "@/employers/actions";
import { ProfileForm } from "@/employers/form";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const { data, error } = await fetchEmployerByIdAction(id);

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

  const employer = data;
  const updateWithId = updateEmployerAction.bind(null, employer.id);

  return <ProfileForm employer={employer} action={updateWithId} />;
}
