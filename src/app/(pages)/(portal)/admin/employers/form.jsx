"use client";

import { TextAreaCard } from "@/components/design-system";
import { Heart, FileText, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/design-system/page-header";
import { PageContainer } from "@/components/design-system/page-container";
import { FormContainer } from "@/components/design-system/form-container";
import { FormActions } from "@/components/design-system/form-actions";
import { ConfirmationDialog } from "@/components/design-system/confirmation-dialog";
import { CompanyInformation } from "./create/_components/company-information";
import { AccoladesAccreditations } from "./create/_components/accolades-accreditations";
import { ContactInformation } from "./create/_components/contact-information";
import { SocialMedia } from "./create/_components/social-media";
import { InternalPollenData } from "./create/_components/internal-pollen-data";
import { useFormEmployer } from "./_hooks/useFormEmployer";

export function ProfileForm({ employer = null, action }) {
  // Detect edit mode automatically based on employer presence
  const isEditMode = !!employer;

  const {
    formRef,
    formAction,
    isPending,
    checked,
    setChecked,
    customIndustries,
    setCustomIndustries,
    industryValue,
    setIndustryValue,
    logoUrl,
    setLogoUrl,
    isDialogOpen,
    setIsDialogOpen,
    handleBack,
    handleSubmit,
  } = useFormEmployer({ action, employer });

  return (
    <PageContainer>
      <PageHeader
        title={
          isEditMode ? `Edit ${employer?.company_name}` : "Create Employer"
        }
        description={
          isEditMode
            ? "Update the employer profile information"
            : "Complete the form below to create a new employer profile"
        }
        showBackButton={true}
        onBack={handleBack}
      />

      <FormContainer ref={formRef} action={formAction}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-6">
            <CompanyInformation
              initialData={employer}
              onIndustryValueChange={setIndustryValue}
              logoUrl={logoUrl}
              onLogoUrlChange={setLogoUrl}
            />

            <TextAreaCard
              title="About the employer"
              icon={<FileText className="h-5 w-5" />}
              name="company_about"
              placeholder="Describe the company, its mission, values, and what makes it unique..."
              defaultValue={employer?.company_about || ""}
            />

            <TextAreaCard
              title="Work Environment"
              icon={<Building className="h-5 w-5" />}
              name="work_environment"
              placeholder="Describe the work environment, office culture, team dynamics, and atmosphere..."
              defaultValue={employer?.work_environment || ""}
            />

            <TextAreaCard
              title="Pollen Loves"
              icon={<Heart className="h-5 w-5" />}
              name="company_loves"
              placeholder="What does Pollen love about this company? Highlight unique benefits, values, or opportunities..."
              defaultValue={employer?.company_loves || ""}
            />

            <TextAreaCard
              title="Entry-Level Support"
              icon={<Building className="h-5 w-5" />}
              name="entry_level_support"
              placeholder="Describe the support and resources provided for entry-level employees, such as training programs, mentorship, onboarding..."
              defaultValue={employer?.company_entry_level || ""}
            />

            <InternalPollenData employer={employer} />
          </div>

          <div className="space-y-6">
            <ContactInformation employer={employer} />
            <SocialMedia employer={employer} />
            <AccoladesAccreditations employer={employer} />
          </div>
        </div>

        <FormActions>
          <ConfirmationDialog
            trigger={
              <Button type="button" size="lg" disabled={isPending}>
                {isPending
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                    ? "Update company profile"
                    : "Create company profile"}
              </Button>
            }
            title={
              isEditMode
                ? "Confirm company update?"
                : "Confirm company creation?"
            }
            description={
              isEditMode
                ? "Are you sure you want to update the company profile? This will modify the existing employer profile."
                : "Are you sure you want to create the company profile? This will create a new employer profile in the system."
            }
            confirmText="Confirm"
            cancelText="Cancel"
            onConfirm={handleSubmit}
            isLoading={isPending}
            loadingText={isEditMode ? "Updating..." : "Creating..."}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </FormActions>
      </FormContainer>
    </PageContainer>
  );
}
