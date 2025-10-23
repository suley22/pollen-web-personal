export default function JobDetails({ job }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <div className="flex flex-row gap-4">
        Company logo
        <div className="flex flex-col gap-2">
          Job title
          <div className="flex flex-row gap-2">
            <div>Company Name</div>
            <div>Location</div>
            <div>Remote</div>
          </div>
          <div>Salary</div>
          <div>Application deadline: Date</div>
        </div>
      </div>
    </div>
  );
}
