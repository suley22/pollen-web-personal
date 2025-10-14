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
import { EyeOff, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AccoladesSection } from "./_components/accolades-section";
import { Progress } from "./_components/progress";
import { useActionState } from "react";
import { createCompanyData } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { Header } from "./_components/header";
import { CompanyInformation } from "./_components/company-information";
import { AboutEmployer } from "./_components/about-employer";
import { WorkEnvironment } from "./_components/work-environment";
import { PollenLoves } from "./_components/pollen-loves";
import { AccoladesAccreditations } from "./_components/accolades-accreditations";
import { EntryLevelSupport } from "./_components/entry-level-support";

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
    <div className="flex flex-col mx-auto py-6 gap-6">
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

            {/* About the Employer */}
            <AboutEmployer />

            {/* Work Environment */}
            <WorkEnvironment />

            {/* Pollen loves */}
            <PollenLoves />

            {/* Accolades & Acreditations */}
            <AccoladesAccreditations
              accolades={accolades}
              setAccolades={setAccolades}
            />

            {/* Entry-Level Support */}
            <EntryLevelSupport />
          </div>

          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-white">
              <CardContent className="">
                <div className="flex items-center space-y-1.5 p-6">
                  <User />
                  <h3 className="!mb-0 ml-1 text-lg font-semibold text-gray-900">
                    Contact Information
                  </h3>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Contact Name */}
                    <div>
                      <Label
                        htmlFor="contact_name"
                        className="mb-1 text-gray-800"
                      >
                        Contact Name
                      </Label>
                      <Input
                        type="text"
                        name="contact_name"
                        className="w-full border p-2 rounded"
                        placeholder="Contact Name"
                      />
                    </div>

                    {/* Job Title */}
                    <div>
                      <Label htmlFor="job_title" className="mb-1 text-gray-800">
                        Job Title
                      </Label>
                      <Input
                        type="text"
                        name="job_title"
                        className="w-full border p-2 rounded"
                        placeholder="Job Title"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label
                        htmlFor="contact_email"
                        className="mb-1 text-gray-800"
                      >
                        Email
                      </Label>
                      <Input
                        type="email"
                        name="contact_email"
                        className="w-full border p-2 rounded"
                        placeholder="hr@yourcompany.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <Label
                        htmlFor="contact_phone"
                        className="mb-1 text-gray-800"
                      >
                        Phone
                      </Label>
                      <Input
                        type="text"
                        name="contact_phone"
                        className="w-full border p-2 rounded"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-white">
              <CardContent className="">
                <div className="flex items-center space-y-1.5 p-6">
                  <h3 className="!mb-0 ml-1 text-lg font-semibold text-gray-900">
                    Social Media
                  </h3>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  {/* Company Name */}
                  <div>
                    <Label
                      htmlFor="linkedin_url"
                      className="mb-1 text-gray-800"
                    >
                      LinkedIn
                    </Label>
                    <Input
                      type="text"
                      name="linkedin_url"
                      className="w-full border p-2 rounded"
                      placeholder="LinkedIn URL"
                    />
                  </div>

                  {/* Twitter */}
                  <div>
                    <Label htmlFor="twitter_url" className="mb-1 text-gray-800">
                      Twitter
                    </Label>
                    <Input
                      type="text"
                      name="twitter_url"
                      className="w-full border p-2 rounded"
                      placeholder="Twitter URL"
                    />
                  </div>

                  {/* Glassdoor */}
                  <div>
                    <Label
                      htmlFor="glassdoor_url"
                      className="mb-1 text-gray-800"
                    >
                      Glassdoor
                    </Label>
                    <Input
                      type="text"
                      name="glassdoor_url"
                      className="w-full border p-2 rounded"
                      placeholder="Location"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pollen Internal Data */}
            <Card className="bg-white">
              <CardContent className="">
                <div className="flex items-center space-y-1.5 p-6">
                  <EyeOff />
                  <h3 className="!mb-0 ml-1 text-lg font-semibold text-gray-900">
                    Internal Pollen Data
                  </h3>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Contact Name */}
                    <div>
                      <Label
                        htmlFor="how_did_you_hear_about_us"
                        className="mb-1 text-gray-800"
                      >
                        How did you hear about us?
                      </Label>
                      <Select
                        name="how_did_you_hear_about_us"
                        placeholder="Select an option"
                      >
                        <SelectTrigger className="h-9 px-3 py-1 text-sm">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="google_search">
                            Google Search
                          </SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="social_media">
                            Social Media
                          </SelectItem>
                          <SelectItem value="industry_event">
                            Industry Event
                          </SelectItem>
                          <SelectItem value="partner_agency">
                            Partner/Agency
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* More Information */}
                    <div>
                      <Label htmlFor="more_info" className="mb-1 text-gray-800">
                        More info (if applicable)
                      </Label>
                      <Textarea
                        name="more_info"
                        className="w-full border p-2 rounded"
                        placeholder="e.g Name of referrer, specific event, etc."
                      />
                    </div>

                    {/* Frequency of hiring at entry level */}
                    <div>
                      <Label
                        htmlFor="hiring_frequency"
                        className="mb-1 text-gray-800"
                      >
                        Frequency of hiring at entry level
                      </Label>
                      <Select
                        name="hiring_frequency"
                        placeholder="Select an option"
                      >
                        <SelectTrigger className="h-9 px-3 py-1 text-sm">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infrequent">
                            One-off / infrequent
                          </SelectItem>
                          <SelectItem value="1-5">
                            1-5 hires per year
                          </SelectItem>
                          <SelectItem value="5-15">
                            5-15 hires per year
                          </SelectItem>
                          <SelectItem value="15-50">
                            15-50 hires per year
                          </SelectItem>
                          <SelectItem value="50+">
                            50+ hires per year
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Previous hired */}
                    <div>
                      <Label className="mb-1 text-gray-800">
                        How they&apos;ve hired previously
                      </Label>
                      <Label className="text-xs mb-1 text-gray-600">
                        Select all methods they have used before
                      </Label>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              name="previous_hired"
                              value="recruitment_agencies"
                            />
                            <span>Recruitment agencies</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              name="previous_hired"
                              value="university_partnerships"
                            />
                            <span>University partnerships</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              name="previous_hired"
                              value="social_media_recruiting"
                            />
                            <span>Social media recruiting</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              name="previous_hired"
                              value="career_fairs"
                            />
                            <span>Career fairs</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              name="previous_hired"
                              value="freelance_platforms"
                            />
                            <span>Freelance platforms</span>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              name="previous_hired"
                              value="job_boards"
                            />
                            <span>Job boards (LinkedIn, Indeed, etc.)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              name="previous_hired"
                              value="internal_referrals"
                            />
                            <span>Internal referrals</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              name="previous_hired"
                              value="headhunters"
                            />
                            <span>Headhunters</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              name="previous_hired"
                              value="direct_applications"
                            />
                            <span>Direct applications</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              name="previous_hired"
                              value="never_hired"
                            />
                            <span>Never hired before</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional notes */}
                    <div>
                      <Label className="mb-1 text-gray-800">
                        Additional notes
                      </Label>
                      <Textarea
                        name="additional_notes"
                        placeholder="Add any additional notes or comments..."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
