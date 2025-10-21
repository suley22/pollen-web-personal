export default function JobDetails({ job }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{job.job_title}</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Company:</span> {job.company_name}
      </p>
      {/* Agrega más detalles del trabajo según sea necesario */}
    </div>
  );
}
