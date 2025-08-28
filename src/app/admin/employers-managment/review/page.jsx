"use client";

import { Button } from "@/components/ui/button";
import {
  Eye,
  Camera,
  Edit,
  MapPin,
  Users,
  Calendar,
  Star,
  ExternalLink,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusInfo } from "./(components)/status-info";
import { Header } from "./(components)/header";
import Details from "./(components)/details";
import Description from "./(components)/description";
import Mission from "./(components)/mission";

const employerProfile = {
  id: 0,
  userId: 0,
  companyName: "CreativeMinds Agency",
  industry: "",
  industries: [],
  location: "London, UK",
  companySize: "20-50 employees",
  foundedYear: 2010,
  workingModel: "Hybrid",
  workingModelTag: "Hybrid",
  description: "We are a creative agency that specializes in branding and design. We are a team of 20 people that are passionate about creating beautiful and functional websites.",
  values: [],
  benefits: [],
  perks: [],
  workOptions: [],
  workEnvironment: "",
  logoUrl: "",
  coverImageUrl: "",
  completionPercentage: 0,
  website: "",
  contactEmail: "",
  contactPhone: "",
  linkedinPage: "",
  glassdoorUrl: "",
  careersPage: "",
  approvalStatus: "pending",
  isComplete: true,
  hasUnapprovedChanges: true,
  lastUpdated: "",
  testimonials: [],
  awards: [],
  programmes: [],
  gallery: [],
  companyStatement: "",
  industries: ["Marketing & Advertising", "Creative Services", "Digital Media"]
};

