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
  ExternalLink,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { JobSeekerRoutes } from "../../router";

export function JobCard({
  job,
  isSaved,
  onToggleSave,
  hasApplied = false,
  hasInterviewLink = false,
}) {
  const router = useRouter();

  return (
    <Card
      key={job.id}
      className="hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer border-border/40"
      onClick={() => {
        if (job.source === "external") {
          router.push(JobSeekerRoutes.applyExternalJobs(job.id));
        } else {
          router.push(JobSeekerRoutes.applyJobs(job.id));
        }
      }}
    >
      <CardContent className="px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1 gap-3">
                {/* Job Title and Badges */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="text-lg font-semibold text-foreground truncate">
                    {job.job_title}
                  </div>
                  {job.source === "pollen" && (
                    <Badge
                      variant="default"
                      className="bg-pink-100 text-pink-600 border-pink-200 items-center justify-center gap-1 flex flex-row"
                    >
                      <Shield className="w-3 h-3" />
                      <div>Pollen Approved</div>
                    </Badge>
                  )}
                  {job.source === "external" && (
                    <Badge
                      variant="default"
                      className="flex flex-row bg-blue-50 text-blue-600 border-blue-200 items-center justify-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <div>External</div>
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

                {/* View & Apply Button or Applied Badges */}
                {hasApplied ? (
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-700 border-green-200 h-8 px-4"
                    >
                      <span className="text-xs font-medium">
                        ✓ Application Submitted
                      </span>
                    </Badge>
                    {hasInterviewLink && (
                      <Badge
                        variant="default"
                        className="bg-purple-100 text-purple-700 border-purple-200 h-8 px-4 flex items-center gap-1"
                      >
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs font-medium">
                          Schedule Interview
                        </span>
                      </Badge>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    className="h-8 px-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (job.source === "external") {
                        router.push(JobSeekerRoutes.applyExternalJobs(job.id));
                      } else {
                        router.push(JobSeekerRoutes.applyJobs(job.id));
                      }
                    }}
                  >
                    <span className="text-xs">View & Apply</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
