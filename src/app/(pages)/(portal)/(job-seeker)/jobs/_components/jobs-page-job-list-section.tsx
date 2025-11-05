"use client";

import { JobCard } from "./jobs-page-job-card";

export default function JobListSection({
  jobs,
  isSaved,
  saveFavoriteJob,
  hasApplied,
  hasInterviewLink,
}) {
  return (
    <div className="space-y-4">
      {jobs?.map((job) => (
        <JobCard
          key={job.uniqueKey || job.id}
          job={job}
          isSaved={isSaved(job.id)}
          onToggleSave={() => saveFavoriteJob(job.id)}
          hasApplied={hasApplied(job.id)}
          hasInterviewLink={hasInterviewLink(job.id)}
        />
      ))}
    </div>
  );
}
