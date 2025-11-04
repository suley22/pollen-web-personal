"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Eye, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { useJobSeeker } from "../_hooks/job-seekers-page-hook";
import {
  PageContainer,
  PageHeader,
  Filters,
  EmptyState,
} from "@/components/design-system";
import { JobSeekersTableSkeleton } from "./job-seekers-table-skeleton";

export default function JobSeekersView() {
  const router = useRouter();
  const { form } = useJobSeeker();

  const toLabel = (s) =>
    String(s)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // valores únicos por facet (derivados del dataset)
  const facets = {
    status: [...new Set(form.jobSeekers.map((j) => j.status))],
    profile: [...new Set(form.jobSeekers.map((j) => j.profile_complete))],
  };

  // binding de cada facet con su estado correspondiente
  const toOptions = (arr, allLabel) => [
    { label: allLabel, value: "all" },
    ...arr
      .filter((v) => v !== undefined && v !== null)
      .map((v) => ({ label: toLabel(v), value: String(v) })),
  ];

  const filterConfigs = [
    {
      name: "status",
      placeholder: "All Statuses",
      defaultValue: form.statusFilter,
      options: toOptions(facets.status, "All Statuses"),
      onValueChange: form.setStatusFilter,
    },
    {
      name: "role",
      placeholder: "All Roles",
      defaultValue: form.roleFilter,
      options: toOptions(form.roleOptions || [], "All Roles"),
      onValueChange: form.setRoleFilter,
    },
    {
      name: "profile",
      placeholder: "All Profiles",
      defaultValue: form.profileFilter,
      options: toOptions(facets.profile, "All Profiles"),
      onValueChange: form.setProfileFilter,
    },
  ];

  return (
    <PageContainer>
      <PageHeader title="Job Seekers" subtitle="Manage job seekers" />
      <div className="flex flex-col w-full gap-5">
        {/* Search and Filters - keep mounted so it doesn't collapse during loading */}
        <Filters
          onSearchChange={form.setSearchTerm}
          searchValue={form.searchTerm}
          searchPlaceholder="Search job seekers, roles, or locations..."
          filters={filterConfigs}
          collapsible={true}
        />

        {/* Jobs Display */}
        <div className="bg-white rounded-lg border overflow-hidden">
          {form.loading ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 w-auto font-medium text-gray-900">
                    Job Seeker
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 w-[1%] whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 w-[1%] whitespace-nowrap">
                    Profile
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 w-[1%] whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <JobSeekersTableSkeleton rows={6} />
            </table>
          ) : form.jobSeekers.length === 0 ? (
            <EmptyState
              title="No job seekers found"
              description="Try clearing your search or resetting filters to see more results."
              action={
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      form.setSearchTerm("");
                    }}
                  >
                    Clear search
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      form.setStatusFilter("all");
                      form.setProfileFilter("all");
                      form.setRoleFilter("all");
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              }
            />
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 w-auto font-medium text-gray-900">
                    Job Seeker
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 w-[1%] whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 w-[1%] whitespace-nowrap">
                    Profile
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 w-[1%] whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {form.jobSeekers.map((jobSeeker) => {
                  const status = jobSeeker.status
                    ? jobSeeker.status
                    : "undefined";
                  const name = jobSeeker.first_name + " " + jobSeeker.last_name;
                  const role = jobSeeker.role
                    ? toLabel(String(jobSeeker.role).trim())
                    : "N/A";

                  return (
                    <tr
                      key={jobSeeker.id}
                      className="border-b hover:bg-gray-50"
                    >
                      {/* Job Seeker Column */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 space-x-3">
                          <div className="flex-shrink-0">
                            <Avatar className="h-16 w-16">
                              <AvatarImage
                                src={jobSeeker.avatar_url}
                                alt={name}
                              />
                              <AvatarFallback>
                                <User className="h-8 w-8 text-gray-300" />
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <div className="font-medium text-base">{name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {jobSeeker.email || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {jobSeeker.location || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="py-2 px-4 w-[1%] whitespace-nowrap">
                        <div className="w-fit inline-flex">
                          {form.getStatusBadge(status)}
                        </div>
                      </td>

                      {/* Profile Column */}
                      <td className="py-2 px-4 w-[1%] whitespace-nowrap">
                        <div className="w-fit inline-flex">
                          {role == "Admin" ? (
                            form.getProfileCompleteBadge("admin")
                          ) : (
                            <>
                              {form.getProfileCompleteBadge(
                                jobSeeker.profile_complete,
                              )}
                            </>
                          )}
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td className="py-2 px-4 w-[1%] whitespace-nowrap text-right">
                        <div className="flex items-center w-fit inline-flex">
                          <Button
                            variant="ghost"
                            size="lg"
                            onClick={() =>
                              router.push(`/admin/job-seekers/${jobSeeker.id}`)
                            }
                            className="!text-base !font-medium !font-sora text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
