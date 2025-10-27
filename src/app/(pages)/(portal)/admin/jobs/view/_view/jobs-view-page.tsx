"use client";
import { PageContainer } from "@/components/design-system";
import { JobViewHeader } from "../_components/job-view-header";
import { useEmployerView } from "../_hooks/jobs-view-hook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, UserCheck, Brain } from "lucide-react";
import { JobDescriptionTab } from "../_components/job-view-description-tab";
import { JobPersonaTab } from "../_components/job-view-persona-tab";
import { JobAssessmentTab } from "../_components/job-view-assessment-tab";

export default function JobsViewComponent({ id = null }) {
  const { job, activeTab, setActiveTab } = useEmployerView(id);
  return (
    <PageContainer>
      {/* TODO: completar props y dar funcionalidad a los botones */}
      <JobViewHeader
        jobTitle="Job Details"
        companyName="Company Name"
        jobStatus="draft"
        onBack={() => {}}
        onEdit={() => {}}
        onSave={() => {}}
        onCancel={() => {}}
        onGoLive={() => {}}
        onPause={() => {}}
        onComplete={() => {}}
        onCancelJob={() => {}}
        onDelete={() => {}}
        isEditing={undefined}
        isEditingAssessment={undefined}
        canMarkComplete={undefined}
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
          <JobDescriptionTab />
        </TabsContent>

        <TabsContent value="persona" className="space-y-6">
          <JobPersonaTab />
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <JobAssessmentTab />
        </TabsContent>
      </Tabs>

      {/* TODO: Implement job status */}
    </PageContainer>
  );
}
