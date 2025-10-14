"use client";

import { useState, useRef } from "react";
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

export default function CreateProfilePage() {
  const formRef = useRef(null);
  const router = useRouter();
  const [state, CompanyData, isPending] = useActionState(
    createCompanyData,
    null,
  );
  const [checked, setChecked] = useState(false);
  const [accolades, setAccolades] = useState([]);
  const [customIndustries, setCustomIndustries] = useState([]);
  const [industryValue, setIndustryValue] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  return (
    <div className="w-full flex flex-col mx-auto py-6 gap-6">
      <Header />

      <form ref={formRef} className="flex flex-col gap-6" action={CompanyData}>
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

        {/* Botón de submit original debajo del formulario */}
      </form>
      <div className="flex justify-end mt-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button">Create company profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm company creation?</DialogTitle>
              <DialogDescription>
                Are you sure you want to create the company? This action will
                not affect current logic.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={() => {
                    if (formRef.current) formRef.current.requestSubmit();
                    router.push("/admin/employers-management");
                  }}
                >
                  Confirmar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
