"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import CircularProgress from "@/components/ui/circular-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { CardFooter } from "@/components/ui/card";
import { useJobManagement } from "@/admin/jobs/useJobManagement";
import { JobSeekerHomeVideoSection } from "@/job-seeker/home/_components/job-seeker-home-video-section";
import { CompleteProfileBanner } from "@/job-seeker/home/_components/js-home-profile-banner";

import {
  Users,
  Calendar,
  Star,
  Clock,
  ChevronRight,
  Trophy,
} from "lucide-react";

import { useUser } from "@/app/providers";
import { Header } from "@/components/design-system";
import { JobCard } from "./_components/job-card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer, PageHeader } from "@/components/design-system";

export default function Home() {
  const user = useUser();
  const [, setProgress] = useState(0);
  const router = useRouter();
  const form = useJobManagement();

  // estado para guardados (JS puro)
  const [savedJobs, setSavedJobs] = useState(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle job saving/unsaving (JSX: sin tipos)
  const handleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      const newSavedJobs = new Set(prev);
      if (newSavedJobs.has(jobId)) {
        newSavedJobs.delete(jobId);
      } else {
        newSavedJobs.add(jobId);
      }
      return newSavedJobs;
    });
  };

  // Note: Removed topJobRecommendations; we render directly from form.form.jobs

  // Map admin job shape -> JobCard shape
  const mapAdminJobToCardJob = (job) => ({
    id: String(job.id),
    title: job.job_title || job.title || "Untitled job",
    company: {
      id: String(job.company_id || job.employer_id || job.id),
      name: job.company_name || "Unknown Company",
      logo: job.company_logo || undefined,
    },
    location: job.location || job.city || "Remote",
    salary: job.salary || job.salary_range || "",
    pollenApproved: Boolean(
      job.pollenApproved ||
        job.pollen_approved ||
        job.is_pollen_approved ||
        false,
    ),
    description: job.description || job.job_description || "",
    type: job.type || (job.is_external ? "external" : undefined),
    applicationDeadline:
      job.application_deadline ||
      job.assigned_date ||
      job.published_at ||
      job.created_at ||
      new Date(),
  });

  // Render directly from form.form.jobs; map to the JobCard shape inline

  return (
    <PageContainer>
      {/* Welcome Section */}
      <PageHeader
        title={<>Welcome back, {user?.firstName}! 👋</>}
        titleSize="text-5xl"
        subtitle={"Let's find you a job you love."}
      />

      {/* How to Use Pollen Video Section */}
      <JobSeekerHomeVideoSection />

      {/* Complete Profile Banner */}
      <CompleteProfileBanner />

      {/* Featured Jobs - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center font-sora text-lg p-3">
            <Star className="h-5 w-5 text-gray-700" />
            This Week&apos;s Featured Jobs
          </CardTitle>
        </CardHeader>
        <CardContent style={{ padding: "0.75rem" }}>
          {form?.form?.loading ? (
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`job-skeleton-${i}`}
                  className="flex flex-col border rounded-lg p-3 gap-3"
                >
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-2/3 bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-20 bg-gray-200" />
                      <Skeleton className="h-3 w-16 bg-gray-200" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <Skeleton className="h-4 w-5/6 bg-gray-200" />
                    <Skeleton className="h-4 w-1/2 bg-gray-200" />
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <Skeleton className="h-3 w-1/3 bg-gray-200" />
                    <Skeleton className="h-3 w-1/4 bg-gray-200" />
                  </div>
                  <div className="flex gap-2 pt-3 mt-3 border-t">
                    <Skeleton className="h-9 flex-1 bg-gray-200" />
                    <Skeleton className="h-9 w-10 bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {(form?.form?.jobs || []).slice(0, 6).map((raw) => {
                const job = mapAdminJobToCardJob(raw);
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobs.has(job.id)}
                    onToggleSave={() => handleSaveJob(job.id)}
                  />
                );
              })}
            </div>
          )}
        </CardContent>
        <CardFooter className="px-3 pb-3 pt-0 flex justify-end">
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "/jobs")}
            size="sm"
            className="h-10 px-4 py-2 w-full"
          >
            <span className="hidden sm:inline">View All Jobs</span>
            <ChevronRight className="w-3 h- ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {/* Weekly Community Drop-in - Full Width Banner */}
      <Card className="p-2" style={{ backgroundColor: "#fff9e6" }}>
        <CardHeader className="">
          <CardTitle className="flex items-center font-sora text-lg p-3">
            <Users className="h-5 w-5 text-gray-700" />
            Weekly Community Drop-in
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-700 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-700" />
                  Every Monday, 1:00 PM GMT
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-700" />
                  42/100 attending this week
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Meet the Pollen team in a relaxed, low-pressure environment for
                career support
              </p>
            </div>
            <div className="sm:ml-6">
              <Button
                size="sm"
                variant="pollen"
                onClick={() =>
                  window.open(
                    "https://calendly.com/pollencareers/ask-us-anything",
                    "_blank",
                  )
                }
                className="w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple chatbot */}
    </PageContainer>
  );
}
