import { useState } from "react";
import * as React from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Building2,
  Users,
  Globe,
  MapPin,
  Mail,
  Phone,
  LinkedinIcon,
  Edit,
  Trash2,
  Calendar,
  User,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  Award,
  Save,
  X,
  Briefcase,
  Plus,
  MoreHorizontal,
  Copy,
  EyeOff,
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/BackButton";
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
} from "@/components/ui/alert-dialog";

interface Company {
  id: string;
  companyName: string;
  industry: string;
  companySize: string;
  location: string;
  website?: string;
  foundedYear?: string;
  about: string;
  workEnvironment: string;
  entryLevelSupport?: string;
  pollenLove?: string;
  accolades?: string[];
  contactName?: string;
  contactJobTitle?: string;
  contactEmail: string;
  contactPhone?: string;
  socialMediaLinks?: Array<{
    id: string;
    platform: string;
    url: string;
  }>;
  glassdoorPage?: string;
  logo?: string;
  status?: "live" | "draft" | "hidden";
  profileCompleteness?: number;
  createdDate?: string;
  lastUpdated?: string;
  assignedAdmin?: string;
  liveJobsCount?: number;
  draftJobsCount?: number;

  // Internal Pollen Data
  howDidTheyHearAboutUs?: string;
  howDidTheyHearMoreInfo?: string;
  entryLevelHiringFrequency?: string;
  previousHiringMethods?: string[];
  additionalNotes?: string;
}

