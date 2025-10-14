"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Globe,
  CheckCircle,
  EyeOff,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert";
import { CompanyInformation } from "@/employers/view/_components/view/company-information";
import { AboutCompany } from "@/employers/view/_components/view/about-company";
import { WorkEnvironment } from "@/employers/view/_components/view/work-environment";
import { PollenLoves } from "@/employers/view/_components/view/pollen-loves";
import { EntryLevelSupport } from "@/employers/view/_components/view/entry-level-support";
import { AccoladesAccreditations } from "@/employers/view/_components/view/accolades-accreditations";
import { SocialMedia } from "@/employers/view/_components/view/social-media";
import { ContactInformation } from "@/employers/view/_components/view/contact-information";
import { ProfileStatus } from "@/employers/view/_components/view/profile-status";
import { InternalPollenData } from "@/employers/view/_components/view/internal-pollen-data";
import { JobPostings } from "@/employers/view/_components/view/job-postings";
import { useEmployerProfileForm } from "./hooks/useEmployerProfileForm";
import { fetchJobsByEmployer } from "./actions";

export default function EmployerProfileConsolidated({ employerProfile }) {
  const router = useRouter();

  const {
    company,
    isEditing,
    setIsEditing,
    editData,
    setEditData,
    jobs,
    isLoadingJobs,
    setJobs,
    setIsLoadingJobs,
    handleInputChange,
    handleEdit,
    handleCancel,
    handleSave,
    handleSetLive,
    handleHideProfile,
    handleDelete,
  } = useEmployerProfileForm(employerProfile);

  // Fetch jobs when component mounts or company.id changes
  useEffect(() => {
    const loadJobs = async () => {
      if (company.id) {
        setIsLoadingJobs(true);
        try {
          const result = await fetchJobsByEmployer(company.id);
          if (Array.isArray(result)) {
            setJobs(result);
          } else {
            setJobs([]);
          }
        } catch (error) {
          console.error("Error fetching jobs:", error);
          setJobs([]);
        } finally {
          setIsLoadingJobs(false);
        }
      }
    };

    loadJobs();
  }, [company.id, setIsLoadingJobs, setJobs]);

  return (
    <div className="flex flex-col w-full mx-auto py-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            {isEditing ? (
              <Input
                value={editData?.company_name || ""}
                onChange={(e) =>
                  handleInputChange("company_name", e.target.value)
                }
                placeholder="Company name"
                className="text-3xl font-bold bg-transparent border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="text-3xl font-bold">{company.company_name}</div>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                onClick={() => {
                  // TODO: Implement save functionality
                  console.log("Saving changes:", editData);
                  setIsEditing(false);
                }}
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              {company.status === "draft" && (
                <Button
                  size="sm"
                  onClick={() => {
                    // TODO: Implement set live functionality
                    console.log("Setting profile live");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Set Live
                </Button>
              )}
              {company.status === "live" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // TODO: Implement hide profile functionality
                    console.log("Hiding profile");
                  }}
                  className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                >
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide Profile
                </Button>
              )}
              {company.status === "hidden" && (
                <Button
                  size="sm"
                  onClick={() => {
                    // TODO: Implement set live functionality
                    console.log("Setting profile live");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Set Live
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("/employer-portal", "_blank")}
                className="text-purple-600 border-purple-300 hover:bg-purple-50"
              >
                <Globe className="h-4 w-4 mr-2" />
                Employer Portal
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(true);
                  setEditData(company);
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Company Profile</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {company.company_name}? This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                  Delete Profile
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <CompanyInformation
            company={company}
            isEditing={isEditing}
            editData={editData}
            onInputChange={handleInputChange}
          />

          {/* About Company */}
          <AboutCompany about={company.about} />

          {/* Work Environment */}
          <WorkEnvironment workEnvironment={company.workEnvironment} />

          {/* Why does Pollen love this company */}
          <PollenLoves pollenLove={company.pollenLove} />

          {/* Entry-Level Support */}
          <EntryLevelSupport entryLevelSupport={company.entryLevelSupport} />

          {/* Accolades & Accreditations */}
          <AccoladesAccreditations accolades={company.accolades} />

          {/* Social Media Links */}
          <SocialMedia
            socialMediaLinks={company.socialMediaLinks}
            glassdoorPage={company.glassdoorPage}
          />
        </div>

        {/* Right Column - Contact & Meta Information */}
        <div className="space-y-6">
          {/* Contact Information */}
          <ContactInformation
            contactName={company.contactName}
            contactJobTitle={company.contactJobTitle}
            contactEmail={company.contactEmail}
            contactPhone={company.contactPhone}
          />

          {/* Profile Metadata */}
          <ProfileStatus
            status={company.status}
            createdDate={company.createdDate}
            lastUpdated={company.lastUpdated}
            profileCompleteness={company.profileCompleteness}
          />

          {/* Internal Pollen Data */}
          <InternalPollenData
            howDidTheyHearAboutUs={company.howDidTheyHearAboutUs}
            howDidTheyHearMoreInfo={company.howDidTheyHearMoreInfo}
            entryLevelHiringFrequency={company.entryLevelHiringFrequency}
            previousHiringMethods={company.previousHiringMethods}
            additionalNotes={company.additionalNotes}
          />
        </div>
      </div>

      {/* Job Postings Section - Full Width */}
      <JobPostings
        jobs={jobs}
        isLoading={isLoadingJobs}
        companyId={company.id}
      />
    </div>
  );
}
