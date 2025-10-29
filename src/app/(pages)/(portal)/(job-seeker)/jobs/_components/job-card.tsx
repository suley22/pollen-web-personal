"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/buttons/button";
import {
  MapPin,
  Building2,
  Heart,
  Calendar,
  PoundSterling,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { JobSeekerRoutes } from "../../router";

export function JobCard({ job, isSaved, onToggleSave }) {
  const router = useRouter();

  return (
    <Card
      key={job.id}
      className="hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer border-border/40"
      onClick={() => router.push(JobSeekerRoutes.applyJobs(job.id))}
    >
      <CardContent className="px-5 py-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1 space-y-2">
                {/* Job Title and Pollen Approved Badge */}
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {job.job_title}
                  </h3>
                  {job.pollen_approved && (
                    <Badge
                      variant="default"
                      className="bg-pink-100 text-pink-600 border-pink-200"
                    >
                      Pollen Approved
                    </Badge>
                  )}
                </div>

                {/* Company, Location, and Salary */}
                <div className="flex flex-col items-start gap-2 text-muted-foreground text-sm">
                  <div className="flex gap-2">
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{job.company_name}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {job.location || "Not specified"}
                    </span>
                  </div>
                  {job.salary_range && (
                    <div className="flex gap-2 items-center">
                      <PoundSterling className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{job.salary_range}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Section - Save Button */}
              <div className="flex flex-col justify-start items-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-pink-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave();
                  }}
                >
                  <Heart
                    className={`h-5 w-5 ${isSaved ? "fill-pink-600 text-pink-600" : "text-muted-foreground"}`}
                  />
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50 pt-3 mt-3">
              {/* Job Type, Deadline and Action Button */}
              <div className="flex flex-row justify-between items-center">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Job Type Badge */}
                  <Badge variant="outline" className="text-xs">
                    {job.working_hours}
                  </Badge>

                  {/* Application Deadline */}
                  {job.application_deadline && (
                    <div className="flex items-center gap-1 text-sm text-orange-600 bg-orange-50 py-1 px-2 rounded-md border border-orange-200">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs font-medium">
                        Apply by {job.application_deadline}
                      </span>
                    </div>
                  )}
                </div>

                {/* View & Apply Button */}
                <Button
                  variant="default"
                  size="sm"
                  className="h-8 px-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(JobSeekerRoutes.applyJobs(job.id));
                  }}
                >
                  <span className="text-xs">View & Apply</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
