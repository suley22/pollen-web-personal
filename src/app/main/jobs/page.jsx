"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  CheckCircle,
  Shield,
  Search,
  Star,
  List,
  MapPin,
  Heart,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setViewMode] = useState("all");
  const [industryFilter, setIndustryFilter] = useState(["all"]);
  const [locationFilter, setLocationFilter] = useState(["all"]);
  const [contractFilter, setContractFilter] = useState(["all"]);
  const [jobTypeFilter, setJobTypeFilter] = useState("all"); // all, pollen, external
  const [showAllInPersonalized, setShowAllInPersonalized] = useState(false);

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

  const allJobs = [...externalJobs, ...hiddenJobs];

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
    <div>
      <div className="container mx-auto p-4 space-y-4 jobs-page">
        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Find Your Next Opportunity
          </h1>
          <div className="grid md:grid-cols-2 gap-4 w-full mb-6">
            {/* Pollen Approved Jobs */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#E2007A] rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#E2007A] text-sm">
                    Pollen Approved Jobs
                  </h3>
                  <p className="text-xs text-gray-600">
                    Vetted employers with fair hiring
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-[#E2007A]" />
                  <span>No CV required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-[#E2007A]" />
                  <span>Guaranteed feedback</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-[#E2007A]" />
                  <span>Custom assessments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-[#E2007A]" />
                  <span>Fair hiring process</span>
                </div>
              </div>
            </div>

            {/* External Jobs */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 text-sm">
                    External Jobs
                  </h3>
                  <p className="text-xs text-gray-500">
                    Entry-level opportunities from other sites
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                <p>
                  These jobs are from external websites. We thought they looked
                  like a safe bet, but they aren't affiliated with Pollen, and
                  we don't endorse the companies or positions listed, so please
                  make sure to research each opportunity before applying.
                </p>
              </div>
            </div>
          </div>
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies, or industries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="pollen">Pollen Approved</SelectItem>
                    <SelectItem value="external">External</SelectItem>
                  </SelectContent>
                </Select>
                <div className="w-[180px]">
                  <Select
                    value={
                      industryFilter.includes("all")
                        ? "all"
                        : industryFilter.length === 1
                          ? industryFilter[0]
                          : "multiple"
                    }
                    onValueChange={(value) => {
                      if (value === "all") {
                        setIndustryFilter(["all"]);
                      } else {
                        if (industryFilter.includes("all")) {
                          setIndustryFilter([value]);
                        } else {
                          if (industryFilter.includes(value)) {
                            const newFilter = industryFilter.filter(
                              (i) => i !== value,
                            );
                            setIndustryFilter(
                              newFilter.length === 0 ? ["all"] : newFilter,
                            );
                          } else {
                            setIndustryFilter([
                              ...industryFilter.filter((i) => i !== "all"),
                              value,
                            ]);
                          }
                        }
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {industryFilter.includes("all")
                          ? "All Industries"
                          : industryFilter.length === 1
                            ? industryFilter[0]
                            : `${industryFilter.length} selected`}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {industries
                        .filter((industry) => industry && industry.trim())
                        .map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={
                                  industryFilter.includes(industry) &&
                                  !industryFilter.includes("all")
                                }
                                readOnly
                                className="w-3 h-3"
                              />
                              {industry}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-[180px]">
                  <Select
                    value={
                      locationFilter.includes("all")
                        ? "all"
                        : locationFilter.length === 1
                          ? locationFilter[0]
                          : "multiple"
                    }
                    onValueChange={(value) => {
                      if (value === "all") {
                        setLocationFilter(["all"]);
                      } else {
                        if (locationFilter.includes("all")) {
                          setLocationFilter([value]);
                        } else {
                          if (locationFilter.includes(value)) {
                            const newFilter = locationFilter.filter(
                              (l) => l !== value,
                            );
                            setLocationFilter(
                              newFilter.length === 0 ? ["all"] : newFilter,
                            );
                          } else {
                            setLocationFilter([
                              ...locationFilter.filter((l) => l !== "all"),
                              value,
                            ]);
                          }
                        }
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {locationFilter.includes("all")
                          ? "All Locations"
                          : locationFilter.length === 1
                            ? locationFilter[0]
                            : `${locationFilter.length} selected`}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations
                        .filter((location) => location && location.trim())
                        .map((location) => (
                          <SelectItem key={location} value={location}>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={
                                  locationFilter.includes(location) &&
                                  !locationFilter.includes("all")
                                }
                                readOnly
                                className="w-3 h-3"
                              />
                              {location}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-[180px]">
                  <Select
                    value={
                      contractFilter.includes("all")
                        ? "all"
                        : contractFilter.length === 1
                          ? contractFilter[0]
                          : "multiple"
                    }
                    onValueChange={(value) => {
                      if (value === "all") {
                        setContractFilter(["all"]);
                      } else {
                        if (contractFilter.includes("all")) {
                          setContractFilter([value]);
                        } else {
                          if (contractFilter.includes(value)) {
                            const newFilter = contractFilter.filter(
                              (t) => t !== value,
                            );
                            setContractFilter(
                              newFilter.length === 0 ? ["all"] : newFilter,
                            );
                          } else {
                            setContractFilter([
                              ...contractFilter.filter((t) => t !== "all"),
                              value,
                            ]);
                          }
                        }
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {contractFilter.includes("all")
                          ? "All Types"
                          : contractFilter.length === 1
                            ? contractFilter[0]
                            : `${contractFilter.length} selected`}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {contractTypes
                        .filter((type) => type && type.trim())
                        .map((type) => (
                          <SelectItem key={type} value={type}>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={
                                  contractFilter.includes(type) &&
                                  !contractFilter.includes("all")
                                }
                                readOnly
                                className="w-3 h-3"
                              />
                              {type}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          {/* Results Summary and View Toggle */}
          <div className="flex items-center justify-between py-4 px-2">
            <p className="text-sm text-gray-600">
              Showing {sortedJobs.length} of {allJobs.length} jobs
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#E2007A]" />
                  <span>Pollen Approved</span>
                </div>
                <div className="flex items-center gap-1">
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                  <span>External Application</span>
                </div>
              </div>
              <div className="flex items-center gap-1 border rounded-md">
                <Button
                  variant={"default"}
                  size="sm"
                  onClick={() => {
                    setViewMode("personalised");
                    setShowAllInPersonalized(false);
                  }}
                  className="h-8 px-3 text-xs"
                >
                  <Star className="w-4 h-4 mr-1" />
                  For You
                </Button>
                <Button
                  variant={"ghost"}
                  size="sm"
                  onClick={() => setViewMode("all")}
                  className="h-8 px-3 text-xs"
                >
                  <List className="w-4 h-4 mr-1" />
                  All Jobs
                </Button>
              </div>
            </div>
          </div>
          {/* Jobs Display */}

          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900 w-[280px]">
                    Role
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900 w-[180px]">
                    Company
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900 w-[140px]">
                    Location
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900 w-[100px]">
                    Type
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900 w-[120px]">
                    Salary
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900 w-[200px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedJobs.map((job) => {
                  const isJobSaved =
                    Array.isArray(savedJobs) &&
                    savedJobs.some(
                      (saved) => String(saved.id) === String(job.id),
                    );
                  return (
                    <tr key={job.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {job.pollenApproved ? (
                            <Shield className="w-4 h-4 text-[#E2007A] flex-shrink-0" />
                          ) : (
                            <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          )}
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {job.role}
                            </h3>
                            {job.pollenApproved && job.rating && (
                              <div
                                className="flex items-center gap-1 mt-1"
                                title="Average applicant rating from candidates who've completed assessments"
                              >
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600">
                                  {job.rating} applicant rating
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-left">
                          {job.pollenApproved ? (
                            <a
                              href={`/company/${job.company.toLowerCase().replace(/\s+/g, "-")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-900 font-medium hover:text-[#E2007A] hover:underline cursor-pointer text-left"
                            >
                              {job.company}
                            </a>
                          ) : (
                            <a
                              href={getCompanyWebsiteUrl(job.company)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-900 font-medium hover:text-blue-600 hover:underline cursor-pointer text-left"
                            >
                              {job.company}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">
                          {Array.isArray(job.contractType)
                            ? job.contractType[0]
                            : job.contractType}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-gray-900">
                          {job.salary?.startsWith("£")
                            ? job.salary
                            : job.salary
                              ? `£${job.salary}`
                              : "Competitive"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => saveJobMutation.mutate(job.id)}
                            className={
                              isJobSaved ? "text-pink-600" : "text-gray-400"
                            }
                            disabled={saveJobMutation.isPending}
                          >
                            <Heart
                              className={`w-4 h-4 ${isJobSaved ? "fill-current" : ""}`}
                            />
                          </Button>
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
                            size="sm"
                            onClick={() => handleJobAction(job)}
                            className="bg-[#E2007A] hover:bg-[#E2007A]/90 text-white"
                          >
                            {job.pollenApproved ? "View & Apply" : "Apply"} →
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/*Personalized Card View*/}
          <div className="space-y-4 mt-4">
            {/* Personalized Jobs Header */}
            {!showAllInPersonalized && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Jobs picked for you
                      </h3>
                      <p className="text-sm text-gray-600">
                        Based on your profile and preferences
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllInPersonalized(true)}
                    className="text-blue-600 border-blue-400 hover:bg-blue-500 hover:text-white"
                  >
                    View All Jobs
                  </Button>
                </div>
              </div>
            )}

            {/* Show message if viewing all in personalised mode */}
            {showAllInPersonalized && (
              <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <List className="w-4 h-4" />
                  <span className="text-sm">Showing all available jobs</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllInPersonalized(false)}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  Back to personalised
                </Button>
              </div>
            )}

            {sortedJobs.length === 0 ? (
              <div className="text-center py-12">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {showAllInPersonalized
                    ? "No jobs found"
                    : "No personalised jobs available"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {showAllInPersonalized
                    ? "Try adjusting your search filters"
                    : "Complete your profile to get better recommendations"}
                </p>
                {!showAllInPersonalized && (
                  <Button
                    onClick={() => setShowAllInPersonalized(true)}
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
                  savedJobs.some(
                    (saved) => String(saved.id) === String(job.id),
                  );
                return (
                  <Card
                    key={job.id}
                    className="border border-gray-200 bg-white"
                  >
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
        </div>
      </div>
    </div>
  );
}