export default function EmployerProfileConsolidated() {
  const [setExpandedSection] = useState(null);
  const [setShowReviewModal] = useState(false);
  /** @type {{author:string, position:string, rating:number, date:string, feedbackQuality?:number, communicationSpeed?:number, interviewExperience?:number, processTransparency?:number} | null} */
  const [setSelectedReview] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [editingSection, setEditingSection] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [setPendingApproval] = useState(false);
  const [setShowApprovalNotification] = useState(false);

  const getStatusInfo = () => {
    if (!employerProfile) return null;

    if (employerProfile.approvalStatus === "pending") {
      return {
        type: "review",
        icon: Clock,
        title: "Profile Under Review",
        message:
          "Our team will review your profile and it's usually approved within 24 hours. You can continue adding enhancements below.",
        bgColor: "bg-blue-50",
        borderColor: "border-l-blue-500",
        textColor: "text-blue-900",
        iconColor: "text-blue-600",
      };
    }

    if (employerProfile.hasUnapprovedChanges) {
      return {
        type: "changes_pending",
        icon: AlertCircle,
        title: "Changes Pending Approval",
        message:
          "Your recent edits are being reviewed and will be live within 24 hours. Your current live profile remains visible to candidates.",
        bgColor: "bg-orange-50",
        borderColor: "border-l-orange-500",
        textColor: "text-orange-900",
        iconColor: "text-orange-600",
      };
    }

    if (employerProfile.approvalStatus === "approved") {
      return {
        type: "live",
        icon: CheckCircle,
        title: "Profile Live",
        message:
          "Your company profile is live and visible to candidates. Any edits will need approval before going live.",
        bgColor: "bg-green-50",
        borderColor: "border-l-green-500",
        textColor: "text-green-900",
        iconColor: "text-green-600",
      };
    }

    if (employerProfile.approvalStatus === "requires_changes") {
      return {
        type: "requires_changes",
        icon: AlertCircle,
        title: "Changes Required",
        message:
          "Your profile requires some updates before it can go live. Please review the feedback below and make the necessary changes. Changes usually take effect within 24 hours.",
        bgColor: "bg-red-50",
        borderColor: "border-l-red-500",
        textColor: "text-red-900",
        iconColor: "text-red-600",
        feedback:
          "Hi there! We've reviewed your profile and it looks great overall. However, we need you to update the company description to be more specific about the services you offer and your target clients. Also, please add at least 2-3 employee testimonials to help candidates understand your company culture better. Once these changes are made, we'll approve your profile within 24 hours. Thanks! - The Pollen Team",
      };
    }

    // Default fallback
    return {
      type: "review",
      icon: Clock,
      title: "Profile Under Review",
      message:
        "Our team will review your profile and it's usually approved within 24 hours. You can continue adding enhancements below.",
      bgColor: "bg-blue-50",
      borderColor: "border-l-blue-500",
      textColor: "text-blue-900",
      iconColor: "text-blue-600",
    };
  };
  const statusInfo = getStatusInfo();

  return (
    <>
      {/* Header */}
      <Header employerProfile={employerProfile} />

      {/* Body*/}
      <div className="flex justify-center">
        <div className="max-w-screen-xl">
          {/* Dynamic Profile Status Banner */}
          <StatusInfo statusInfo={statusInfo} employerProfile={employerProfile} />

          <Details employerProfile={employerProfile} />

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Tab Navigation - Always visible */}
            <div className="z-10 bg-gray-50">
              <TabsList className="grid w-full h-auto grid-cols-5 bg-white border rounded-lg p-2 shadow-sm">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700 data-[state=active]:border-pink-200 data-[state=active]:shadow-sm transition-all duration-200 rounded-md border border-transparent px-2 py-2 mx-1 h-10 flex items-center justify-center text-sm"
                >
                  <span className="font-medium">Overview</span>
                  {!employerProfile.about && !employerProfile.description && (
                    <span className="ml-1 text-xs text-gray-500">+</span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="testimonials"
                  className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700 data-[state=active]:border-pink-200 data-[state=active]:shadow-sm transition-all duration-200 rounded-md border border-transparent px-2 py-2 mx-1 h-10 flex items-center justify-center text-sm"
                >
                  <span className="font-medium">Testimonials</span>
                  {!employerProfile.testimonials?.length && (
                    <span className="ml-1 text-xs text-gray-500">+</span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="recognition"
                  className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700 data-[state=active]:border-pink-200 data-[state=active]:shadow-sm transition-all duration-200 rounded-md border border-transparent px-2 py-2 mx-1 h-10 flex items-center justify-center text-sm"
                >
                  <span className="font-medium">Recognition</span>
                  {!employerProfile.awards?.length && (
                    <span className="ml-1 text-xs text-gray-500">+</span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="programmes"
                  className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700 data-[state=active]:border-pink-200 data-[state=active]:shadow-sm transition-all duration-200 rounded-md border border-transparent px-2 py-2 mx-1 h-10 flex items-center justify-center text-sm"
                >
                  <span className="font-medium">Initiatives</span>
                  {!employerProfile.programmes?.length && (
                    <span className="ml-1 text-xs text-gray-500">+</span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="gallery"
                  className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700 data-[state=active]:border-pink-200 data-[state=active]:shadow-sm transition-all duration-200 rounded-md border border-transparent px-2 py-2 mx-1 h-10 flex items-center justify-center text-sm"
                >
                  <span className="font-medium">Gallery</span>
                  {!employerProfile.gallery?.length ? (
                    <span className="ml-1 text-xs text-gray-500">+</span>
                  ) : (
                    <span className="ml-1 text-xs text-green-600">✓</span>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab - Main Profile Content */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Left Column - Main Content */}
                  <div className="lg:col-span-2 space-y-6">

                    {/* Company Description */}
                    <Description employerProfile={employerProfile} editedValues={editedValues} setEditedValues={setEditedValues} setPendingApproval={setPendingApproval} setShowApprovalNotification={setShowApprovalNotification} />

                    {/* Mission Statement */}
                    <Mission employerProfile={employerProfile} editingSection={editingSection} setEditingSection={setEditingSection} editedValues={editedValues} setEditedValues={setEditedValues} setPendingApproval={setPendingApproval} setShowApprovalNotification={setShowApprovalNotification} />

                    {/* Our Culture - Moved below Mission */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle style={{ fontFamily: "Sora" }}>
                          Our Culture
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingSection("culture");
                            setEditedValues({
                              culture: employerProfile?.workEnvironment || "",
                            });
                          }}
                          className="hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="ml-1 text-sm">Edit</span>
                        </Button>
                      </CardHeader>
                      <CardContent>
                        {editingSection === "culture" ? (
                          <div className="space-y-4">
                            <textarea
                              value={editedValues.culture || ""}
                              onChange={(e) =>
                                setEditedValues({
                                  ...editedValues,
                                  culture: e.target.value,
                                })
                              }
                              className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              rows={4}
                              placeholder="Describe your company culture..."
                              style={{ fontFamily: "Poppins" }}
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={() => {
                                  setPendingApproval(true);
                                  setEditingSection(null);
                                  setShowApprovalNotification(true);
                                  setTimeout(
                                    () => setShowApprovalNotification(false),
                                    5000
                                  );
                                }}
                                className="bg-pink-600 hover:bg-pink-700 text-white"
                                style={{ fontFamily: "Sora" }}
                              >
                                Submit for Approval
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setEditingSection(null)}
                                style={{ fontFamily: "Sora" }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p
                              className="text-gray-700 leading-relaxed"
                              style={{ fontFamily: "Poppins" }}
                            >
                              {employerProfile.workEnvironment ||
                                "We foster a collaborative, creative environment where every team member can thrive and grow their skills."}
                            </p>
                            {statusInfo?.type === "live" && (
                              <p
                                className="text-xs text-gray-500 mt-2 italic"
                                style={{ fontFamily: "Poppins" }}
                              >
                                Changes will require approval before going
                                live
                              </p>
                            )}
                          </>
                        )}
                      </CardContent>
                    </Card>

                    {/* Diversity & Inclusion */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle style={{ fontFamily: "Sora" }}>
                          Diversity & Inclusion
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingSection("diversity");
                            setEditedValues({
                              diversity: employerProfile?.description || "",
                            });
                          }}
                          className="hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="ml-1 text-sm">Edit</span>
                        </Button>
                      </CardHeader>
                      <CardContent>
                        {editingSection === "diversity" ? (
                          <div className="space-y-4">
                            <textarea
                              value={
                                editedValues.diversity ||
                                "We're committed to building a diverse team that reflects the communities we serve. We actively encourage applications from underrepresented groups and provide equal opportunities for career growth."
                              }
                              onChange={(e) =>
                                setEditedValues({
                                  ...editedValues,
                                  diversity: e.target.value,
                                })
                              }
                              className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              rows={4}
                              placeholder="Describe your diversity & inclusion commitment..."
                              style={{ fontFamily: "Poppins" }}
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={() => {
                                  setPendingApproval(true);
                                  setEditingSection(null);
                                  setShowApprovalNotification(true);
                                  setTimeout(
                                    () => setShowApprovalNotification(false),
                                    5000
                                  );
                                }}
                                className="bg-pink-600 hover:bg-pink-700 text-white"
                                style={{ fontFamily: "Sora" }}
                              >
                                Submit for Approval
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setEditingSection(null)}
                                style={{ fontFamily: "Sora" }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p
                              className="text-gray-700 leading-relaxed"
                              style={{ fontFamily: "Poppins" }}
                            >
                              We're committed to building a diverse team that
                              reflects the communities we serve. We actively
                              encourage applications from underrepresented
                              groups and provide equal opportunities for
                              career growth.
                            </p>
                            {statusInfo?.type === "live" && (
                              <p
                                className="text-xs text-gray-500 mt-2 italic"
                                style={{ fontFamily: "Poppins" }}
                              >
                                Changes will require approval before going
                                live
                              </p>
                            )}
                          </>
                        )}
                      </CardContent>
                    </Card>

                    {/* Company Values */}
                    {employerProfile.values &&
                      employerProfile.values.length > 0 && (
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle style={{ fontFamily: "Sora" }}>
                              Our Values
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingSection("values");
                                setEditedValues({
                                  values:
                                    employerProfile?.values?.join(", ") || "",
                                });
                              }}
                              className="hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                              <span className="ml-1 text-sm">Edit</span>
                            </Button>
                          </CardHeader>
                          <CardContent>
                            {editingSection === "values" ? (
                              <div className="space-y-4">
                                <input
                                  type="text"
                                  value={editedValues.values || ""}
                                  onChange={(e) =>
                                    setEditedValues({
                                      ...editedValues,
                                      values: e.target.value,
                                    })
                                  }
                                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                  placeholder="Enter values separated by commas (e.g. Innovation, Collaboration, Excellence)"
                                  style={{ fontFamily: "Poppins" }}
                                />
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => {
                                      setPendingApproval(true);
                                      setEditingSection(null);
                                      setShowApprovalNotification(true);
                                      setTimeout(
                                        () =>
                                          setShowApprovalNotification(false),
                                        5000
                                      );
                                    }}
                                    className="bg-pink-600 hover:bg-pink-700 text-white"
                                    style={{ fontFamily: "Sora" }}
                                  >
                                    Submit for Approval
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => setEditingSection(null)}
                                    style={{ fontFamily: "Sora" }}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex flex-wrap gap-2">
                                  {employerProfile.values.map((value) => (
                                    <Badge
                                      key={value}
                                      variant="secondary"
                                      className="bg-yellow-100 text-yellow-800"
                                    >
                                      {value}
                                    </Badge>
                                  ))}
                                </div>
                                {statusInfo?.type === "live" && (
                                  <p
                                    className="text-xs text-gray-500 mt-2 italic"
                                    style={{ fontFamily: "Poppins" }}
                                  >
                                    Changes will require approval before going
                                    live
                                  </p>
                                )}
                              </>
                            )}
                          </CardContent>
                        </Card>
                      )}

                    {/* Benefits & Perks */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle style={{ fontFamily: "Sora" }}>
                          What We Offer
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingSection("benefits");
                            setEditedValues({
                              benefits:
                                employerProfile?.benefits?.join("\n") ||
                                "Comprehensive health insurance\nFlexible working arrangements\nProfessional development budget (£2,000 annually)\n25 days annual leave plus bank holidays\nPension scheme with company contribution\nWellness programme including mental health support\nHome office setup allowance\nSeason ticket loan",
                              perks:
                                employerProfile?.perks?.join("\n") ||
                                "Wellness programme including mental health support\nHome office setup allowance\nSeason ticket loan\nFree snacks and drinks",
                            });
                          }}
                          className="hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="ml-1 text-sm">Edit</span>
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {editingSection === "benefits" ? (
                          <div className="space-y-4">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Benefits
                                </label>
                                <textarea
                                  value={
                                    editedValues.benefits ||
                                    "Comprehensive health insurance\nFlexible working arrangements\nProfessional development budget (£2,000 annually)\n25 days annual leave plus bank holidays"
                                  }
                                  onChange={(e) =>
                                    setEditedValues({
                                      ...editedValues,
                                      benefits: e.target.value,
                                    })
                                  }
                                  className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                  rows={4}
                                  placeholder="List your benefits, one per line..."
                                  style={{ fontFamily: "Poppins" }}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Perks
                                </label>
                                <textarea
                                  value={
                                    editedValues.perks ||
                                    "Wellness programme including mental health support\nHome office setup allowance\nSeason ticket loan\nFree snacks and drinks"
                                  }
                                  onChange={(e) =>
                                    setEditedValues({
                                      ...editedValues,
                                      perks: e.target.value,
                                    })
                                  }
                                  className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                  rows={4}
                                  placeholder="List your perks, one per line..."
                                  style={{ fontFamily: "Poppins" }}
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => {
                                  setPendingApproval(true);
                                  setEditingSection(null);
                                  setShowApprovalNotification(true);
                                  setTimeout(
                                    () => setShowApprovalNotification(false),
                                    5000
                                  );
                                }}
                                className="bg-pink-600 hover:bg-pink-700 text-white"
                                style={{ fontFamily: "Sora" }}
                              >
                                Submit for Approval
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setEditingSection(null)}
                                style={{ fontFamily: "Sora" }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>


      </div >
    </>
  );
}
