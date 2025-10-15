"use client";

import { useState, useRef, useEffect } from "react";

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
import { WorkEnvironment } from "./_components/work-environment";
import { PollenLoves } from "./_components/pollen-loves";
import { AccoladesAccreditations } from "./_components/accolades-accreditations";
import { EntryLevelSupport } from "./_components/entry-level-support";
import { ContactInformation } from "./_components/contact-information";
import { SocialMedia } from "./_components/social-media";
import { InternalPollenData } from "./_components/internal-pollen-data";
import { useToast } from "@/lib/hooks/use-toast";
import { AdminRoutes } from "../../router";
import { FileText } from "lucide-react";
import { FormCard, Textarea } from "@/components/design-system";

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
            <FormCard
              title="About the Employer"
              icon={<FileText className="h-5 w-5" />}
            >
              <Textarea
                name="company_about"
                placeholder="Describe the company, its mission, values, and what makes it unique..."
                className="min-h-[150px] resize-y"
                defaultValue={industryValue.company_about}
              />
            </FormCard>

            <WorkEnvironment />
            <PollenLoves />

            <EntryLevelSupport />
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
