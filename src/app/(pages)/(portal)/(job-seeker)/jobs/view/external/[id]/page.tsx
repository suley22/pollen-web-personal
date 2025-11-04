"use client";

import {
  FormCard,
  PageContainer,
  PageHeader,
  InfoField,
} from "@/components/design-system";
import {
  Briefcase,
  Building,
  CalendarClock,
  Clock,
  MapPin,
  PoundSterling,
  Building2,
  Info,
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { PrimaryButton } from "@/components/design-system";
import ExternalLinks from "../../_components/jobs-view-external-links";
import { useExternalJobById } from "../../../_services/jobs-service";

export default function ExternalJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  // Fetch external job by ID
  const { data: job, isLoading } = useExternalJobById(jobId);

  const handleBack = () => {
    router.back();
  };

  const handleApply = () => {
    if (job?.external_links) {
      window.open(job.external_links, "_blank", "noopener,noreferrer");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading job details...</div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title={job?.job_title || "External Job Details"}
        subtitle={job?.company_name}
        showBackButton={true}
        onBack={handleBack}
      >
        <PrimaryButton
          text="Apply Now"
          icon={<ExternalLinkIcon className="h-5 w-5" />}
          onClick={handleApply}
        />
      </PageHeader>

      <div className="flex flex-col gap-6">
        {/* Job Overview */}
        <FormCard title="Job Overview" icon={<Briefcase className="h-5 w-5" />}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <InfoField
              label="Company"
              value={job?.company_name || "Not specified"}
              icon={<Building className="h-4 w-4 text-muted-foreground" />}
            />
            <InfoField
              label="Industry"
              value={job?.industries || "Not specified"}
              icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
            />
            <InfoField
              label="Location"
              value={job?.location || "Not specified"}
              icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
            />
            <InfoField
              label="Working Hours"
              value={job?.working_hours || "Not specified"}
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            />
            <InfoField
              label="Salary Range"
              value={job?.salary_range || "Not specified"}
              icon={<PoundSterling className="h-4 w-4 text-muted-foreground" />}
            />
            <InfoField
              label="Employment Type"
              value={job?.employment_type || "Not specified"}
              icon={<Info className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
        </FormCard>

        <ExternalLinks externalLinks={job?.external_links} />
      </div>
    </PageContainer>
  );
}
