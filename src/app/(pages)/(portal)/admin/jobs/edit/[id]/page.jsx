import { fetchJobByIdAction, updateJobAction } from "../../actions";
import { JobForm } from "../../form";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const { data, error } = await fetchJobByIdAction(id);

  if (error || !data) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-semibold text-gray-900">
          Error loading job
        </h1>
        <p className="text-gray-600 mt-2">{error || "Job not found"}</p>
      </div>
    );
  }

  // Combinar job y assessment en un solo objeto
  const job = {
    ...data.job,
    assessment: data.assessment,
  };

  const updateWithId = updateJobAction.bind(null, job.id);

  return <JobForm job={job} action={updateWithId} />;
}
