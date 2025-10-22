"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrimaryButton } from "@/components/design-system";
import { SecondaryButton } from "@/components/design-system/primary-button";
import { useRouter } from "next/navigation";
import { JobSeekerRoutes } from "../../router";

export function JobCard({ job, onJobSelect, onShowDetails }) {
  const router = useRouter();

  return (
    <Card className="p-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-gray-900 text-lg">
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

          <div className="flex flex-row font-light text-sm gap-1 items-center text-gray-500 ">
            <Building className="w-4 h-4" />
            {job.company_name}
          </div>

          <div className="flex flex-row gap-6">
            <div className="flex items-center gap-1 text-gray-500 text-sm font-light">
              <MapPin className="w-4 h-4" />
              {job.location ? job.location : "Not specified"}
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm font-light">
              {job.salary_range}
            </div>
            <div className="flex flex-row">
              <Badge variant="outline" className="text-xs">
                {job.job_type}
              </Badge>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex items-center text-sm text-orange-600 bg-orange-100 py-1 px-2 font-light rounded-md ">
              Apply by {job.application_deadline}
            </div>
          </div>
        </div>

        <div className=" flex flex-col justify-start items-end gap-2">
          <Button variant="ghost" className="hover:bg-gray-100" size="icon">
            <Heart />
          </Button>
          <div className="flex flex-row gap-4 text-sm">
            <SecondaryButton
              text="Details"
              icon={<Eye />}
              className="text-sm"
              onClick={() => {
                onJobSelect(job);
                onShowDetails(true);
              }}
            />
            <PrimaryButton
              text="View & Apply"
              className="text-sm"
              onClick={() => router.push(JobSeekerRoutes.applyJobs(job.id))}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
