export default function JobDetails({ job }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <div className="flex flex-row gap-4">
        Company logo
        <div className="flex flex-col">
          Company Name
          <div className="flex flex-row"> Company - Location - Time</div>
        </div>
      </div>
    </div>
  );
}
