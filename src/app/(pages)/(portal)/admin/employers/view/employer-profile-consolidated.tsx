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
import { useState, useEffect } from "react";
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

export default function EmployerProfileConsolidated({ employerProfile }) {
  const router = useRouter();

  const fetchJobsByEmployer = async (employerId) => {
    return [];
  };

  const company = {
    ...employerProfile,
    profileCompleteness: 70,
    logo: employerProfile.logo_url,
    size: employerProfile.company_size,
    location: employerProfile.company_location,
    foundedYear: employerProfile.founded_year,
    website: employerProfile.website_url,
    industries: employerProfile.industries || ["Technology"],
    about: employerProfile.company_about || "No description provided.",
    workEnvironment: employerProfile.work_environment || "Not specified.",
    pollenLove: employerProfile.company_loves || "Not specified.",
    accolades: employerProfile.company_accolades || [
      "Great Place to Work 2023",
    ],
    socialMediaLinks: [
      { id: 1, platform: "Twitter", url: employerProfile.twitter_url },
      { id: 2, platform: "LinkedIn", url: employerProfile.linkedin_url },
      { id: 3, platform: "Glassdoor", url: employerProfile.glassdoor_url },
    ],
    contactName: employerProfile.contact_name || "Not specified",
    contactJobTitle: employerProfile.contact_job_title || "Not specified",
    contactEmail: employerProfile.contact_email || "Not specified",
    contactPhone: employerProfile.contact_phone || "Not specified",
    createdDate: employerProfile.created_at || "19 Aug 2025",
    lastUpdated: employerProfile.updated_at || "19 Aug 2025",
    status: employerProfile.approval_status || "draft",
    howDidTheyHearAboutUs:
      employerProfile.how_did_you_hear_about_us || "Not specified",
    howDidTheyHearMoreInfo: employerProfile.more_info || "Not specified",
    entryLevelHiringFrequency:
      employerProfile.hiring_frequency || "Not specified",
    previousHiringMethods: employerProfile.previous_hiring_methods || [""],
    additionalNotes: employerProfile.additional_notes || "Not specified",
  };

  const jobsData = employerProfile.jobs || [];

  const [jobs, setJobs] = useState(jobsData);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [isEditing, setIsEditing] = useState();
  const [editData, setEditData] = useState(null);
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
          if (result.error) {
            console.error("Error fetching jobs:", result.error);
            setJobs([]);
          } else {
            setJobs(result.data || []);
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
  }, [company.id]);

  const handleInputChange = (field, value) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

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
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-4">
            <div className="relative">
              {company.logo || editData?.logo ? (
                <img
                  src={editData?.logo || company.logo}
                  alt={`${company.company_name} logo`}
                  className="h-12 w-12 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() =>
                    isEditing && document.getElementById("logo-upload")?.click()
                  }
                />
              ) : (
                <div
                  className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                  onClick={() =>
                    isEditing && document.getElementById("logo-upload")?.click()
                  }
                >
                  <Building2 className="h-6 w-6 text-gray-500" />
                </div>
              )}
              {isEditing && (
                <>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const result = event.target?.result;
                          handleInputChange("logo", result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 text-xs">
                    <Edit className="h-3 w-3" />
                  </div>
                </>
              )}
            </div>
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
                <h1 className="text-3xl font-bold">{company.company_name}</h1>
              )}
              <div className="flex items-center space-x-4 mt-2">
                {getStatusBadge(company.status)}
                <span className="text-sm text-muted-foreground">
                  {company.profileCompleteness || 70}% complete
                </span>
              </div>
            </div>
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
          <Card className="p-6">
            <CardHeader>
              <CardTitle>About the Company</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editData?.about || ""}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  placeholder="Tell the story of what makes this company tick - what do they do, who do they serve, and what drives them forward?"
                  rows={4}
                />
              ) : (
                <p className="text-sm leading-relaxed">{company.about}</p>
              )}
            </CardContent>
          </Card>

          {/* Work Environment */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Work Environment</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editData?.workEnvironment || ""}
                  onChange={(e) =>
                    handleInputChange("workEnvironment", e.target.value)
                  }
                  placeholder="Paint a picture of daily life here - what's the vibe like? How do people collaborate? What makes employees excited to come to work?"
                  rows={4}
                />
              ) : (
                <p className="text-sm leading-relaxed">
                  {company.workEnvironment}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Why does Pollen love this company */}
          {(company.pollenLove || isEditing) && (
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Pollen loves...</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editData?.pollenLove || ""}
                    onChange={(e) =>
                      handleInputChange("pollenLove", e.target.value)
                    }
                    placeholder="• They genuinely care about growing their people - career development isn't just a buzzword here&#10;• Work-life balance actually means something - flexibility that works for real humans&#10;• Diversity and inclusion is lived, not just talked about - you can see it in action"
                    rows={4}
                  />
                ) : (
                  <div className="text-sm leading-relaxed">
                    {company.pollenLove?.split("\n").map((line, idx) => (
                      <p key={`pollen-love-${idx}`} className="mb-1">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Entry-Level Support */}
          {(company.entryLevelSupport || isEditing) && (
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Entry-Level Support</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editData?.entryLevelSupport || ""}
                    onChange={(e) =>
                      handleInputChange("entryLevelSupport", e.target.value)
                    }
                    placeholder="How does this company nurture fresh talent? Think mentoring magic, training programmes, or that amazing buddy system that helps new starters find their feet..."
                    rows={4}
                  />
                ) : (
                  <p className="text-sm leading-relaxed">
                    {company.entryLevelSupport}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Accolades & Accreditations */}
          {company.accolades && company.accolades.length > 0 && (
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Accolades & Accreditations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-3">
                    {/* Selected accolades */}
                    {editData?.accolades && editData.accolades.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {editData.accolades.map((accolade, idx) => (
                          <Badge
                            key={`accolade-${idx}`}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {accolade}
                            <button
                              type="button"
                              onClick={() => {
                                const newAccolades =
                                  editData.accolades?.filter(
                                    (a) => a !== accolade,
                                  ) || [];
                                handleInputChange("accolades", newAccolades);
                              }}
                              className="ml-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    {/* Add new accolades */}
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add accolade..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            const value = e.currentTarget.value.trim();
                            if (
                              value &&
                              !editData?.accolades?.includes(value)
                            ) {
                              const newAccolades = [
                                ...(editData?.accolades || []),
                                value,
                              ];
                              handleInputChange("accolades", newAccolades);
                              e.currentTarget.value = "";
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {company.accolades.map((accolade, idx) => (
                      <Badge
                        key={`view-accolade-${idx}`}
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {accolade}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Social Media Links */}
          {company.socialMediaLinks && company.socialMediaLinks.length > 0 && (
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Social Media</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {company.socialMediaLinks
                  .filter((link) => link.url)
                  .map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">
                        {link.platform}
                      </span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm truncate max-w-xs"
                      >
                        {link.url.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  ))}
                {company.glassdoorPage && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Glassdoor</span>
                    <a
                      href={company.glassdoorPage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm truncate max-w-xs"
                    >
                      {company.glassdoorPage.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Contact & Meta Information */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isEditing ? (
                <>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Contact Name
                    </label>
                    <Input
                      value={editData?.contactName || ""}
                      onChange={(e) =>
                        handleInputChange("contactName", e.target.value)
                      }
                      placeholder="John Smith"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Job Title
                    </label>
                    <Input
                      value={editData?.contactJobTitle || ""}
                      onChange={(e) =>
                        handleInputChange("contactJobTitle", e.target.value)
                      }
                      placeholder="HR Manager"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <Input
                      value={editData?.contactEmail || ""}
                      onChange={(e) =>
                        handleInputChange("contactEmail", e.target.value)
                      }
                      placeholder="hr@company.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Phone
                    </label>
                    <Input
                      value={editData?.contactPhone || ""}
                      onChange={(e) =>
                        handleInputChange("contactPhone", e.target.value)
                      }
                      placeholder="+44 20 1234 5678"
                      className="mt-1"
                    />
                  </div>
                </>
              ) : (
                <>
                  {company.contactName && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Contact Name
                      </label>
                      <p className="mt-1">{company.contactName}</p>
                    </div>
                  )}
                  {company.contactJobTitle && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Job Title
                      </label>
                      <p className="mt-1">{company.contactJobTitle}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <div className="flex items-center space-x-1 mt-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${company.contactEmail}`}
                        className="text-blue-600 hover:underline"
                      >
                        {company.contactEmail}
                      </a>
                    </div>
                  </div>
                  {company.contactPhone && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Phone
                      </label>
                      <div className="flex items-center space-x-1 mt-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`tel:${company.contactPhone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {company.contactPhone}
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Profile Metadata */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Profile Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Status
                </label>
                <div className="mt-1">{getStatusBadge(company.status)}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Created Date
                </label>
                <div className="flex items-center space-x-1 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{company.createdDate || "19 Aug 2025"}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </label>
                <div className="flex items-center space-x-1 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{company.lastUpdated || "19 Aug 2025"}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Completeness
                </label>
                <div className="mt-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${company.profileCompleteness || 85}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {company.profileCompleteness || 85}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Internal Pollen Data */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <EyeOff className="h-5 w-5" />
                <span>Internal Pollen Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label className="text-sm font-medium">
                      How did they hear about us? *
                    </Label>
                    <Select
                      value={editData?.howDidTheyHearAboutUs || ""}
                      onValueChange={(value) =>
                        handleInputChange("howDidTheyHearAboutUs", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select source..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Google Search">
                          Google Search
                        </SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem>
                        <SelectItem value="Social Media">
                          Social Media
                        </SelectItem>
                        <SelectItem value="Industry Event">
                          Industry Event
                        </SelectItem>
                        <SelectItem value="Partner/Agency">
                          Partner/Agency
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      More info (if applicable)
                    </Label>
                    <Textarea
                      value={editData?.howDidTheyHearMoreInfo || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "howDidTheyHearMoreInfo",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. Name of referrer, specific event, publication name..."
                      className="mt-1 min-h-[60px]"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Frequency of hiring at entry level *
                    </Label>
                    <Select
                      value={editData?.entryLevelHiringFrequency || ""}
                      onValueChange={(value) =>
                        handleInputChange("entryLevelHiringFrequency", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select frequency..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="One-off / infrequent">
                          One-off / infrequent
                        </SelectItem>
                        <SelectItem value="1-5 hires per year">
                          1-5 hires per year
                        </SelectItem>
                        <SelectItem value="5-15 hires per year">
                          5-15 hires per year
                        </SelectItem>
                        <SelectItem value="15-50 hires per year">
                          15-50 hires per year
                        </SelectItem>
                        <SelectItem value="50+ hires per year">
                          50+ hires per year
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      How they&apos;ve hired previously *
                    </Label>
                    <p className="text-sm text-gray-600 mt-1 mb-2">
                      Select all methods they have used before
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Recruitment agencies",
                        "Job boards (Indeed, LinkedIn, etc.)",
                        "University partnerships",
                        "Internal referrals",
                        "Social media recruiting",
                        "Headhunters",
                        "Career fairs",
                        "Direct applications",
                        "Freelance platforms",
                        "Never hired before",
                      ].map((method) => (
                        <div
                          key={method}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={method}
                            checked={
                              editData?.previousHiringMethods?.includes(
                                method,
                              ) || false
                            }
                            onCheckedChange={(checked) => {
                              const current =
                                editData?.previousHiringMethods || [];
                              const updated = checked
                                ? [...current, method]
                                : current.filter((m) => m !== method);
                              handleInputChange(
                                "previousHiringMethods",
                                updated,
                              );
                            }}
                          />
                          <Label
                            htmlFor={method}
                            className="text-sm cursor-pointer"
                          >
                            {method}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Additional notes
                    </Label>
                    <Textarea
                      value={editData?.additionalNotes || ""}
                      onChange={(e) =>
                        handleInputChange("additionalNotes", e.target.value)
                      }
                      placeholder="Key pain points, typical screening processes, specific requirements, or any other relevant information..."
                      className="mt-1 min-h-[100px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Include details about their current hiring challenges,
                      typical screening processes, or specific requirements
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {company.howDidTheyHearAboutUs && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        How did they hear about us?
                      </Label>
                      <p className="mt-1">{company.howDidTheyHearAboutUs}</p>
                    </div>
                  )}

                  {company.howDidTheyHearMoreInfo && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        More info
                      </Label>
                      <p className="mt-1 text-sm text-gray-700">
                        {company.howDidTheyHearMoreInfo}
                      </p>
                    </div>
                  )}

                  {company.entryLevelHiringFrequency && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Frequency of hiring at entry level
                      </Label>
                      <p className="mt-1">
                        {company.entryLevelHiringFrequency}
                      </p>
                    </div>
                  )}

                  {company.previousHiringMethods &&
                    company.previousHiringMethods.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          How they&apos;ve hired previously
                        </Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {company.previousHiringMethods.map(
                            (method, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {method}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                  {company.additionalNotes && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Additional notes
                      </Label>
                      <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                        {company.additionalNotes}
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
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
