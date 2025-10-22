"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  Shield,
  Star,
  List,
  MapPin,
  Heart,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/buttons/button";

import { Card, CardContent } from "@/components/ui/card";
import { PageContainer, PageHeader } from "@/components/design-system";
import PollenApprovedJobs from "./_components/pollen-approved";
import ExternalJobs from "./_components/external-jobs";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setViewMode] = useState("all");
  const [industryFilter, setIndustryFilter] = useState(["all"]);
  const [locationFilter, setLocationFilter] = useState(["all"]);
  const [contractFilter, setContractFilter] = useState(["all"]);
  const [jobTypeFilter, setJobTypeFilter] = useState("all"); // all, pollen, external
  const [isPersonalizedView, setIsPersonalizedView] = useState(true);

  const [, setSelectedJob] = useState(null);
  const [, setShowJobDetails] = useState(false);

  const router = useRouter();

  const getJobContractTypes = (job) => {
    if (Array.isArray(job.contractType)) {
      return job.contractType;
    }
    return [job.contractType];
  };

  // Mock data for industries
  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Sales",
    "Design",
    "Engineering",
  ];

  // Mock data for locations
  const locations = [
    "London",
    "Manchester",
    "Birmingham",
    "Edinburgh",
    "Remote",
    "Hybrid",
    "Glasgow",
    "Bristol",
  ];

  // Mock data for contract types
  const contractTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
    "Freelance",
  ];

  // Mock data for hidden (Pollen) jobs
  const hiddenJobs = [
    {
      id: 1,
      role: "Junior Software Developer",
      company: "Tech Solutions Ltd",
      location: "London",
      contractType: "Full-time",
      salary: "£35,000",
      pollenApproved: true,
      rating: 4.5,
      applicationDeadline: new Date(),
    },
    {
      id: 2,
      role: "Marketing Assistant",
      company: "Digital Growth",
      location: "Manchester",
      contractType: "Full-time",
      salary: "£28,000",
      pollenApproved: true,
      rating: 4.2,
      applicationDeadline: new Date(),
    },
  ];

  // Mock data for external jobs
  const externalJobs = [
    {
      id: 3,
      role: "Junior Web Designer",
      company: "Creative Agency",
      location: "Remote",
      contractType: "Contract",
      salary: "£25,000",
      pollenApproved: false,
      applicationDeadline: new Date(),
    },
    {
      id: 4,
      role: "Data Analyst Intern",
      company: "Data Insights Co",
      location: "Birmingham",
      contractType: "Internship",
      salary: "£20,000",
      pollenApproved: false,
      applicationDeadline: new Date(),
    },
  ];

  // Mock data for saved jobs
  const savedJobs = [{ id: 1 }, { id: 3 }];

  // Helper function for external company websites
  const getCompanyWebsiteUrl = (company) => {
    return `https://www.${company.toLowerCase().replace(/\s+/g, "")}.com`;
  };

  // Sort jobs based on filters
  const sortedJobs = [...hiddenJobs, ...externalJobs].filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJobType =
      jobTypeFilter === "all" ||
      (jobTypeFilter === "pollen" && job.pollenApproved) ||
      (jobTypeFilter === "external" && !job.pollenApproved);
    const matchesIndustry = industryFilter.includes("all");
    const matchesLocation =
      locationFilter.includes("all") || locationFilter.includes(job.location);
    const matchesContract =
      contractFilter.includes("all") ||
      contractFilter.includes(job.contractType);

    return (
      matchesSearch &&
      matchesJobType &&
      matchesIndustry &&
      matchesLocation &&
      matchesContract
    );
  });

  // Mock mutations
  const saveJobMutation = {
    mutate: (id) => console.log(`Saving job ${id}`),
    isPending: false,
  };

  // Función para manejar la acción del botón de aplicar
  const handleJobAction = (job) => {
    if (job.pollenApproved) {
      router.push(`/jobs/${job.id}`);
    } else {
      window.open(getCompanyWebsiteUrl(job.company), "_blank");
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Find Your Next Opportunity"
        subtitle="Explore job openings tailored to your skills and preferences."
      />

      <div className="text-left mb-6">
        <div className="grid md:grid-cols-2 gap-4 w-full mb-6">
          <PollenApprovedJobs />
          <ExternalJobs />
        </div>

        {sortedJobs.length === 0 ? (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {!isPersonalizedView
                ? "No jobs found"
                : "No personalised jobs available"}
            </h3>
            <p className="text-gray-600 mb-4">
              {!isPersonalizedView
                ? "Try adjusting your search filters"
                : "Complete your profile to get better recommendations"}
            </p>
            {isPersonalizedView && (
              <Button
                onClick={() => setIsPersonalizedView(false)}
                variant="outline"
                className="text-blue-600 border-blue-400"
              >
                View All Jobs
              </Button>
            )}
          </div>
        ) : (
          sortedJobs.map((job) => {
            const isJobSaved =
              Array.isArray(savedJobs) &&
              savedJobs.some((saved) => String(saved.id) === String(job.id));
            return (
              <Card key={job.id} className="border border-gray-200 bg-white">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Company Logo - Improved Design */}
                    <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-50">
                      <span className="text-gray-700 font-bold text-lg">
                        {job.company.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    {/* Job Details - Redesigned Layout */}
                    <div className="flex-1 space-y-3">
                      {/* Job Title and Status */}
                      <div className="space-y-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-xl text-gray-900 leading-tight">
                              {job.role}
                            </h3>
                            {job.pollenApproved && (
                              <Badge className="bg-[#E2007A] text-white text-xs font-medium mt-1 w-fit">
                                <Shield className="w-3 h-3 mr-1 text-white" />
                                Pollen Approved
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                          {job.pollenApproved ? (
                            <a
                              href={`/company/${job.company.toLowerCase().replace(/\s+/g, "-")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 font-medium text-base hover:text-[#E2007A] hover:underline cursor-pointer"
                            >
                              {job.company}
                            </a>
                          ) : (
                            <a
                              href={getCompanyWebsiteUrl(job.company)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 font-medium text-base hover:text-blue-600 hover:underline cursor-pointer"
                            >
                              {job.company}
                            </a>
                          )}

                          {job.pollenApproved && job.rating && (
                            <div
                              className="flex items-center gap-1"
                              title="Average applicant rating from candidates who've completed assessments"
                            >
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600">
                                {job.rating} applicant rating
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Job Details Row */}
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-gray-800">
                            {job.salary?.startsWith("£")
                              ? job.salary
                              : job.salary
                                ? `£${job.salary}`
                                : "Competitive"}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border-gray-300"
                        >
                          {getJobContractTypes(job)[0]}
                        </Badge>
                      </div>

                      {/* Application Deadline */}
                      {job.applicationDeadline && (
                        <div className="flex items-center gap-1.5 text-orange-600 text-sm bg-orange-50 px-3 py-1.5 rounded-md">
                          <span className="font-medium">
                            Apply by{" "}
                            {new Date(
                              job.applicationDeadline,
                            ).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}

                      {/* External Job Badge */}
                      {!job.pollenApproved && (
                        <Badge
                          variant="outline"
                          className="border-gray-400 text-gray-600 text-xs w-fit"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          External Job
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons - Vertical Layout */}
                    <div className="flex flex-col gap-2 items-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => saveJobMutation.mutate(job.id)}
                        className={`p-2 ${isJobSaved ? "text-[#E2007A] bg-pink-50" : "text-gray-400 hover:text-[#E2007A] hover:bg-gray-50"}`}
                        disabled={saveJobMutation.isPending}
                      >
                        <Heart
                          className={`w-4 h-4 ${isJobSaved ? "fill-current" : ""}`}
                        />
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedJob(job);
                            setShowJobDetails(true);
                          }}
                          className="text-gray-600 hover:text-[#E2007A] border-gray-300"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                        <Button
                          onClick={() => handleJobAction(job)}
                          className="bg-[#E2007A] hover:bg-[#E2007A]/90 text-white px-4 py-2 text-sm font-medium rounded-lg shadow-sm"
                        >
                          {job.pollenApproved ? "View & Apply" : "Apply"} →
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </PageContainer>
  );
}
