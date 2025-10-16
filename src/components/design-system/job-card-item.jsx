import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Building2, Calendar, UserCircle, Users } from "lucide-react";

export default function JobCardItem({
  job,
  form,
  router,
  routes,
  showAdminBadge = true,
}) {
  return (
    <Card
      key={job.id}
      className="hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer border-border/40"
      onClick={() => {
        router.push(routes.jobView(job.id));
      }}
    >
      <CardContent className="px-5 py-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1 gap-4">
                <div className="">
                  {/* Job Title and Status */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {job.job_title}
                    </h3>
                    {form.getStatusBadge(job.status)}
                  </div>
                  {/* Company and Date */}
                  <div className="flex flex-row items-center gap-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex flex-row items-start gap-4 text-muted-foreground">
                        <div className="flex justify-center gap-2">
                          <Building2 className="w-4 h-4  mt-0.5" />
                          <span className="truncate">{job.company_name}</span>
                        </div>
                        <div className="flex justify-center gap-2 mt-0.5">
                          <Calendar className="w-4 h-4 text-gray-600 " />
                          <span className="truncate">
                            {job.status === "draft"
                              ? `Created ${new Date(job.assigned_date).toLocaleDateString()}`
                              : `Published ${new Date(job.assigned_date).toLocaleDateString()}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="text-sm">
                  <p>Applicants Status:</p>
                  <div className="flex items-center gap-2  flex-wrap text-muted-foreground">
                    <div className="flex items-center gap-1.5 font-medium">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>
                        {job.new_applications_to_review ??
                          job.newApplicationsToReview}{" "}
                        New
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <span>
                        {job.pollen_interviews_booked ??
                          job.pollenInterviewsBooked}{" "}
                        In Progress
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>
                        {job.candidates_matched_to_employer ??
                          job.candidatesMatchedToEmployer}{" "}
                        Matched
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span>{job.feedbackSent} Complete</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Total Applications */}
              <div className="flex flex-col justify-start">
                <div className="text-right space-y-1 bg-pink-50 px-4 py-2 rounded-lg border border-pink-200">
                  <div className="text-xs text-pink-700 font-medium">
                    Total Applications
                  </div>
                  <div className="text-2xl font-bold text-pink-900">
                    {job.total_applications}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50 pt-3 mt-3">
              {/* Status Breakdown and Actions */}
              <div className="flex flex-row justify-between items-center">
                {job.assigned_to ? (
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 font-medium"
                  >
                    Assigned to: {job.assigned_to}
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-gray-50 text-gray-600 border-gray-200 font-medium"
                  >
                    Unassigned
                  </Badge>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  {job.status !== "draft" && (
                    <Button
                      variant="pollen"
                      size="sm"
                      className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(routes.jobsApplicants(job.id));
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
                      job.status === "draft"
                        ? "h-8 px-2 bg-pink-600 hover:bg-pink-700 text-white"
                        : "h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(routes.jobView(job.id));
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
        </div>
      </CardContent>
    </Card>
  );
}
