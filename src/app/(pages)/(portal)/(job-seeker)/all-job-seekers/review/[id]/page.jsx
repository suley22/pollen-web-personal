"use client";

import { Button } from "@/components/ui/buttons/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AdminRoutes } from "@/admin/router";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";

import {
  Brain,
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  AlertCircle,
  Briefcase,
  Star,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function AdminAllJobSeekersReviewPage() {
  const router = useRouter();

  const candidate = {
    id: "3",
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

  // Timeline data aligned with application history
  const getTimelineData = () => {
    // Base timeline for all candidates
    const baseTimeline = [
      {
        id: "1",
        type: "join",
        title: "Joined Pollen Community",
        description: "Created profile and completed initial registration",
        timestamp: "2024-09-01T10:00:00Z",
        actor: candidate.name,
        status: "in_progress",
      },
      {
        id: "2",
        type: "profile",
        title: "Profile Completed",
        description: "Completed behavioural assessment",
        timestamp: "2024-09-10T14:30:00Z",
        actor: candidate.name,
        status: "in_progress",
      },
    ];

    // Add application-specific timeline events based on candidateId
    if (candidate.id === "1") {
      baseTimeline.push({
        id: "3",
        type: "application",
        title: "Applied to Marketing Assistant",
        description:
          "Submitted application for Marketing Assistant role at TechCorp Solutions",
        timestamp: "2025-01-15T09:15:00Z",
        actor: candidate.name,
        status: "in_progress",
      });
    } else if (candidate.id === "2") {
      baseTimeline.push(
        {
          id: "3",
          type: "application",
          title: "Applied to Social Media Marketing Assistant",
          description:
            "Submitted application for Social Media Marketing Assistant role at K7 Media Group",
          timestamp: "2024-11-10T09:15:00Z",
          actor: candidate.name,
          status: "in_progress",
        },
        {
          id: "4",
          type: "application",
          title: "Applied to Content Creator",
          description:
            "Submitted application for Content Creator role at Digital Dreams Agency",
          timestamp: "2024-11-05T11:30:00Z",
          actor: candidate.name,
          status: "in_progress",
        },
        {
          id: "5",
          type: "application",
          title: "Applied to Marketing Coordinator",
          description:
            "Submitted application for Marketing Coordinator role at Innovation Hub",
          timestamp: "2024-10-28T14:15:00Z",
          actor: candidate.name,
          status: "in_progress",
        },
        {
          id: "6",
          type: "application",
          title: "Applied to Brand Marketing Assistant",
          description:
            "Submitted application for Brand Marketing Assistant role at Creative Solutions",
          timestamp: "2024-10-20T10:00:00Z",
          actor: candidate.name,
          status: "in_progress",
        },
      );
    } else if (candidate.id === "3") {
      baseTimeline.push(
        {
          id: "3",
          type: "application",
          title: "Applied to Marketing Assistant",
          description:
            "Submitted application for Marketing Assistant role at K7 Media Group",
          timestamp: "2024-12-15T09:15:00Z",
          actor: candidate.name,
          status: "in_progress",
        },
        {
          id: "4",
          type: "application",
          title: "Applied to Social Media Coordinator",
          description:
            "Submitted application for Social Media Coordinator role at Digital Marketing Pro",
          timestamp: "2024-12-10T11:30:00Z",
          actor: candidate.name,
          status: "in_progress",
        },
      );
    } else if (candidate.id === "4") {
      baseTimeline.push({
        id: "3",
        type: "application",
        title: "Applied to Content Marketing Assistant",
        description:
          "Submitted application for Content Marketing Assistant role at Creative Solutions Ltd",
        timestamp: "2024-12-12T09:15:00Z",
        actor: candidate.name,
        status: "in_progress",
      });
    }

    return baseTimeline;
  };

  const timelineData = getTimelineData();

  const applicationHistory = getApplicationHistory();
  const [ setSelectedApplication] = useState(null);
  const [ setAssessmentModalOpen] = useState(false);
  const [ setSelectedFeedback] = useState(null);
  const [ setShowFeedbackReview] = useState(false);
  const [activeTab, setActiveTab] = useState("timeline");

  const handleViewAssessment = (application) => {
    setSelectedApplication(application);
    setAssessmentModalOpen(true);
  };

  const handleViewFeedback = () => {
    // Check if this is Daniel Brown (candidate ID 13) who has employer feedback
    if (candidate.id === "13") {
      const mockFeedback = {
        overallScore: 6.5,
        culturalFitScore: 7.0,
        skillsScore: 6.0,
        communicationScore: 6.5,
        notes:
          "Strong technical foundation but communication style didn't align with our team culture. Candidate was well-prepared and showed good problem-solving skills during the technical assessment. However, responses seemed quite formal and we felt there might be challenges with our collaborative, informal work environment. Would recommend for more structured corporate environments.",
        recommendForRole: false,
        reviewStatus: "approved",
      };
      setSelectedFeedback(mockFeedback);
      setShowFeedbackReview(true);
    } else {
      alert("No employer feedback available for this application.");
    }
  };

  const getBehavioralData = () => {
    switch (candidate.id) {
      case "24": // Alex Thompson - Analytical, strategic thinker
        return {
          summary:
            "Alex demonstrates strong analytical capabilities and strategic thinking, excelling in environments that require systematic problem-solving and data-driven decision making. His natural inclination toward thorough analysis makes him particularly effective in business analysis and project management roles where attention to detail and logical reasoning are essential.",
          discData: [
            { name: "Dominance", value: 25, color: "#E2007A" },
            { name: "Influence", value: 15, color: "#ffde59" },
            { name: "Steadiness", value: 35, color: "#4ECDC4" },
            { name: "Conscientiousness", value: 45, color: "#45B7D1" },
          ],
          primaryType: "Analytical Thinker",
          keyStrengths: [
            {
              title: "Strategic Planning",
              description:
                "Develops comprehensive strategies through thorough analysis and systematic approaches to complex challenges.",
              color: "blue",
            },
            {
              title: "Process Optimization",
              description:
                "Identifies inefficiencies and implements improved procedures that enhance quality and productivity.",
              color: "green",
            },
            {
              title: "Data-Driven Analysis",
              description:
                "Uses quantitative analysis and evidence-based decision making to solve business problems effectively.",
              color: "pink",
            },
          ],
          workStyle: {
            communication:
              "Clear and methodical, focuses on facts and logical reasoning, excellent at presenting detailed analysis",
            decisionMaking:
              "Evidence-based approach, considers risks and benefits, seeks optimal solutions through systematic evaluation",
            motivators:
              "Quality outcomes, process improvement, professional development, recognition for analytical contributions",
            workPreferences:
              "Structured environments, clear expectations, analytical challenges, collaborative problem-solving",
          },
          personalInsights: {
            perfectJob:
              "Working as a business analyst in a growing technology company where I can apply my analytical skills to solve complex business challenges, optimize processes, and contribute to strategic decision-making while working with data-driven teams that value thorough analysis and continuous improvement",
            mostHappy:
              "Tackling complex problems that require systematic analysis and seeing the positive impact of process improvements on business outcomes, especially when working with collaborative teams that appreciate detailed research and evidence-based solutions",
            friendsDescribe: ["Reliable", "Thorough", "Great problem solver"],
            teachersDescribe: [
              "Analytical",
              "Detail-oriented",
              "Consistently high quality work",
            ],
            mostProudOf:
              "Leading a university group project to analyze and redesign our student society's membership system, which increased efficiency by 40% and improved member satisfaction. The project required extensive data analysis, stakeholder interviews, and process mapping - skills that directly apply to business analysis roles",
            rolesInterested: [
              "Business Analyst",
              "Junior Business Analyst",
              "Process Analyst",
            ],
            industriesInterested: [
              "Technology",
              "Financial services",
              "Consulting",
            ],
          },
        };
      default: // Emma Davis default profile
        return {
          summary:
            "Sarah brings natural collaborative energy and enthusiasm to work, thriving in team environments where communication and relationships are valued. She excels in roles that involve building connections, motivating others, and creating positive team dynamics. Her engaging communication style makes her particularly effective at facilitating collaboration and maintaining team morale.",
          discData: [
            { name: "Dominance", value: 15, color: "#dc2626" },
            { name: "Influence", value: 45, color: "#eab308" },
            { name: "Steadiness", value: 30, color: "#16a34a" },
            { name: "Conscientiousness", value: 10, color: "#2563eb" },
          ],
          primaryType: "High Influence with Supporting Steadiness",
          keyStrengths: [
            {
              title: "Relationship Builder",
              description:
                "Naturally connects with others and creates positive team dynamics through authentic engagement and empathy.",
              color: "pink",
            },
            {
              title: "Team Energiser",
              description:
                "Brings enthusiasm and motivation to group settings, helping to maintain morale and encourage collaboration.",
              color: "blue",
            },
            {
              title: "Natural Communicator",
              description:
                "Expresses ideas clearly and listens actively, creating open dialogue and ensuring everyone feels heard.",
              color: "green",
            },
          ],
          workStyle: {
            communication:
              "Enthusiastic and expressive, naturally engaging, excellent at building rapport",
            decisionMaking:
              "Considers team input and relationships, seeks collaborative solutions",
            motivators:
              "Building meaningful connections, team collaboration, recognition and appreciation, variety and new challenges",
            workPreferences:
              "People-focused and energetic, thrives in collaborative environments, adaptable to change",
          },
          personalInsights: {
            perfectJob:
              "Working in a creative environment where I can combine my photography background with marketing strategy, helping brands tell authentic visual stories while building genuine connections with diverse teams and continuously learning new skills that challenge me to grow both personally and professionally",
            mostHappy:
              "Collaborating with passionate people on meaningful projects that make a real difference, especially when I can see the direct impact of our work and feel like I'm contributing something valuable while learning from experienced mentors who challenge me to think differently",
            friendsDescribe: [
              "Ambitious",
              "Inspiring",
              "Always up for new challenges",
            ],
            teachersDescribe: [
              "Motivated",
              "Curious",
              "Consistently delivers quality work",
            ],
            mostProudOf:
              "Organising a charity photography exhibition that raised £800 for mental health awareness while managing my final university coursework - it taught me how to balance multiple priorities and showed me the power of combining creativity with purpose to create meaningful community impact",
            rolesInterested: [
              "Marketing Coordinator",
              "Junior Marketing Coordinator",
              "Senior Coordinator",
            ],
            industriesInterested: [
              "Technology",
              "Professional services",
              "Scale-ups",
            ],
          },
        };
    }
  };

  const behavioralData = getBehavioralData();

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
                router.push(AdminRoutes.allJobSeekers); // Default fallback
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
                      <Image
                        src={candidate.profilePicture}
                        alt={candidate.name}
                        width={64}
                        height={64}
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
            className={`grid w-full ${hasPollenInsights ? "grid-cols-2" : "grid-cols-2"}`}
          >
            <TabsTrigger value="timeline">
              Application History & Timeline
            </TabsTrigger>
            <TabsTrigger value="profile">Complete Profile</TabsTrigger>
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

            {/* Application History */}
            <Card className="p-4">
              <CardHeader>
                <CardTitle className="text-base mb-4">
                  Application History ({applicationHistory.length}{" "}
                  {applicationHistory.length === 1
                    ? "application"
                    : "applications"}
                  )
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
                    <div>Job Applied To</div>
                    <div>Date</div>
                    <div>Stage Reached</div>
                    <div>Outcome</div>
                    <div>Assessment</div>
                  </div>
                  {applicationHistory.map((app) => (
                    <div
                      key={app.id}
                      className="grid grid-cols-5 gap-4 text-sm text-gray-600 py-2 border-b border-gray-100"
                    >
                      <div className="font-medium">{app.jobTitle}</div>
                      <div>{app.applicationDate}</div>
                      <div>{app.stageReached}</div>
                      <div>
                        <Badge
                          className={
                            app.statusColor === "green"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : app.statusColor === "yellow"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : app.statusColor === "grey"
                                  ? "bg-gray-100 text-gray-800 border-gray-200"
                                  : app.outcome === "In Progress"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {app.outcome}
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-1 items-start">
                        {app.hasAssessment && (
                          <button
                            onClick={() => handleViewAssessment(app)}
                            className="text-pink-600 hover:text-pink-700 hover:underline font-medium text-xs"
                          >
                            View Assessment
                          </button>
                        )}
                        {app.stageReached === "Matched to Employer" &&
                          app.outcome === "Not Selected" && (
                            <button
                              onClick={() => handleViewFeedback(app)}
                              className="text-orange-600 hover:text-orange-700 hover:underline font-medium text-xs"
                            >
                              View Feedback
                            </button>
                          )}
                      </div>
                    </div>
                  ))}
                </div>

                {candidate.lastPollenInteraction && (
                  <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                    Last spoke with {candidate.lastPollenTeamMember} on{" "}
                    {new Date(
                      candidate.lastPollenInteraction,
                    ).toLocaleDateString("en-GB")}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="p-4">
              <CardHeader>
                <CardTitle className="text-base mb-4">
                  Activity Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timelineData.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {item.description}
                        </p>
                        <div className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleDateString("en-GB")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Support */}
            <Card className="p-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base mb-4">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                  Interview Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  No additional interview support requirements identified.
                  Standard interview process is suitable.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            {/* Complete Profile matching employer portal exactly */}

            {/* Behavioral Profile with DISC Chart */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-blue-600" />
                  Behavioural Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {behavioralData ? (
                  <>
                    <div>
                      <Badge className="mb-3 bg-blue-100 text-blue-800 border-blue-200 text-base px-3 py-1">
                        The Social Butterfly
                      </Badge>
                      <p className="text-sm text-gray-700 font-medium mb-2">
                        Natural communicator who builds strong relationships and
                        energises teams.
                      </p>
                      <p className="text-sm text-gray-600">
                        {behavioralData.summary}
                      </p>
                    </div>

                    {/* DISC Profile Chart */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-4">
                        DISC Profile Breakdown
                      </h4>

                      {/* Pie Chart */}
                      <div className="h-80 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={behavioralData.discData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={120}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {behavioralData.discData.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <RechartsTooltip
                              formatter={(value, name) => [`${value}%`, name]}
                              contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                fontSize: "14px",
                              }}
                            />
                            <Legend
                              verticalAlign="bottom"
                              height={36}
                              formatter={(value, entry) => (
                                <span
                                  style={{
                                    color: entry.color,
                                    fontWeight: "500",
                                  }}
                                >
                                  {value}
                                </span>
                              )}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Summary Grid Below Chart */}
                      <div className="grid grid-cols-2 gap-3">
                        {behavioralData.discData.map((item) => {
                          const colorClasses = {
                            "#dc2626": {
                              bg: "bg-red-50",
                              border: "border-red-200",
                              text: "text-red-600",
                            },
                            "#eab308": {
                              bg: "bg-yellow-50",
                              border: "border-yellow-200",
                              text: "text-yellow-600",
                            },
                            "#16a34a": {
                              bg: "bg-green-50",
                              border: "border-green-200",
                              text: "text-green-600",
                            },
                            "#2563eb": {
                              bg: "bg-blue-50",
                              border: "border-blue-200",
                              text: "text-blue-600",
                            },
                            "#E2007A": {
                              bg: "bg-pink-50",
                              border: "border-pink-200",
                              text: "text-pink-600",
                            },
                            "#ffde59": {
                              bg: "bg-yellow-50",
                              border: "border-yellow-200",
                              text: "text-yellow-600",
                            },
                            "#4ECDC4": {
                              bg: "bg-teal-50",
                              border: "border-teal-200",
                              text: "text-teal-600",
                            },
                            "#45B7D1": {
                              bg: "bg-blue-50",
                              border: "border-blue-200",
                              text: "text-blue-600",
                            },
                          };
                          const classes = colorClasses[item.color] || {
                            bg: "bg-gray-50",
                            border: "border-gray-200",
                            text: "text-gray-600",
                          };

                          const descriptions = {
                            Dominance: "Results-focused",
                            Influence: "People-focused",
                            Steadiness: "Stability-focused",
                            Conscientiousness: "Quality-focused",
                          };

                          return (
                            <div
                              key={item.name}
                              className={`p-3 rounded-lg border-2 ${classes.bg} ${classes.border}`}
                            >
                              <div className="text-center">
                                <div
                                  className={`text-base font-semibold ${classes.text}`}
                                >
                                  {item.value}%
                                </div>
                                <div className="text-sm font-medium">
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {descriptions[item.name]}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-center font-medium text-pink-600 mt-4">
                        {behavioralData.primaryType}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Assessment Incomplete
                    </h3>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      This candidate has not completed their behavioral
                      assessment. Once completed, their DISC profile and
                      behavioral insights will be available here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {behavioralData && (
              <>
                {/* Key Strengths */}
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 mb-4">
                      <Star className="h-5 w-5 text-amber-600" />
                      Key Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {behavioralData.keyStrengths.map((strength) => {
                        const borderColors = {
                          pink: "border-pink-200",
                          blue: "border-blue-200",
                          green: "border-green-200",
                          purple: "border-purple-200",
                        };

                        return (
                          <div
                            key={strength.title}
                            className={`border-l-4 ${borderColors[strength.color]} pl-4`}
                          >
                            <h4 className="font-medium text-sm text-gray-900 mb-1">
                              {strength.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {strength.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* How They Work */}
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 mb-4">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                      How They Work
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        Communication Style
                      </h4>
                      <p className="text-sm text-gray-600">
                        {behavioralData.workStyle.communication}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        Decision Making
                      </h4>
                      <p className="text-sm text-gray-600">
                        {behavioralData.workStyle.decisionMaking}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        Career Motivators
                      </h4>
                      <p className="text-sm text-gray-600">
                        {behavioralData.workStyle.motivators}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        Work Style
                      </h4>
                      <p className="text-sm text-gray-600">
                        {behavioralData.workStyle.workPreferences}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Insights */}
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 mb-4">
                      <Users className="h-5 w-5 text-pink-600" />
                      Personal Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        Perfect Job Is
                      </h4>
                      <p className="text-sm text-gray-600">
                        {behavioralData.personalInsights.perfectJob}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        Most Happy When
                      </h4>
                      <p className="text-sm text-gray-600">
                        {behavioralData.personalInsights.mostHappy}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        Described by Friends As
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {behavioralData.personalInsights.friendsDescribe.map(
                          (trait) => (
                            <Badge
                              key={trait}
                              variant="outline"
                              className="text-xs bg-blue-50 text-blue-700"
                            >
                              {trait}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        Described by Teachers As
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {behavioralData.personalInsights.teachersDescribe.map(
                          (trait) => (
                            <Badge
                              key={trait}
                              variant="outline"
                              className="text-xs bg-green-50 text-green-700"
                            >
                              {trait}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        Most Proud Of
                      </h4>
                      <p className="text-sm text-gray-600">
                        {behavioralData.personalInsights.mostProudOf}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        Interested in Roles
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {behavioralData.personalInsights.rolesInterested.map(
                          (role) => (
                            <Badge
                              key={role}
                              variant="outline"
                              className="text-xs bg-blue-50 text-blue-700"
                            >
                              {role}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        Industry Interests
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {behavioralData.personalInsights.industriesInterested.map(
                          (industry) => (
                            <Badge
                              key={industry}
                              variant="outline"
                              className="text-xs bg-amber-50 text-amber-700"
                            >
                              {industry}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        Favourite Subjects During Education
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(
                          behavioralData.personalInsights.favoriteSubjects || [
                            "Psychology",
                            "Media Studies",
                            "Creative Writing",
                            "Digital Marketing",
                          ]
                        ).map((subject) => (
                          <Badge
                            key={subject}
                            variant="outline"
                            className="text-xs bg-purple-50 text-purple-700"
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* References */}
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 mb-4">
                      <Users className="h-5 w-5 text-indigo-600" />
                      References
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              Dr. Emily Watson
                            </h4>
                            <p className="text-sm text-gray-600 mb-1">
                              Senior Marketing Lecturer
                            </p>
                            <p className="text-sm text-gray-500">
                              Contact details available upon request
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Academic Supervisor
                          </Badge>
                        </div>
                        <blockquote className="bg-gray-50 p-3 rounded-lg border-l-4 border-indigo-200">
                          <p className="text-sm text-gray-700 italic">
                            &quot;Sarah consistently demonstrated exceptional
                            creative thinking and analytical skills throughout
                            her studies. Her ability to combine creativity with
                            strategic thinking makes her an ideal candidate for
                            any marketing role.&quot;
                          </p>
                        </blockquote>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
