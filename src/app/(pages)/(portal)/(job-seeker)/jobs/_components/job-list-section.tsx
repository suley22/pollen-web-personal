"use client";

import { useJobs } from "../_hooks/useJobPage";
import { JobCard } from "./job-card";

export default function JobListSection({ filters }) {
  const { jobs } = useJobs(filters);

  return (
    <div className="space-y-4">
      {jobs?.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
