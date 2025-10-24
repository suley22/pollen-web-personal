"use client";
import {
  PageContainer,
  PageHeader,
  PrimaryButton,
} from "@/components/design-system";
import {
  GhostButton,
  SecondaryButton,
} from "@/components/design-system/primary-button";
import EmployerProfileView from "@/employers/view/view";
import { ChevronLeft } from "lucide-react";

import { use } from "react";
import { useCompanies } from "../../_hooks/useCompanies";
import { Card } from "@/components/ui/card";

export default function EmployerReviewPage({ params }) {
  // Await the params to get the actual parameters
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { profile } = useCompanies(id);

  return (
    <PageContainer>
      <PageHeader className="flex justify-start" title="">
        <GhostButton icon={<ChevronLeft />} text="Back to Companies" />
      </PageHeader>
      <Card>{profile.company_name}</Card>
    </PageContainer>
  );
}
