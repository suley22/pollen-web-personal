"use client";

import { useState, useRef, useEffect } from "react";

import { TextAreaCard } from "@/components/design-system";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { PageHeader } from "@/components/design-system/page-header";
import { PageContainer } from "@/components/design-system/page-container";
import { FormContainer } from "@/components/design-system/form-container";
import { FormActions } from "@/components/design-system/form-actions";
import { ConfirmationDialog } from "@/components/design-system/confirmation-dialog";
import { createCompanyData } from "./actions";
import { CompanyInformation } from "./_components/company-information";
import { AccoladesAccreditations } from "./_components/accolades-accreditations";
import { ContactInformation } from "./_components/contact-information";
import { SocialMedia } from "./_components/social-media";
import { InternalPollenData } from "./_components/internal-pollen-data";
import { useToast } from "@/lib/hooks/use-toast";
import { AdminRoutes } from "../../router";
import { FileText, Building } from "lucide-react";
import { FormCard } from "@/components/design-system/form-card";
import { Textarea } from "@/components/ui/textarea";

export default function CreateProfilePage() {
  const formRef = useRef(null);
  const router = useRouter();
  const { toast } = useToast();

  const onBack = () => {
    router.push(AdminRoutes.employers);
  };
  const [state, createCompany, isPending] = useActionState(
    createCompanyData,
    null,
  );
  const [checked, setChecked] = useState(false);
  const [accolades, setAccolades] = useState([]);
  const [customIndustries, setCustomIndustries] = useState([]);
  const [industryValue, setIndustryValue] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const lastProcessedState = useRef(null);

  // Handle action state changes
  useEffect(() => {
    // Skip if state hasn't changed or is null
    if (!state || state === lastProcessedState.current) {
      return;
    }

    lastProcessedState.current = state;

    if (state?.success) {
      toast({
        title: "Success!",
        description: state.message || "Company profile created successfully",
        variant: "success",
      });
      // Redirect after success
      setTimeout(() => {
        router.push(AdminRoutes.employersView(state.companyId));
      }, 1500);
    } else if (state?.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "error",
      });
      setIsDialogOpen(false);
    }
  }, [state, router, toast]);

  return (
    <PageContainer>
      <PageHeader
        title="Create Employer"
        description="Complete the form below to create a new employer profile"
        showBackButton={true}
        onBack={onBack}
      />

      <FormContainer ref={formRef} action={createCompany}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-6">
            <CompanyInformation
              industryValue={industryValue}
              onIndustryValueChange={setIndustryValue}
              customIndustries={customIndustries}
              onCustomIndustriesChange={setCustomIndustries}
              showCustomIndustries={checked}
              onShowCustomIndustriesChange={setChecked}
              logoUrl={logoUrl}
              onLogoUrlChange={setLogoUrl}
            />

            <TextAreaCard
              title="About the employer"
              icon={<FileText className="h-5 w-5" />}
              name="company_about"
              placeholder="Describe the company, its mission, values, and what makes it unique..."
              minHeight="150px"
            />

            <TextAreaCard
              title="Work Environment"
              icon={<Building className="h-5 w-5" />}
              name="work_environment"
              placeholder="Describe the work environment, office culture, team dynamics, and atmosphere..."
              minHeight="150px"
            />

            <TextAreaCard
              title="Pollen Loves"
              icon={<Heart className="h-5 w-5" />}
              name="company_loves"
              placeholder="What does Pollen love about this company? Highlight unique benefits, values, or opportunities..."
              minHeight="150px"
            />

            <TextAreaCard
              title="Entry-Level Support"
              icon={<Building className="h-5 w-5" />}
              name="entry_level_support"
              placeholder="Describe the support and resources provided for entry-level employees, such as training programs, mentorship, onboarding..."
              minHeight="150px"
            />

            <InternalPollenData />
          </div>

          <div className="space-y-6">
            <ContactInformation />
            <SocialMedia />
            <AccoladesAccreditations
              accolades={accolades}
              setAccolades={setAccolades}
            />
          </div>
        </div>

        <FormActions>
          <ConfirmationDialog
            trigger={
              <Button type="button" size="lg" disabled={isPending}>
                {isPending ? "Creating..." : "Create company profile"}
              </Button>
            }
            title="Confirm company creation?"
            description="Are you sure you want to create the company profile? This will create a new employer profile in the system."
            confirmText="Confirm"
            cancelText="Cancel"
            onConfirm={() => {
              if (formRef.current) formRef.current.requestSubmit();
            }}
            isLoading={isPending}
            loadingText="Creating..."
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </FormActions>
      </FormContainer>
    </PageContainer>
  );
}
