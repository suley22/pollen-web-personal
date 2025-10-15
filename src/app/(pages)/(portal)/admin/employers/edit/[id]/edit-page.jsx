"use client";

import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/design-system/page-container";
import { FormContainer } from "@/components/design-system/form-container";
import { FormActions } from "@/components/design-system/form-actions";
import { ConfirmationDialog } from "@/components/design-system/confirmation-dialog";
import { useActionState } from "react";
import { CompanyInformation } from "@/employers/create/_components/company-information";
import { WorkEnvironment } from "@/employers/create/_components/work-environment";
import { PollenLoves } from "@/employers/create/_components/pollen-loves";
import { AccoladesAccreditations } from "@/employers/create/_components/accolades-accreditations";
import { EntryLevelSupport } from "@/employers/create/_components/entry-level-support";
import { ContactInformation } from "@/employers/create/_components/contact-information";
import { SocialMedia } from "@/employers/create/_components/social-media";
import { InternalPollenData } from "@/employers/create/_components/internal-pollen-data";
import { useToast } from "@/lib/hooks/use-toast";
import { AdminRoutes } from "@/admin/router";
import { ArrowLeft, FileText } from "lucide-react";
import { FormCard, Textarea } from "@/components/design-system";
import { updateEmployerAction } from "@/employers/actions";

export default function EditEmployerPage({ employerData }) {
  const formRef = useRef(null);
  const router = useRouter();
  const { toast } = useToast();

  // Bind the employer ID to the update function
  const updateWithId = updateEmployerAction.bind(null, employerData.id);

  const [state, updateCompany, isPending] = useActionState(updateWithId, null);

  // Helper function to check if an industry is from the standard list
  const isStandardIndustry = (industry) => {
    const standardIndustries = [
      "technology",
      "healthcare",
      "finance",
      "education",
      "retail",
      "manufacturing",
      "hospitality",
      "construction",
      "transportation",
      "media",
      "real_estate",
      "consulting",
    ];
    return standardIndustries.includes(industry);
  };

  // Initialize state with employer data
  const initialCustomIndustries =
    employerData.industries?.filter((ind) => !isStandardIndustry(ind)) || [];
  const hasCustomIndustries = initialCustomIndustries.length > 0;

  const [checked, setChecked] = useState(hasCustomIndustries);
  const [accolades, setAccolades] = useState(
    employerData.company_accolades || [],
  );
  const [customIndustries, setCustomIndustries] = useState(
    initialCustomIndustries,
  );
  const [industryValue, setIndustryValue] = useState("");
  const [logoUrl, setLogoUrl] = useState(employerData.logo_url || "");
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
        description: state.message || "Company profile updated successfully",
        variant: "default",
        className: "bg-green-50 border-green-200 text-green-800",
      });

      router.push(AdminRoutes.employersView(employerData.id));
    } else if (state?.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
      setIsDialogOpen(false);
    }
  }, [state, router, toast, employerData.id]);

  return (
    <PageContainer className="relative">
      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3 shadow-xl">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
            <span className="text-gray-700 font-medium">
              Updating employer profile...
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="text-2xl font-bold">
          Edit {employerData.company_name} Profile
        </div>
      </div>

      <FormContainer ref={formRef} action={updateCompany}>
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
              // Pass initial values
              initialData={{
                company_name: employerData.company_name,
                company_size: employerData.company_size,
                founded_year: employerData.founded_year,
                location: employerData.company_location,
                website: employerData.website_url,
                industries: employerData.industries?.filter((ind) =>
                  isStandardIndustry(ind),
                ),
              }}
            />

            <FormCard
              title="About the Employer"
              icon={<FileText className="h-5 w-5" />}
            >
              <Textarea
                name="company_about"
                placeholder="Describe the company, its mission, values, and what makes it unique..."
                className="min-h-[150px] resize-y"
                defaultValue={initialValue}
              />
            </FormCard>

            <WorkEnvironment initialValue={employerData.work_environment} />
            <PollenLoves initialValue={employerData.company_loves} />
            <EntryLevelSupport
              initialValue={employerData.company_entry_level}
            />
            <InternalPollenData
              initialData={{
                how_did_you_hear_about_us:
                  employerData.how_did_you_hear_about_us,
                more_info: employerData.more_info,
                hiring_frequency: employerData.hiring_frequency,
                additional_notes: employerData.additional_notes,
                how_hired_previously: employerData.how_hired_previously || [],
              }}
            />
          </div>

          <div className="space-y-6">
            <ContactInformation
              initialData={{
                contact_name: employerData.contact_name,
                job_title: employerData.job_title,
                contact_email: employerData.contact_email,
                contact_phone: employerData.contact_phone,
              }}
            />
            <SocialMedia initialValue={employerData.social_medias || []} />
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
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            }
            title="Confirm changes?"
            description="Are you sure you want to save these changes to the employer profile?"
            confirmText="Confirm"
            cancelText="Cancel"
            onConfirm={() => {
              setIsDialogOpen(false);
              if (formRef.current) formRef.current.requestSubmit();
            }}
            isLoading={isPending}
            loadingText="Saving..."
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </FormActions>
      </FormContainer>
    </PageContainer>
  );
}
