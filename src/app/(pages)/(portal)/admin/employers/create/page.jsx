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
import { ArrowLeft, EyeOff, User, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AccoladesSection } from "./_components/accolades-section";
import { CustomIndustriesSection } from "./_components/custom-industries-section";
import { Progress } from "./_components/progress";
import { useActionState } from "react";
import { PrimaryButton } from "@/components/ui/buttons/primary-button";
import { createCompanyData } from "./actions";
import { IndustryCategoriesSection } from "./_components/industry-categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { Textarea } from "@/components/ui/textarea";

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-row">
        <div className="flex flex-row items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="!mb-0 text-4xl px-4 font-bold text-gray-900">
            Create a New Employer Profile
          </h1>
        </div>
      </div>

      {/* Content */}
      <div>
        <Progress value={50} />
        <p className="text-sm text-gray-600 mt-1 mb-6 flex justify-between">
          <span>Profile completeness:</span>
          <span>50%</span>
        </p>
      </div>

      {/* Formulario original */}
      <form ref={formRef} className="flex flex-col gap-6" action={CompanyData}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-6">
            {/* Employer Information */}
            <Card className="bg-white">
              <CardContent className="">
                <div className="flex items-center space-y-1.5 p-6">
                  <Building2 />
                  <h3 className="!mb-0 ml-1 text-lg font-semibold text-gray-900">
                    Employer Details
                  </h3>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div className="md:col-span-2">
                      <Label
                        htmlFor="company_name"
                        className="mb-1 text-gray-800"
                      >
                        Company Name
                      </Label>
                      <Input
                        type="text"
                        name="company_name"
                        className="w-full border p-2 rounded"
                        placeholder="Company Name"
                      />
                    </div>

                    {/* Industry */}
                    <div className="md:col-span-2">
                      <Label
                        htmlFor="industries"
                        className="mb-1 text-gray-800"
                      >
                        Industry
                      </Label>

                      <IndustryCategoriesSection
                        value={industryValue}
                        onValueChange={setIndustryValue}
                      />
                    </div>
                    {checked && (
                      <div className="md:col-span-2">
                        <CustomIndustriesSection
                          customIndustries={customIndustries}
                          setCustomIndustries={setCustomIndustries}
                          placeholder={
                            "Add your custom industry types and press Enter"
                          }
                        />
                      </div>
                    )}
                    {/* No renderizar AccoladesSection aquí, solo en la sección principal */}
                    <div className="md:col-span-2" />

                    {/* Company Logo */}
                    <div className="md:col-span-2">
                      <Label className="mb-1 text-gray-800">Company Logo</Label>
                      <div className="flex flex-row items-center space-x-4">
                        <Input
                          type="text"
                          name="logo_url"
                          className="w-full border p-2 rounded"
                          placeholder="Logo URL"
                        />
                        <PrimaryButton
                          icon={<UploadIcon />}
                          text="Upload Logo"
                        />
                      </div>
                    </div>

                    {/* Company Size */}
                    <div>
                      <Label
                        htmlFor="company_size"
                        className="mb-1 text-gray-800"
                      >
                        Company Size
                      </Label>
                      <Select
                        name="company_size"
                        placeholder="Select company size"
                      >
                        <SelectTrigger className="h-9 px-3 py-1 text-sm">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">
                            51-200 employees
                          </SelectItem>
                          <SelectItem value="201-500">
                            201-500 employees
                          </SelectItem>
                          <SelectItem value="501-1000">
                            501-1000 employees
                          </SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location */}
                    <div>
                      <Label
                        htmlFor="company_location"
                        className="mb-1 text-gray-800"
                      >
                        Location
                      </Label>
                      <Input
                        type="text"
                        name="company_location"
                        className="w-full border p-2 rounded"
                        placeholder="Location"
                      />
                    </div>

                    {/* Founded Year */}
                    <div>
                      <Label
                        htmlFor="founded_year"
                        className="mb-1 text-gray-800"
                      >
                        Founded Year
                      </Label>
                      <Input
                        type="text"
                        name="founded_year"
                        className="w-full border p-2 rounded"
                        placeholder="Founded"
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <Label
                        htmlFor="website_url"
                        className="mb-1 text-gray-800"
                      >
                        Website
                      </Label>
                      <Input
                        type="text"
                        name="website_url"
                        className="w-full border p-2 rounded"
                        placeholder="Website"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About the Employer */}
            <Card className="bg-white">
              <CardContent className="p-6 space-y-6">
                <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                  About the Employer
                </h3>
                <Textarea name="company_about" />
              </CardContent>
            </Card>

            {/* Work Environment */}
            <Card className="bg-white">
              <CardContent className="p-6 space-y-6">
                <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                  Work Environment
                </h3>
                <Textarea name="work_environment" />
              </CardContent>
            </Card>

            {/* Pollen loves */}
            <Card className="bg-white">
              <CardContent className="p-6 space-y-6">
                <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                  Pollen loves
                </h3>
                <Textarea name="company_loves" />
              </CardContent>
            </Card>

            {/* Accolades & Acreditations */}
            <Card className="bg-white">
              <CardContent className="p-6 space-y-6">
                <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                  Accolades & Acreditations
                </h3>
                <AccoladesSection
                  accolades={accolades}
                  setAccolades={setAccolades}
                />
              </CardContent>
            </Card>

            {/* entry-level */}
            <Card className="bg-white">
              <CardContent className="p-6 space-y-6">
                <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                  Entry-Level Support
                </h3>
                <Textarea name="company_entry_level" />
              </CardContent>
            </Card>
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
