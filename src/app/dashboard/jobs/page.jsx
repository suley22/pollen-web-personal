"use client";

import { ExternalLink, CheckCircle, Shield, Search } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState(["all"]);
  const [locationFilter, setLocationFilter] = useState(["all"]);
  const [contractFilter, setContractFilter] = useState(["all"]);
  const [jobTypeFilter, setJobTypeFilter] = useState("all"); // all, pollen, external

  const pathname = usePathname();
  const router = useRouter();

  const hiddenJobs = [];
  const loadingHidden = false;
  const externalJobs = [];
  const loadingExternal = false;

  const allJobs = [...hiddenJobs, ...externalJobs];

  const isLoading = loadingHidden || loadingExternal;

  const industries = [];
  const locations = [];
  const contractTypes = [];

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

            {/* Search and Filters */}
          </div>
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
        </div>
      </div>
    </div>
  );
}
