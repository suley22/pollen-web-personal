"use client";

import { useState } from "react";
import { SearchAndFilterBar } from "./_components/search-and-filter-bar";

import { PageContainer, PageHeader } from "@/components/design-system";
import PollenApprovedJobs from "./_components/pollen-approved";
import ExternalJobs from "./_components/external-jobs";
import JobListSection from "./_components/job-list-section";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [jobIndustriesFilter, setJobIndustriesFilter] = useState("all");
  const [jobLocationsFilter, setJobLocationsFilter] = useState("all");
  const [jobContractTypesFilter, setJobContractTypesFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);

  const filters = {
    searchTerm,
    jobType: jobTypeFilter,
    industry: jobIndustriesFilter,
    location: jobLocationsFilter,
    contractType: jobContractTypesFilter,
  };

  return (
    <PageContainer>
      <PageHeader
        title="Find Your Next Opportunity"
        subtitle="Explore job openings tailored to your skills and preferences."
      />

      <div className="flex flex-col gap-4">
        <div className="grid md:grid-cols-2 gap-4 w-full">
          <PollenApprovedJobs />
          <ExternalJobs />
        </div>

        <SearchAndFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          jobTypeFilter={jobTypeFilter}
          onJobTypeChange={setJobTypeFilter}
          jobIndustriesFilter={jobIndustriesFilter}
          onIndustriesChange={setJobIndustriesFilter}
          jobLocationsFilter={jobLocationsFilter}
          onLocationsChange={setJobLocationsFilter}
          jobContractTypesFilter={jobContractTypesFilter}
          onContractTypesChange={setJobContractTypesFilter}
        />
        <JobListSection 
          filters={filters}
          onJobSelect={setSelectedJob}
          onShowDetails={setShowJobDetails}
        />
      </div>
    </PageContainer>
  );
}
