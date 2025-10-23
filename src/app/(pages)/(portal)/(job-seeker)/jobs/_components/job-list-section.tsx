"use client";

import { JobCard } from "./job-card";

export default function JobListSection({ onJobSelect, onShowDetails, jobs }) {
  return (
    <div className="space-y-4">
      {jobs?.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onJobSelect={onJobSelect}
          onShowDetails={onShowDetails}
        />
      ))}
    </div>
  );
}
