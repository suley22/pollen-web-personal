"use client";

import { SearchAndFilterBar } from "./_components/search-and-filter-bar";
import { PageContainer, PageHeader } from "@/components/design-system";
import PollenApprovedJobs from "./_components/pollen-approved";
import ExternalJobs from "./_components/external-jobs";
import JobListSection from "./_components/job-list-section";
import JobDetailsDialog from "./_components/job-details-dialog";
import { useJobs } from "./_hooks/useJobPage";

export default function JobsPage() {
  const {
    jobs,
    searchTerm,
    setSearchTerm,
    jobTypeFilter,
    setJobTypeFilter,
    jobIndustriesFilter,
    setJobIndustriesFilter,
    jobLocationsFilter,
    setJobLocationsFilter,
    jobContractTypesFilter,
    setJobContractTypesFilter,
    selectedJob,
    setSelectedJob,
    showJobDetails,
    setShowJobDetails,
  } = useJobs();

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
          onJobSelect={setSelectedJob}
          onShowDetails={setShowJobDetails}
          jobs={jobs}
        />
      </div>

      {/* TODO: sacar */}
      <JobDetailsDialog
        job={selectedJob}
        isOpen={showJobDetails}
        onClose={() => setShowJobDetails(false)}
      />
    </PageContainer>
  );
}
