import { JobAssessmentSkeleton } from "./job-view-skeletons";

export function JobAssessmentTab({ isLoading = false }) {
  if (isLoading) {
    return <JobAssessmentSkeleton />;
  }

  return <div>Job Assessment Content</div>;
}
