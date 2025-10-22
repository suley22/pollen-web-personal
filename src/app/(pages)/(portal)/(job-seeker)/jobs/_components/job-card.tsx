import { Card } from "@/components/ui/card";

export function JobCard({ job }) {
  return (
    <Card className="p-4">
      <div className="flex flex-row justify-between">
        <div id="datos">
          <div>{job.job_title}</div>
          <div>{job.pollen_approved ? "Pollen Approved" : "Not Approved"}</div>
          <div>{job.company_name}</div>
          <div>{job.location}</div>
          <div>{job.application_deadline}</div>
        </div>
        <div id="botones" className=" flex flex-col justify-start items-end">
          <div>Save</div>
          <div className="flex flex-row">
            <div>Details</div>
            <div>View & Apply</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
