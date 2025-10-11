"use client";

import { useRouter } from "next/navigation";
import {
  MapPin,
  Eye,
  User,
  Mail,
  Trophy,
  Clock,
  Briefcase,
  Search,
} from "lucide-react";
import { Button } from "@/app/components/ui/buttons/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select/select";
import { useJobSeeker } from "./useJobSeeker";

export default function JobsPage() {
  const router = useRouter();
  const { form } = useJobSeeker();

  const toLabel = (s) =>
    String(s)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // valores únicos por facet (derivados del dataset)
  const facets = {
    status: [...new Set(form.jobSeekers.map((j) => j.status))],
    application: [
      ...new Set(
        form.jobSeekers.map((j) =>
          j.total_applications > 0 ? "has_applied" : "not_applied",
        ),
      ),
    ],
    profile: [...new Set(form.jobSeekers.map((j) => j.profile_complete))],
  };

  // binding de cada facet con su estado correspondiente
  const facetMeta = [
    { key: "status", value: form.statusFilter, onChange: form.setStatusFilter },
    {
      key: "application",
      value: form.applicationFilter,
      onChange: form.setApplicationFilter,
    },
    {
      key: "profile",
      value: form.profileFilter,
      onChange: form.setProfileFilter,
    },
  ];

  return (
    <div>
      <div className="mx-auto p-4 space-y-4">
        <div className="text-left mb-6">
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3 mb-3">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies, or industries..."
                  value={form.searchTerm}
                  onChange={(e) => form.setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
                {facetMeta.map(({ key, value, onChange }) => (
                  <Select key={key} value={value} onValueChange={onChange}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder={`All ${toLabel(key)}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{`All ${toLabel(key)}`}</SelectItem>
                      {facets[key].map((v) => (
                        <SelectItem key={String(v)} value={String(v)}>
                          {toLabel(v)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs Display */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[280px]">
                    Job Seeker
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[180px]">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[140px]">
                    Profile
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[100px]">
                    Assessment
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[120px]">
                    Applications
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[200px]">
                    Last Activity
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[200px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {form.jobSeekers.map((jobSeeker) => (
                  <tr key={jobSeeker.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-1 space-x-3">
                        <div className="flex-shrink-0">
                          {jobSeeker.profile_picture ? (
                            <img
                              src={jobSeeker.profile_picture}
                              alt={jobSeeker.name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6  text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-base">
                            {jobSeeker.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {jobSeeker.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {jobSeeker.location}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-2 px-4">
                      {form.getStatusBadge(jobSeeker.status)}
                    </td>
                    <td className="py-2 px-4">
                      {form.getProfileCompleteBadge(jobSeeker.profile_complete)}
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        {jobSeeker.assessment_completed ? (
                          <>
                            <Trophy className="h-4 w-4 text-blue-500 mr-1" />
                            <span className="text-sm font-medium text-blue-600">
                              {jobSeeker.overall_skills_score}%
                            </span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="text-sm text-gray-500">
                              Pending
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm">
                          {jobSeeker.total_applications}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <span className="text-sm text-gray-600">
                        {new Date(jobSeeker.last_activity).toLocaleDateString(
                          "en-GB",
                        )}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
