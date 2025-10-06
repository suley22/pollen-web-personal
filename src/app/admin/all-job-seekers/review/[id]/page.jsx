"use client";

import { Button } from "@/components/ui/buttons/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function AdminAllJobSeekersReviewPage() {
  const router = useRouter();

  const // Mock candidate data for testing
    candidate = {
      id: "mock-123",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      location: "London, UK",
      phone: "+44 7700 900123",
      profilePicture:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      currentStatus: "active_candidate",
      subStatus: "in_progress",
      applicationCount: 3,
      lastPollenInteraction: "2025-01-15T14:30:00Z",
      lastPollenTeamMember: "Karen Whitelaw",
      jobTitle: "Marketing Assistant",
      company: "Creative Solutions Ltd",
    };

  const hasPollenInsights =
    candidate.lastPollenInteraction && candidate.lastPollenTeamMember;

  const getApplicationHistory = () => {
    switch (candidate.id) {
      case "1":
        return [
          {
            id: "1",
            jobTitle: "Marketing Assistant",
            company: "TechCorp Solutions",
            applicationDate: "15 Jan 25",
            stageReached: "Assessment Review",
            outcome: "In Progress",
            statusColor: "yellow",
            hasAssessment: true,
          },
        ];
      case "2":
        return [
          {
            id: "1",
            jobTitle: "Social Media Marketing Assistant",
            company: "K7 Media Group",
            applicationDate: "10 Nov 24",
            stageReached: "Matched to Employer",
            outcome: "In Progress",
            statusColor: "green", // In progress with employer
            hasAssessment: true,
          },
          {
            id: "2",
            jobTitle: "Content Creator",
            company: "Digital Dreams Agency",
            applicationDate: "05 Nov 24",
            stageReached: "Pollen Interview Complete",
            outcome: "In Progress",
            statusColor: "yellow", // In progress with Pollen
            hasAssessment: true,
          },
          {
            id: "3",
            jobTitle: "Marketing Coordinator",
            company: "Innovation Hub",
            applicationDate: "28 Oct 24",
            stageReached: "Assessment Review",
            outcome: "Not Selected",
            statusColor: "grey",
            hasAssessment: true,
          },
          {
            id: "4",
            jobTitle: "Brand Marketing Assistant",
            company: "Creative Solutions",
            applicationDate: "20 Oct 24",
            stageReached: "Assessment Review",
            outcome: "Not Selected",
            statusColor: "grey",
            hasAssessment: true,
          },
        ];
      case "3":
        return [
          {
            id: "1",
            jobTitle: "Marketing Assistant",
            company: "K7 Media Group",
            applicationDate: "15 Dec 24",
            stageReached: "Assessment Review",
            outcome: "In Progress",
            statusColor: "yellow",
            hasAssessment: true,
          },
          {
            id: "2",
            jobTitle: "Social Media Coordinator",
            company: "Digital Marketing Pro",
            applicationDate: "10 Dec 24",
            stageReached: "Application Submitted",
            outcome: "Under Review",
            statusColor: "yellow",
            hasAssessment: true,
          },
        ];
      case "4":
        return [
          {
            id: "1",
            jobTitle: "Content Marketing Assistant",
            company: "Creative Solutions Ltd",
            applicationDate: "12 Dec 24",
            stageReached: "Assessment Review",
            outcome: "In Progress",
            statusColor: "yellow",
            hasAssessment: true,
          },
        ];
      case "5":
        return [
          {
            id: "1",
            jobTitle: "Administrative Assistant",
            company: "Creative Solutions Ltd",
            applicationDate: "18 Dec 24",
            stageReached: "Application Submitted",
            outcome: "Under Review",
            statusColor: "yellow",
            hasAssessment: false,
          },
          {
            id: "2",
            jobTitle: "Customer Service Assistant",
            company: "TechFlow Solutions",
            applicationDate: "05 Jan 25",
            stageReached: "Application Submitted",
            outcome: "Under Review",
            statusColor: "yellow",
            hasAssessment: false,
          },
        ];
      case "6":
        return [
          {
            id: "1",
            jobTitle: "Content Marketing Assistant",
            company: "Digital Marketing Pro",
            applicationDate: "08 Dec 24",
            stageReached: "Pollen Interview Scheduled",
            outcome: "In Progress",
            statusColor: "yellow",
            hasAssessment: true,
          },
          {
            id: "2",
            jobTitle: "Social Media Coordinator",
            company: "Innovation Hub",
            applicationDate: "15 Nov 24",
            stageReached: "Assessment Review",
            outcome: "Not Selected",
            statusColor: "grey",
            hasAssessment: true,
          },
          {
            id: "3",
            jobTitle: "Marketing Assistant",
            company: "K7 Media Group",
            applicationDate: "02 Nov 24",
            stageReached: "Assessment Review",
            outcome: "Not Selected",
            statusColor: "grey",
            hasAssessment: true,
          },
        ];
      case "7":
        return [
          {
            id: "1",
            jobTitle: "Marketing Coordinator",
            company: "Innovation Hub",
            applicationDate: "10 Dec 24",
            stageReached: "Assessment Review",
            outcome: "Not Selected",
            hasAssessment: true,
          },
          {
            id: "2",
            jobTitle: "Brand Marketing Assistant",
            company: "Creative Solutions",
            applicationDate: "25 Nov 24",
            stageReached: "Pollen Interview",
            outcome: "Not Selected",
            hasAssessment: true,
          },
          {
            id: "3",
            jobTitle: "Digital Marketing Assistant",
            company: "TechFlow Solutions",
            applicationDate: "15 Nov 24",
            stageReached: "Assessment Review",
            outcome: "Not Selected",
            hasAssessment: true,
          },
          {
            id: "4",
            jobTitle: "Content Creator",
            company: "Digital Dreams Agency",
            applicationDate: "08 Nov 24",
            stageReached: "Assessment Review",
            outcome: "Not Selected",
            hasAssessment: true,
          },
          {
            id: "5",
            jobTitle: "Social Media Assistant",
            company: "K7 Media Group",
            applicationDate: "28 Oct 24",
            stageReached: "Assessment Review",
            outcome: "Not Selected",
            hasAssessment: true,
          },
        ];
      case "8":
        return [
          // Maya Patel - new candidate, no applications yet
        ];
      case "9":
        return [
          {
            id: "1",
            jobTitle: "Technical Support Assistant",
            company: "TechFlow Solutions",
            applicationDate: "20 Dec 24",
            stageReached: "Hired",
            outcome: "Hired",
            hasAssessment: true,
          },
          {
            id: "2",
            jobTitle: "Customer Service Representative",
            company: "Innovation Hub",
            applicationDate: "10 Dec 24",
            stageReached: "Assessment Review",
            outcome: "Not Selected",
            hasAssessment: true,
          },
        ];
      case "25":
        return [
          {
            id: "1",
            jobTitle: "Digital Marketing Coordinator",
            company: "K7 Media Group",
            applicationDate: "15 Sep 24",
            stageReached: "Pollen Interview",
            outcome: "Not Selected",
            statusColor: "grey",
            hasAssessment: true,
          },
          {
            id: "2",
            jobTitle: "Social Media Assistant",
            company: "K7 Media Group",
            applicationDate: "08 Oct 24",
            stageReached: "Assessment Review",
            outcome: "Not Selected",
            statusColor: "grey",
            hasAssessment: true,
          },
          {
            id: "3",
            jobTitle: "Marketing Coordinator",
            company: "K7 Media Group",
            applicationDate: "20 Nov 24",
            stageReached: "Assessment Review",
            outcome: "Not Selected",
            statusColor: "grey",
            hasAssessment: true,
          },
          {
            id: "4",
            jobTitle: "Marketing Assistant",
            company: "K7 Media Group",
            applicationDate: "11 Jan 25",
            stageReached: "Assessment Review",
            outcome: "In Progress",
            statusColor: "yellow",
            hasAssessment: true,
          },
        ];
      case "24": // Alex Thompson - 1 application
        return [
          {
            id: "1",
            jobTitle: "Business Analyst Trainee",
            company: "TechFlow Solutions",
            applicationDate: "12 Jan 25",
            stageReached: "Application Under Review",
            outcome: "In Progress",
            statusColor: "blue",
            hasAssessment: true,
          },
        ];
      case "13": // Daniel Brown - employer feedback available
        return [
          {
            id: "1",
            jobTitle: "Marketing Coordinator",
            company: "TechFlow Solutions",
            applicationDate: "05 Jan 25",
            stageReached: "Matched to Employer",
            outcome: "Not Selected",
            statusColor: "grey",
            hasAssessment: true,
          },
        ];
      default:
        return [];
    }
  };

  const applicationHistory = getApplicationHistory();

  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Get return URL from query parameters, or default to job applicants grid
              const urlParams = new URLSearchParams(window.location.search);
              const returnUrl = urlParams.get("returnUrl");
              if (returnUrl) {
                router.push(decodeURIComponent(returnUrl));
              } else {
                router.push("/admin/all-job-seekers"); // Default fallback
              }
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Candidate Header Card */}
        <Card className="p-4 mb-4">
          <CardContent>
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-2">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {candidate.profilePicture ? (
                      <img
                        src={candidate.profilePicture}
                        alt={candidate.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-500" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h1 className="text-xl font-semibold text-gray-900 mb-1">
                      {candidate.name}
                    </h1>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Mail className="h-4 w-4 mr-2" />
                      {candidate.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {candidate.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content - Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            className={`grid w-full ${hasPollenInsights ? "grid-cols-3" : "grid-cols-2"}`}
          >
            <TabsTrigger value="timeline">
              Application History & Timeline
            </TabsTrigger>
            <TabsTrigger value="profile">Complete Profile</TabsTrigger>

            {hasPollenInsights && (
              <TabsTrigger value="insights">Pollen Team Insights</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="timeline" className="space-y-8">
            {/* Key Statistics */}
            <Card className="p-4">
              <CardHeader>
                <CardTitle className="text-base mb-2">Key Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  <div className="text-center">
                    <div className="text-base font-semibold text-blue-600">
                      {candidate.id === "1"
                        ? "87%"
                        : candidate.id === "2"
                          ? "92%"
                          : candidate.id === "3"
                            ? "78%"
                            : candidate.id === "4"
                              ? "85%"
                              : "90%"}
                    </div>
                    <div className="text-xs text-gray-600">
                      Profile Completeness
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-base font-semibold text-green-600">
                      {applicationHistory.length}
                    </div>
                    <div className="text-xs text-gray-600">Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base font-semibold text-yellow-600">
                      {candidate.id === "1"
                        ? "1"
                        : candidate.id === "2"
                          ? "2"
                          : candidate.id === "3"
                            ? "0"
                            : candidate.id === "4"
                              ? "1"
                              : "0"}
                    </div>
                    <div className="text-xs text-gray-600">Shortlists</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base font-semibold text-purple-600">
                      {candidate.id === "1"
                        ? "1"
                        : candidate.id === "2"
                          ? "1"
                          : candidate.id === "3"
                            ? "0"
                            : candidate.id === "4"
                              ? "0"
                              : "0"}
                    </div>
                    <div className="text-xs text-gray-600">Interviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base font-semibold text-red-600">
                      {candidate.id === "1"
                        ? "0"
                        : candidate.id === "2"
                          ? "1"
                          : candidate.id === "3"
                            ? "0"
                            : candidate.id === "4"
                              ? "0"
                              : "0"}
                    </div>
                    <div className="text-xs text-gray-600">Offers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base font-semibold text-pink-600">
                      {candidate.id === "1"
                        ? "8.2"
                        : candidate.id === "2"
                          ? "7.8"
                          : candidate.id === "3"
                            ? "7.1"
                            : candidate.id === "4"
                              ? "8.5"
                              : "7.5"}
                      /10
                    </div>
                    <div className="text-xs text-gray-600">
                      Avg Skills Score
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-base font-semibold text-gray-600">
                      {candidate.id === "1"
                        ? "Sep 24"
                        : candidate.id === "2"
                          ? "Oct 24"
                          : candidate.id === "3"
                            ? "Nov 24"
                            : candidate.id === "4"
                              ? "Dec 24"
                              : "Sep 24"}
                    </div>
                    <div className="text-xs text-gray-600">Joined Date</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
