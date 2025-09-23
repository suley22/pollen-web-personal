"use client";

import { Clock, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusInfo } from "./(components)/status-info";
import { Header } from "./(components)/header";
import Details from "./(components)/details";
import Description from "./(components)/description";
import Mission from "./(components)/mission";
import Culture from "./(components)/culture";
import Diversity from "./(components)/diversity";
import Values from "./(components)/values";
import Benefits from "./(components)/benefits";
import Contact from "./(components)/contact";
import { TestimonialTab } from "./(components)/testimonial-tab";

export default function EmployerProfileConsolidated({ employerProfile }) {
  /** @type {{author:string, position:string, rating:number, date:string, feedbackQuality?:number, communicationSpeed?:number, interviewExperience?:number, processTransparency?:number} | null} */

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
          <StatusInfo
            statusInfo={statusInfo}
            employerProfile={employerProfile}
          />

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
                    <Description
                      employerProfile={employerProfile}
                      editedValues={editedValues}
                      setEditedValues={setEditedValues}
                      setPendingApproval={setPendingApproval}
                      setShowApprovalNotification={setShowApprovalNotification}
                    />

                    {/* Mission Statement */}
                    <Mission
                      employerProfile={employerProfile}
                      editingSection={editingSection}
                      setEditingSection={setEditingSection}
                      editedValues={editedValues}
                      setEditedValues={setEditedValues}
                      setPendingApproval={setPendingApproval}
                      setShowApprovalNotification={setShowApprovalNotification}
                    />

                    {/* Our Culture - Moved below Mission */}
                    <Culture
                      employerProfile={employerProfile}
                      editingSection={editingSection}
                      setEditingSection={setEditingSection}
                      editedValues={editedValues}
                      setEditedValues={setEditedValues}
                      setPendingApproval={setPendingApproval}
                      setShowApprovalNotification={setShowApprovalNotification}
                    />

                    {/* Diversity & Inclusion */}
                    <Diversity
                      employerProfile={employerProfile}
                      editingSection={editingSection}
                      setEditingSection={setEditingSection}
                      editedValues={editedValues}
                      setEditedValues={setEditedValues}
                      setPendingApproval={setPendingApproval}
                      setShowApprovalNotification={setShowApprovalNotification}
                    />

                    {/* Company Values */}
                    {employerProfile.values &&
                      employerProfile.values.length > 0 && (
                        <Values
                          employerProfile={employerProfile}
                          editingSection={editingSection}
                          setEditingSection={setEditingSection}
                          editedValues={editedValues}
                          setEditedValues={setEditedValues}
                          setPendingApproval={setPendingApproval}
                          setShowApprovalNotification={
                            setShowApprovalNotification
                          }
                        />
                      )}

                    {/* Benefits & Perks */}
                    <Benefits
                      employerProfile={employerProfile}
                      editingSection={editingSection}
                      setEditingSection={setEditingSection}
                      editedValues={editedValues}
                      setEditedValues={setEditedValues}
                      setPendingApproval={setPendingApproval}
                      setShowApprovalNotification={setShowApprovalNotification}
                    />
                  </div>

                  {/* Right Column - Contact & Details */}
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <Contact employerProfile={employerProfile} />

                    {/* Working Model */}
                  </div>
                </div>
              </TabsContent>


              {/* Testimonials Tab */}
              <TabsContent value="testimonials">
                <TestimonialTab employerProfile={employerProfile} />
              </TabsContent>

              
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
}
