import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Building2, Calendar, Users } from "lucide-react";
import { JobStatusBadge } from "../../../../../../components/design-system/job-status-badge";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "@/admin/router";

export function JobCardItem({ job, showAdminBadge }) {
  const router = useRouter();

  return (
    <Card
      key={job.id}
      className="hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer border-border/40"
      onClick={() => {
        router.push(AdminRoutes.jobView(job.id));
      }}
    >
      <CardContent className="px-5 pt-3 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1 space-y-2">
                {/* Job Title and Status */}
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {job.job_title}
                  </h3>
                  <JobStatusBadge status={job.status} />
                </div>

                {/* Company and Date */}
                <div className="flex flex-col items-start gap-2 text-muted-foreground text-sm">
                  <div className="flex  gap-2">
                    <Building2 className="w-4 h-4  mt-0.5" />
                    <span className="truncate">{job.company_name}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Calendar className="w-4 h-4 " />
                    <span className="truncate">
                      {job.status === "draft"
                        ? `Created ${new Date(job.assigned_date).toLocaleDateString()}`
                        : `Published ${new Date(job.assigned_date).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`flex flex-col items-end justify-end  `}>
                {/* Right Section - Total Applications */}

                <div className={`flex flex-col text-muted-foreground gap-2 `}>
                  {/* Total applications */}
                  <div className="flex flex-col items-end justify-end gap-2">
                    <p className="text-sm text-gray-700 ">
                      Total Applications:
                    </p>
                    <p className="text-base font-semibold text-foreground">
                      {job.total_applications}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className=" flex flex-row justify-between border-t border-border/50 p-2">
              {/* Assigned Admin */}
              {job.assigned_to ? (
                <Badge
                  variant="outline"
                  className={`bg-blue-50 text-blue-700 border-blue-200 font-medium ${showAdminBadge ? "" : "hidden"}`}
                >
                  Assigned to: {job.assigned_to}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-gray-50 text-gray-600 border-gray-200 font-medium"
                >
                  Unassigned{" "}
                  <span className="text-gray-500">(No Admin Assigned)</span>
                </Badge>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-1 p-1">
                {job.status !== "draft" && (
                  <Button
                    variant="pollen"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(AdminRoutes.jobsApplicants(job.id));
                    }}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-xs">View Candidates</span>
                  </Button>
                )}
                <Button
                  variant="pollen"
                  size="sm"
                  className={
                    "h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(AdminRoutes.jobView(job.id));
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="text-xs">
                    {job.status === "draft"
                      ? "Review & Approve"
                      : "Job Details"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
