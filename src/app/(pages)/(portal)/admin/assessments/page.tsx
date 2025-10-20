"use client";

import {
  PageContainer,
  PageHeader,
  PrimaryButton,
} from "@/components/design-system";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "../router";

export default function AdminFormsPage() {
  const router = useRouter();

  return (
    <PageContainer>
      <PageHeader
        title="Admin Assessments Page"
        description="Create and manage assessments"
      >
        <PrimaryButton
          icon={<Plus />}
          text="Create Assessment"
          onClick={() => router.push(AdminRoutes.assessmentCreate)}
        />
      </PageHeader>
      <div>Body</div>
    </PageContainer>
  );
}
