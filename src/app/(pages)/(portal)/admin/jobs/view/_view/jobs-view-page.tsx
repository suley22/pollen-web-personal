"use client";

import { useRouter } from "next/navigation";
import { JobViewHeader } from "../_components/job-view-header";
import { useJobViewHook } from "../_hooks/jobs-view-hook";
import { JobViewSkeleton } from "@/jobs/view/_view/jobs-view-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, UserCheck, Brain } from "lucide-react";
import { JobDescriptionTab } from "../_components/job-view-description-tab";
import { JobPersonaTab } from "../_components/job-view-persona-tab";
import { JobAssessmentTab } from "../_components/job-view-assessment-tab";
import { AdminRoutes } from "@/admin/router";

export default function JobsViewComponent({ id = null }) {
  const router = useRouter();

  const { job, isLoading, activeTab, setActiveTab } = useJobViewHook(id);

  if (!job || isLoading) {
    return <JobViewSkeleton />;
  }

  // Handlers - simple and direct
  const handleEdit = () => {
    router.push(AdminRoutes.jobsEdit(id));
  };

  return (
    <div className="flex flex-col w-full mx-auto py-6 gap-6">
      {/* Header */}
      <JobViewHeader
        jobTitle={job?.job_title || "Job Details"}
        companyName={job?.company_name || "Company Name"}
        jobStatus={job?.status || "draft"}
        onBack={() => router.back()}
        onEdit={handleEdit}
        onGoLive={() => {}}
        onPause={() => {}}
        onComplete={() => {}}
        onDelete={() => {}}
      />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Job Description
          </TabsTrigger>

          <TabsTrigger value="persona" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Persona Results
          </TabsTrigger>

          <TabsTrigger value="assessment" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Skills Assessment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-6">
          <JobDescriptionTab job={job} />
        </TabsContent>

        <TabsContent value="persona" className="space-y-6">
          <JobPersonaTab />
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <JobAssessmentTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
