"use client";

import { JobCard } from "./jobs-page-job-card";

export default function JobListSection({ jobs, isSaved, saveFavoriteJob }) {
  return (
    <div className="space-y-4">
      {jobs?.map((job) => (
        <JobCard
          key={job.uniqueKey || job.id}
          job={job}
          isSaved={isSaved(job.id)}
          onToggleSave={() => saveFavoriteJob(job.id)}
        />
      ))}
    </div>
  );
}
