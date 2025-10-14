"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Building2,
  Edit,
  Globe,
  CheckCircle,
  Clock,
  EyeOff,
  Save,
  Trash2,
  X,
  MapPin,
  Award,
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Plus,
  Briefcase,
  Users,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  const getJobStatusBadge = (status) => {
    if (status === "live") {
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          Live
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="bg-orange-50 text-orange-700 border-orange-200"
      >
        <Clock className="w-3 h-3 mr-1" />
        Draft
      </Badge>
    );
  };

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

  const getStatusBadge = (status) => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Live
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <Clock className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        );
      case "hidden":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            <EyeOff className="h-3 w-3 mr-1" />
            Hidden
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status || "Draft"}</Badge>;
    }
  };

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
      <Card className="mt-6 p-6">
        <CardHeader className="mb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>Job Postings</span>
              <div className="flex items-center space-x-2">
                {jobs.filter((job) => job.status === "live").length > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {jobs.filter((job) => job.status === "live").length} Live
                  </Badge>
                )}
                {jobs.filter((job) => job.status === "draft").length > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-200"
                  >
                    {jobs.filter((job) => job.status === "draft").length} Draft
                  </Badge>
                )}
                {jobs.filter((job) => job.status === "hidden").length > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-gray-50 text-gray-700 border-gray-200"
                  >
                    {jobs.filter((job) => job.status === "hidden").length}{" "}
                    Hidden
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              // onClick={() =>
              // setLocation(`/admin/companies/${company.id}/jobs/create`)
              // }
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Job
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => {
                  // Store current page so job review can navigate back correctly
                  sessionStorage.setItem(
                    "previousPage",
                    window.location.pathname,
                  );
                  router.push(`/admin/jobs-managment/review/${job.id}`);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {job.job_title}
                      </span>
                      {getJobStatusBadge(job.status)}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {job.applicationsCount} applications
                      </span>
                      <span>{job.salaryRange}</span>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Created {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