export default function AdminCompanyProfileDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check for edit query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const shouldEdit = urlParams.get("edit") === "true";

  const [isEditing, setIsEditing] = useState(shouldEdit);
  const [editData, setEditData] = useState<Company | null>(null);

  // Get the appropriate company data based on ID
  const getCompanyData = (companyId: string) => {
    const companies = {
      "1": {
        id: "1",
        companyName: "TechFlow Solutions",
        industry: "Technology",
        companySize: "51-200 employees",
        location: "London, UK",
        website: "https://techflow.co.uk",
        foundedYear: "2018",
        about:
          "A cutting-edge technology company specialising in scalable software solutions for enterprise clients. They pride themselves on innovation, collaboration, and creating technology that makes a real difference in the world.",
        workEnvironment:
          "They foster a dynamic, inclusive environment where creativity thrives. Their open-plan offices feature collaboration spaces, quiet zones, and state-of-the-art equipment. They believe in work-life balance with flexible hours and remote work options.",
        entryLevelSupport:
          "Comprehensive mentorship programme, structured learning paths, and dedicated career development sessions with senior team members.",
        pollenLove:
          "• Innovation-driven culture\n• Commitment to sustainability\n• Exceptional employee development programmes\n• Collaborative team environment\n• Flexible working arrangements\n• Modern tech stack",
        accolades: [
          "Best Tech Startup 2023 - London Tech Awards",
          "Innovation Excellence Award - UK Business Awards",
          "Top Employer for Graduates - TechCareers UK",
        ],
        contactName: "Sarah Johnson",
        contactJobTitle: "Head of People & Culture",
        contactEmail: "hr@techflow.co.uk",
        contactPhone: "+44 20 1234 5678",
        socialMediaLinks: [
          {
            id: "1",
            platform: "LinkedIn",
            url: "https://linkedin.com/company/techflow-solutions",
          },
          { id: "2", platform: "Twitter", url: "https://twitter.com/techflow" },
        ],
        glassdoorPage:
          "https://glassdoor.com/Overview/Working-at-TechFlow-Solutions",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&h=120&fit=crop",
        status: "hidden" as const,
        profileCompleteness: 95,
        createdDate: "2025-01-15",
        lastUpdated: "2025-01-18",
        assignedAdmin: "Holly",
        liveJobsCount: 3,
        draftJobsCount: 1,

        // Internal Pollen Data
        howDidTheyHearAboutUs: "LinkedIn",
        howDidTheyHearMoreInfo:
          "Found through a LinkedIn post about graduate recruitment solutions",
        entryLevelHiringFrequency: "5-15 hires per year",
        previousHiringMethods: [
          "Recruitment agencies",
          "Job boards (Indeed, LinkedIn, etc.)",
          "University partnerships",
        ],
        additionalNotes:
          "Company is looking to streamline their graduate recruitment process and reduce dependency on expensive recruitment agencies. They're particularly interested in finding candidates with strong problem-solving abilities and values fit.",
      },
      "2": {
        id: "2",
        companyName: "Creative Studios",
        industry: "Media & Entertainment",
        companySize: "11-50 employees",
        location: "Manchester, UK",
        website: "https://creativestudios.co.uk",
        foundedYear: "2020",
        about:
          "A dynamic creative agency specialising in digital marketing, brand development, and multimedia content production. They bring innovative ideas to life through cutting-edge design and storytelling.",
        workEnvironment:
          "A vibrant, creative workspace that encourages artistic expression and collaboration. Their studio features modern design spaces, creative meeting rooms, and the latest equipment for content production.",
        entryLevelSupport:
          "Creative mentorship programme with industry professionals, hands-on project experience, and portfolio development support.",
        pollenLove:
          "Creative freedom, innovative projects, collaborative culture, and opportunities to work with diverse clients across multiple industries.",
        accolades: [
          "Best Creative Agency 2024 - Manchester Business Awards",
          "Digital Innovation Award - UK Creative Awards",
        ],
        contactName: "James Wilson",
        contactEmail: "hello@creativestudios.co.uk",
        contactPhone: "+44 161 987 6543",
        socialMediaLinks: [
          {
            id: "1",
            platform: "LinkedIn",
            url: "https://linkedin.com/company/creative-studios-uk",
          },
          {
            id: "2",
            platform: "Instagram",
            url: "https://instagram.com/creativestudiosuk",
          },
          {
            id: "3",
            platform: "TikTok",
            url: "https://tiktok.com/@creativestudiosuk",
          },
        ],
        glassdoorPage: "",
        logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=120&h=120&fit=crop",
        status: "draft" as const,
        profileCompleteness: 78,
        createdDate: "2025-01-16",
        lastUpdated: "2025-01-17",
        assignedAdmin: "David",
        liveJobsCount: 0,
        draftJobsCount: 0,
      },
      "3": {
        id: "3",
        companyName: "Digital Insights Ltd",
        industry: "Data & Analytics",
        companySize: "201-500 employees",
        location: "Birmingham, UK",
        website: "https://digitalinsights.co.uk",
        foundedYear: "2017",
        about:
          "A leading data analytics firm helping businesses unlock the power of their data through advanced analytics, machine learning, and business intelligence solutions.",
        workEnvironment:
          "A data-driven environment with state-of-the-art technology, collaborative analysis spaces, and continuous learning opportunities in emerging analytics technologies.",
        entryLevelSupport:
          "Comprehensive data science training programme, mentorship with senior analysts, and certification support for industry-standard tools and platforms.",
        pollenLove:
          "Data-driven decision making culture, cutting-edge technology stack, collaborative analytics teams, and impactful projects across various industries.",
        accolades: [
          "Data Excellence Award 2023 - UK Data Awards",
          "Top Analytics Employer - TechTalent UK",
        ],
        contactName: "Dr. Rachel Green",
        contactEmail: "contact@digitalinsights.co.uk",
        contactPhone: "+44 121 555 0123",
        linkedinPage: "https://linkedin.com/company/digital-insights-ltd",
        glassdoorPage:
          "https://glassdoor.com/Overview/Working-at-Digital-Insights",
        logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&h=120&fit=crop",
        status: "draft" as const,
        profileCompleteness: 65,
        createdDate: "2025-01-14",
        lastUpdated: "2025-01-16",
        assignedAdmin: "Sophie",
        liveJobsCount: 0,
        draftJobsCount: 0,
      },
    };
    return companies[companyId as keyof typeof companies];
  };

  const {
    data: company,
    isLoading,
    error,
  } = useQuery<Company>({
    queryKey: [`/api/admin/companies/${id}`],
    enabled: !!id,
    initialData: id ? getCompanyData(id) : undefined,
  });

  // Update company mutation
  const updateCompanyMutation = useMutation({
    mutationFn: async (updatedData: Company) => {
      const response = await fetch(`/api/admin/companies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      return result;
    },
    onSuccess: (response, updatedData) => {
      // Update the cache with the new data instead of invalidating
      if (response.success && response.company) {
        queryClient.setQueryData(
          [`/api/admin/companies/${id}`],
          response.company,
        );
      } else {
        // Fallback to updated data if API doesn't return the company
        queryClient.setQueryData([`/api/admin/companies/${id}`], updatedData);
      }
      // Still invalidate the companies list to keep it fresh
      queryClient.invalidateQueries({ queryKey: ["/api/admin/companies"] });
      setIsEditing(false);
      setEditData(null);
      toast({
        title: "Profile Updated",
        description: "Company profile has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update company profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(company || null);
  };

  // Auto-enter edit mode and set edit data if company is loaded and we should edit
  React.useEffect(() => {
    if (shouldEdit && company && !editData) {
      setEditData(company);
    }
  }, [shouldEdit, company, editData]);

  const handleSave = () => {
    if (editData) {
      updateCompanyMutation.mutate(editData);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleInputChange = (
    field: keyof Company,
    value: string | string[],
  ) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const handleSetLive = () => {
    if (company) {
      const updatedCompany = { ...company, status: "live" as const };
      updateCompanyMutation.mutate(updatedCompany);
    }
  };

  const handleHideProfile = () => {
    if (company) {
      const updatedCompany = { ...company, status: "hidden" as const };
      updateCompanyMutation.mutate(updatedCompany);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4 mb-6">
          <BackButton />
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mt-2 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4 mb-6">
          <BackButton />
          <div>
            <h1 className="text-3xl font-bold">Company Not Found</h1>
            <p className="text-muted-foreground">
              The requested company profile could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status?: string) => {
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
          <BackButton />
          <div className="flex items-center space-x-4">
            <div className="relative">
              {company.logo || editData?.logo ? (
                <img
                  src={editData?.logo || company.logo}
                  alt={`${company.companyName} logo`}
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
                          const result = event.target?.result as string;
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
                  value={editData?.companyName || ""}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  placeholder="Company name"
                  className="text-3xl font-bold bg-transparent border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <h1 className="text-3xl font-bold">{company.companyName}</h1>
              )}
              <div className="flex items-center space-x-4 mt-2">
                {getStatusBadge(company.status)}
                <span className="text-sm text-muted-foreground">
                  {company.profileCompleteness || 85}% complete
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                size="sm"
                disabled={updateCompanyMutation.isPending}
              >
                <Save className="h-4 w-4 mr-2" />
                {updateCompanyMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={updateCompanyMutation.isPending}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              {company.status === "draft" && (
                <Button
                  size="sm"
                  onClick={handleSetLive}
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
                  onClick={handleHideProfile}
                  className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                >
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide Profile
                </Button>
              )}
              {company.status === "hidden" && (
                <Button
                  size="sm"
                  onClick={handleSetLive}
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
              <Button variant="outline" size="sm" onClick={handleEdit}>
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
                  Are you sure you want to delete {company.companyName}? This
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Company Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Industry
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editData?.industry || ""}
                      onChange={(e) =>
                        handleInputChange("industry", e.target.value)
                      }
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="secondary">{company.industry}</Badge>
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Company Size
                  </Label>
                  {isEditing ? (
                    <Select
                      value={editData?.companySize || ""}
                      onValueChange={(value) =>
                        handleInputChange("companySize", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10 employees">
                          1-10 employees
                        </SelectItem>
                        <SelectItem value="11-50 employees">
                          11-50 employees
                        </SelectItem>
                        <SelectItem value="51-200 employees">
                          51-200 employees
                        </SelectItem>
                        <SelectItem value="201-500 employees">
                          201-500 employees
                        </SelectItem>
                        <SelectItem value="501-1000 employees">
                          501-1000 employees
                        </SelectItem>
                        <SelectItem value="1000+ employees">
                          1000+ employees
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-1">{company.companySize}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editData?.location || ""}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{company.location}</span>
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Founded
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editData?.foundedYear || ""}
                      onChange={(e) =>
                        handleInputChange("foundedYear", e.target.value)
                      }
                      placeholder="e.g. 2018"
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1">
                      {company.foundedYear || "Not specified"}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Website
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editData?.website || ""}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      placeholder="https://company.com"
                      className="mt-1"
                    />
                  ) : company.website ? (
                    <div className="flex items-center space-x-1 mt-1">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  ) : (
                    <p className="mt-1 text-muted-foreground">Not specified</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Company */}
          <Card>
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
          <Card>
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
            <Card>
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
                    {company.pollenLove?.split("\n").map((line, index) => (
                      <p key={index} className="mb-1">
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
            <Card>
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
            <Card>
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
                        {editData.accolades.map((accolade, index) => (
                          <Badge
                            key={index}
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
                    {company.accolades.map((accolade, index) => (
                      <Badge
                        key={index}
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Social Media</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {company.socialMediaLinks.map((link, index) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">{link.platform}</span>
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
          <Card>
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
          <Card>
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
          <Card>
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
                      How they've hired previously *
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
                          How they've hired previously
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
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>Job Postings</span>
              <div className="flex items-center space-x-2">
                {(company.liveJobsCount || 0) > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {company.liveJobsCount} Live
                  </Badge>
                )}
                {(company.draftJobsCount || 0) > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-200"
                  >
                    {company.draftJobsCount} Draft
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setLocation(`/admin/companies/${company.id}/jobs/create`)
              }
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Job
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <JobsList companyId={company.id} />
        </CardContent>
      </Card>
    </div>
  );
}

// Jobs List Component for Company Profile
function JobsList({ companyId }: { companyId: string }) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: jobs = [] } = useQuery({
    queryKey: [`/api/admin/companies/${companyId}/jobs`],
    initialData: [
      {
        id: "1",
        title: "Junior React Developer",
        status: "live",
        location: "London, UK",
        employmentType: "full_time",
        applicationsCount: 12,
        createdAt: "2025-01-15",
        salaryRange: "£25,000 - £35,000",
      },
      {
        id: "2",
        title: "Junior UX Designer",
        status: "live",
        location: "Remote",
        employmentType: "full_time",
        applicationsCount: 8,
        createdAt: "2025-01-16",
        salaryRange: "£22,000 - £28,000",
      },
      {
        id: "3",
        title: "Marketing Coordinator",
        status: "draft",
        location: "London, UK",
        employmentType: "part_time",
        applicationsCount: 0,
        createdAt: "2025-01-17",
        salaryRange: "£30,000 - £35,000",
      },
      {
        id: "4",
        title: "Junior Data Analyst",
        status: "draft",
        location: "Manchester, UK",
        employmentType: "full_time",
        applicationsCount: 0,
        createdAt: "2025-01-18",
        salaryRange: "£20,000 - £26,000",
      },
    ],
  });

  const handleDuplicateJob = async (job: any) => {
    try {
      // Create a duplicated job with draft status
      const duplicatedJob = {
        ...job,
        title: `${job.title} (Copy)`,
        status: "draft",
        applicationsCount: 0,
        createdAt: new Date().toISOString(),
        id: undefined, // Remove ID so it gets a new one
      };

      // In a real app, this would make an API call to create the duplicate
      toast({
        title: "Job Duplicated",
        description: `Successfully created a draft copy of "${job.title}"`,
      });
    } catch (error) {
      toast({
        title: "Duplication Failed",
        description: "Failed to duplicate the job. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleHideJob = async (job: any) => {
    try {
      // In a real app, this would make an API call to hide the job
      toast({
        title: "Job Hidden",
        description: `"${job.title}" has been hidden from public view and can be managed from the hidden jobs section.`,
      });
    } catch (error) {
      toast({
        title: "Hide Failed",
        description: "Failed to hide the job. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getJobStatusBadge = (status: string) => {
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

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No job postings yet</p>
        <p className="text-sm">Create the first job posting for this company</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job: any) => (
        <div
          key={job.id}
          className="border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
          onClick={() => {
            // Store current page so job review can navigate back correctly
            sessionStorage.setItem("previousPage", window.location.pathname);
            setLocation(`/admin/job-review/${job.id}`);
          }}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  {job.title}
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

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDuplicateJob(job);
                }}
                title="Duplicate as Draft"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
