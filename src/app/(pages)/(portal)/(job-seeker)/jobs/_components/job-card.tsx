import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building } from "lucide-react";

export function JobCard({ job }) {
  return (
    <Card className="p-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-gray-900 text-base">
            {job.job_title}
          </div>

          {job.pollen_approved && (
            <div className="flex flex-row">
              <Badge
                variant="default"
                className=" bg-pink-100 text-pink-600 text-xs"
              >
                Pollen Approved
              </Badge>
            </div>
          )}

          <div className="w-full font-light text-md text-gray-600">
            {job.company_name}
          </div>

          <div className="flex flex-row gap-4">
            <div>location</div>
            <div>salary</div>
            <div>type</div>
          </div>
          <div>{job.application_deadline}</div>
        </div>
        <div
          id="botones"
          className=" flex flex-col justify-start items-end gap-2"
        >
          <div>Save</div>
          <div className="flex flex-row gap-4">
            <div>Details</div>
            <div>View & Apply</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
