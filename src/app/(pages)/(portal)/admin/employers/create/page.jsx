"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { createCompanyData } from "./actions";
import { Header } from "./_components/header";
import { CompanyInformation } from "./_components/company-information";
import { AboutEmployer } from "./_components/about-employer";
import { WorkEnvironment } from "./_components/work-environment";
import { PollenLoves } from "./_components/pollen-loves";
import { AccoladesAccreditations } from "./_components/accolades-accreditations";
import { EntryLevelSupport } from "./_components/entry-level-support";
import { ContactInformation } from "./_components/contact-information";
import { SocialMedia } from "./_components/social-media";
import { InternalPollenData } from "./_components/internal-pollen-data";
import { useToast } from "@/lib/hooks/use-toast";
import { AdminRoutes } from "../../router";

export default function CreateProfilePage() {
  const formRef = useRef(null);
  const router = useRouter();
  const { toast } = useToast();
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
        router.push(AdminRoutes.employers);
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
    <div className="w-full flex flex-col mx-auto py-6 gap-6">
      <Header />

      <form
        ref={formRef}
        className="flex flex-col gap-6"
        action={createCompany}
      >
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
            <AboutEmployer />
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

        {/* Divider and Save Button */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-[1px] bg-gray-200" />
          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button type="button" size="lg" disabled={isPending}>
                  {isPending ? "Creating..." : "Create company profile"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm company creation?</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to create the company profile? This
                    will create a new employer profile in the system.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="secondary"
                      type="button"
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="button"
                    onClick={() => {
                      if (formRef.current) formRef.current.requestSubmit();
                    }}
                    disabled={isPending}
                  >
                    {isPending ? "Creating..." : "Confirm"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </div>
  );
}
