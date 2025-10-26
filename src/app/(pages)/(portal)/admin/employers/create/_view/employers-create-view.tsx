"use client";

import { PrimaryButton, TextAreaCard } from "@/components/design-system";
import { Heart, FileText, Building, Check, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/design-system/page-header";
import { PageContainer } from "@/components/design-system/page-container";
import { FormContainer } from "@/components/design-system/form-container";
import { FormActions } from "@/components/design-system/form-actions";
import { ConfirmationDialog } from "@/components/design-system/confirmation-dialog";
import { CompanyInformation } from "../_components/employers-create-company-information";
import { AccoladesAccreditations } from "../_components/employers-create-accolades";
import { ContactInformation } from "../_components/employers-create-contact-information";
import { SocialMedia } from "../_components/employers-create-social-media";
import { InternalPollenData } from "../_components/employers-create-internal-pollen-data";
import { EmployersCreateSkeleton } from "../_components/employers-create-skeleton";
import { useEmployersPage } from "../_hooks/employers-create-hook";

const CreateUpdateButton = ({ isEditMode, isLoading, onClick }) => (
  <PrimaryButton
    icon={<CheckCircle className="h-5 w-5" />}
    text={isEditMode ? "Update Company Profile" : "Create Company Profile"}
    loading={isLoading}
    disabled={isLoading}
    onClick={onClick}
  />
);

export function ProfileForm({ id = null }) {
  const isEditMode = !!id;

  const {
    employer,
    formRef,
    isLoadingProfile,
    logoUrl,
    setLogoUrl,
    isDialogOpen,
    setIsDialogOpen,
    handleBack,
    handleSubmit,
  } = useEmployersPage({ id });

  return (
    <PageContainer>
      <PageHeader
        title={
          isEditMode ? `Edit ${employer?.company_name}` : "Create Employer"
        }
        subtitle={
          isEditMode
            ? "Update the employer profile information"
            : "Complete the form below to create a new employer profile"
        }
        showBackButton={true}
        onBack={handleBack}
      >
        <CreateUpdateButton
          isEditMode={isEditMode}
          isLoading={isLoadingProfile}
          onClick={() => setIsDialogOpen(true)}
        />
      </PageHeader>

      <FormContainer ref={formRef}>
        {/* Show skeleton while loading in edit mode */}
        {isEditMode && isLoadingProfile ? (
          <EmployersCreateSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-6">
              <CompanyInformation
                initialData={employer}
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
        )}

        <FormActions>
          <ConfirmationDialog
            trigger={
              <CreateUpdateButton
                isEditMode={isEditMode}
                isLoading={isLoadingProfile}
                onClick={() => setIsDialogOpen(true)}
              />
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
            isLoading={isLoadingProfile}
            loadingText={isEditMode ? "Updating..." : "Creating..."}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onConfirm={() => handleSubmit()}
          />
        </FormActions>
      </FormContainer>
    </PageContainer>
  );
}
