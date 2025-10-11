"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/app/components/ui/badge";
import {
  GraduationCap,
  MapPin,
  Users,
  Calendar,
  Star,
  ExternalLink,
  Heart,
  Award,
  Globe,
  MessageSquare,
} from "lucide-react";
import { Progress } from "@/app/components/ui/progress";
import { useState } from "react";
import {
  CardHeader,
  CardTitle,
  Card,
  CardContent,
} from "@/app/components/ui/card";

export default function CompanyReviewPage() {
  const [demoSavedState, setDemoSavedState] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [candidateExperienceDialogOpen, setCandidateExperienceDialogOpen] =
    useState(false);

  const company = {
    id: "mock-company-1",
    name: "Mock Company Ltd",
    logo: "🏢",
    tagline: "Innovation meets excellence",
    description:
      "A dynamic technology company focused on creating innovative solutions that transform businesses. We specialize in cutting-edge software development and digital transformation services.",
    industry: "Technology",
    industries: ["Technology", "Software Development", "Digital Services"],
    size: "100-500 employees",
    location: "London, UK",
    website: "https://mockcompany.com",
    founded: "2015",
    workOptionsStatement: "Hybrid - Flexible remote and office working",
    glassdoorUrl:
      "https://www.glassdoor.com/Overview/Working-at-Mock-Company-EI_IE123456.htm",
    candidateExperience: {
      feedbackQuality: 4.5,
      communicationSpeed: 4.3,
      interviewExperience: 4.6,
      processTransparency: 4.4,
      overallExperience: 4.5,
    },
    values: [
      "Innovation Excellence",
      "Collaborative Growth",
      "Customer First",
      "Continuous Learning",
      "Inclusive Culture",
    ],
    mission:
      "To empower businesses through innovative technology solutions while fostering a culture of continuous learning and growth for our talented team members.",
    vision:
      "To be the leading technology partner that transforms how businesses operate in the digital age, setting new standards for innovation and employee development.",
    benefits: [
      "25 days holiday + bank holidays",
      "Flexible hybrid working",
      "£3,000 learning & development budget",
      "Private healthcare & dental",
      "Stock options programme",
      "Latest tech equipment",
      "Mental health support",
      "Professional conference attendance",
    ],
    accolades: [
      "Tech Innovation Award 2024",
      "Best Places to Work - Technology",
      "Top 100 Companies to Watch",
      "Excellence in Employee Development",
      "ISO 27001 Certified",
      "London Tech Awards - Rising Star",
    ],
    companyRecognitions: [
      "Tech Innovation Award 2024",
      "Best Places to Work - Technology",
      "Top 100 Companies to Watch",
      "Excellence in Employee Development",
      "ISO 27001 Certified",
      "London Tech Awards - Rising Star",
    ],
    workEnvironmentDetails:
      "Our culture thrives on innovation, collaboration, and mutual respect. We create an environment where creativity flourishes, diverse perspectives are valued, and continuous learning is encouraged. Team members enjoy autonomy in their work while being supported by mentors and peers.",
    entryLevelProgrammes: [
      {
        title: "Graduate Development Programme",
        description:
          "12-month comprehensive programme combining technical training, mentorship, and real project experience across multiple departments.",
      },
      {
        title: "Tech Apprenticeship Scheme",
        description:
          "18-month hands-on learning programme focusing on software development skills with dedicated mentoring and formal qualifications.",
      },
      {
        title: "Leadership Fast Track",
        description:
          "6-month intensive programme for high-potential graduates, combining leadership training with strategic project involvement.",
      },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop&crop=center",
    companyPhotos: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop&crop=center",
    ],
    workEnvironment: {
      remote: true,
      hybrid: true,
      inOffice: true,
      flexible: true,
    },
    diversity: {
      score: 88,
      initiatives: [
        "Inclusive hiring practices",
        "Diversity & inclusion programmes",
        "Pay equity audits",
        "Mentorship for underrepresented groups",
      ],
    },
    programmes: [
      "Graduate Mentorship Programme",
      "Technical Skills Accelerator",
      "Leadership Development Track",
      "Cross-Functional Innovation Projects",
    ],
    initiatives: [
      "Graduate Mentorship Programme",
      "Technical Skills Accelerator",
      "Leadership Development Track",
      "Cross-Functional Innovation Projects",
    ],
    diversityCommitment:
      "At Mock Company, we believe diversity drives innovation. We're committed to building an inclusive workplace where everyone can thrive, regardless of background. Our initiatives include transparent hiring processes, unconscious bias training, flexible working arrangements, and dedicated support networks for underrepresented groups.",
    careers: {
      growthOpportunities: [
        "Clear career progression pathways",
        "Leadership development programmes",
        "Cross-departmental project opportunities",
        "Conference speaking and networking opportunities",
      ],
      learningProgrammes: [
        "Annual £3,000 learning budget",
        "Internal tech talks and workshops",
        "Comprehensive mentorship programme",
        "External training and certification courses",
      ],
      mentorship: true,
    },
    pollenInsights: {
      companyStatement:
        "At Mock Company, we don't just hire talent - we develop it. Every team member gets a dedicated mentor, clear development goals, and meaningful project ownership from day one. We've built our culture around continuous learning, innovation, and supporting each other's growth. What sets us apart? We genuinely invest in people's futures.",
      pollenObservations: [
        "Provides comprehensive feedback to all candidates within 48 hours of interviews",
        "Has structured mentorship programmes specifically for entry-level hires",
        "Interview process emphasizes potential and learning agility over just experience",
        "Strong commitment to professional development with generous learning budgets",
        "Transparent about career progression and maintains internal promotion rates above 70%",
      ],
      totalJobsPosted: 35,
      monthsOnPlatform: 12,
      avgTimeToHire: 14,
      badges: [
        {
          name: "Star Employer",
          description: "Consistently high candidate satisfaction ratings",
          colour: "gold",
        },
        {
          name: "Quick Responder",
          description: "Responds to applications within 48 hours",
          colour: "green",
        },
        {
          name: "Active Hirer",
          description: "Posted 30+ entry-level positions this year",
          colour: "blue",
        },
      ],
    },
    candidateTestimonials: [
      {
        name: "Alex Thompson",
        role: "Applied for Software Developer",
        quote:
          "The interview process was thorough but fair. They provided detailed technical feedback and were transparent about expectations. Even though I didn't get this role, their feedback helped me secure a position elsewhere.",
        experienceType: "feedback",
        timeframe: "3 weeks ago",
      },
      {
        name: "Priya Patel",
        role: "Applied for Marketing Coordinator",
        quote:
          "Exceptional communication throughout the process. They kept me updated at every stage and the timeline was exactly as promised. The interview felt more like a genuine conversation about mutual fit.",
        experienceType: "process",
        timeframe: "1 month ago",
      },
      {
        name: "James Wilson",
        role: "Applied for Data Analyst",
        quote:
          "Really impressed by how they structured the interview. It wasn't just about technical skills but also about how I approach problems and learn new things. Made me feel valued even as a recent graduate.",
        experienceType: "interview",
        timeframe: "2 months ago",
      },
    ],
    openRoles: [
      {
        id: "mock-job-001",
        title: "Junior Software Developer",
        department: "Engineering",
        location: "London (Hybrid)",
        type: "Full-time",
        matchScore: 95,
      },
      {
        id: "mock-job-002",
        title: "Marketing Assistant",
        department: "Marketing",
        location: "London (Hybrid)",
        type: "Full-time",
        matchScore: 88,
      },
      {
        id: "mock-job-003",
        title: "Data Analyst",
        department: "Analytics",
        location: "London (Remote)",
        type: "Full-time",
        matchScore: 82,
      },
      {
        id: "mock-job-004",
        title: "Customer Success Associate",
        department: "Customer Success",
        location: "London (Hybrid)",
        type: "Full-time",
        matchScore: 76,
      },
    ],
  };
  const router = useRouter();
  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={() => router.back()}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Companies
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Header - Simplified Layout */}
        <div className="mb-8 space-y-6">
          {/* Main Company Info */}
          <Card className="p-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="mb-4">
                    <h1
                      className="text-3xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "Sora" }}
                    >
                      {company.name}
                    </h1>
                  </div>

                  {/* Industry Tags */}
                  {company.industries && company.industries.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {company.industries.map((industry, index) => {
                        const getIndustryStyle = (industry) => {
                          const styles = {
                            "Marketing & Advertising":
                              "bg-purple-100 text-purple-800 border-purple-200",
                            "Creative Services":
                              "bg-pink-100 text-pink-800 border-pink-200",
                            "Digital Media":
                              "bg-blue-100 text-blue-800 border-blue-200",
                            "Technology & Software":
                              "bg-green-100 text-green-800 border-green-200",
                            "Finance & Banking":
                              "bg-indigo-100 text-indigo-800 border-indigo-200",
                            Healthcare:
                              "bg-red-100 text-red-800 border-red-200",
                            Education:
                              "bg-yellow-100 text-yellow-800 border-yellow-200",
                            "Retail & E-commerce":
                              "bg-orange-100 text-orange-800 border-orange-200",
                            Manufacturing:
                              "bg-gray-100 text-gray-800 border-gray-200",
                            Consulting:
                              "bg-teal-100 text-teal-800 border-teal-200",
                            "Media & Entertainment":
                              "bg-violet-100 text-violet-800 border-violet-200",
                            "Non-Profit":
                              "bg-emerald-100 text-emerald-800 border-emerald-200",
                          };
                          return (
                            styles[industry] ||
                            "bg-blue-100 text-blue-800 border-blue-200"
                          );
                        };

                        return (
                          <Badge
                            key={index}
                            variant="outline"
                            className={`${getIndustryStyle(industry)} font-medium px-3 py-1 text-xs border hover:shadow-sm transition-all`}
                          >
                            {industry}
                          </Badge>
                        );
                      })}
                    </div>
                  )}

                  {/* Company Details */}
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {company.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {company.size}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Founded {company.founded}
                    </span>
                  </div>

                  {/* Rating */}
                  <div>
                    <div
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                      onClick={() => setCandidateExperienceDialogOpen(true)}
                    >
                      {renderStarRating(
                        company.candidateExperience.overallExperience,
                      )}
                      <span className="text-sm text-gray-500">
                        Candidate Experience (
                        {company.candidateExperience.overallExperience})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Website
              </Button>
              <Button variant="outline" onClick={() => setActiveTab("jobs")}>
                View All Jobs ({company.openRoles.length})
              </Button>
              <Button
                variant={demoSavedState !== null ? "default" : "outline"}
                // onClick={handleSaveToggle}
                // disabled={
                //   saveCompanyMutation.isPending ||
                //   removeSavedCompanyMutation.isPending
                // }
                className={
                  demoSavedState !== null
                    ? "bg-pink-600 hover:bg-pink-700 text-white"
                    : ""
                }
                title={
                  demoSavedState !== null
                    ? "You'll receive alerts when this company posts new roles"
                    : "Save this company to receive job alerts"
                }
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${demoSavedState !== null ? "fill-current" : ""}`}
                />
                {demoSavedState !== null ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>

        {/* Simplified Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: "overview", label: "Overview" },
              { id: "reviews", label: "Reviews" },
              { id: "jobs", label: "Open Roles" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 text-base font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-pink-600 shadow-sm border-2 border-pink-200 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                style={{ fontFamily: "Sora" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab - Consolidated */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* About the Company */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="mb-2" style={{ fontFamily: "Sora" }}>
                    About the Company
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-gray-600 leading-relaxed"
                    style={{ fontFamily: "Poppins" }}
                  >
                    {company.description}
                  </p>
                </CardContent>
              </Card>

              {/* Work Environment */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="mb-4" style={{ fontFamily: "Sora" }}>
                    Work Environment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-gray-600 leading-relaxed"
                    style={{ fontFamily: "Poppins" }}
                  >
                    {company.workEnvironmentDetails}
                  </p>
                </CardContent>
              </Card>

              {/* Pollen loves... */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle
                    className="flex items-center gap-2 mb-4"
                    style={{ fontFamily: "Sora" }}
                  >
                    <Heart className="w-5 h-5 text-pink-600" />
                    Pollen loves...
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {company.pollenInsights.pollenObservations.map(
                      (observation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-pink-600 mt-2 flex-shrink-0" />
                          <span
                            className="text-gray-600"
                            style={{ fontFamily: "Poppins" }}
                          >
                            {observation}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Entry-level Support */}
              {company.entryLevelProgrammes &&
                company.entryLevelProgrammes.length > 0 && (
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle
                        className="flex items-center gap-2 mb-4"
                        style={{ fontFamily: "Sora" }}
                      >
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                        Entry-level Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className="text-gray-600"
                        style={{ fontFamily: "Poppins" }}
                      >
                        Comprehensive mentoring programme, structured learning
                        paths, and dedicated career development sessions with
                        senior team members.
                      </p>
                    </CardContent>
                  </Card>
                )}

              {/* Accolades & Accreditations */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle
                    className="flex items-center gap-2 mb-4"
                    style={{ fontFamily: "Sora" }}
                  >
                    <Award className="w-5 h-5 text-yellow-500" />
                    Accolades & Accreditations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {company.accolades.map((accolade, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        <span
                          className="text-gray-700"
                          style={{ fontFamily: "Poppins" }}
                        >
                          {accolade}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle
                    className="flex items-center gap-2 mb-4"
                    style={{ fontFamily: "Sora" }}
                  >
                    <Globe className="w-5 h-5 text-blue-600" />
                    Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm font-medium text-gray-700"
                        style={{ fontFamily: "Sora" }}
                      >
                        LinkedIn:
                      </span>
                      <a
                        href="https://linkedin.com/company/techflow-solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        linkedin.com/company/techflow-solutions
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm font-medium text-gray-700"
                        style={{ fontFamily: "Sora" }}
                      >
                        Twitter:
                      </span>
                      <a
                        href="https://twitter.com/TechFlowHQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        twitter.com/TechFlowHQ
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm font-medium text-gray-700"
                        style={{ fontFamily: "Sora" }}
                      >
                        Glassdoor:
                      </span>
                      <a
                        href={company.glassdoorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        glassdoor.com/Overview/Working-at-TechFlow-Solutions
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Candidate Experience Scores */}
              <Card className="p-6">
                <CardHeader className="mb-4">
                  <CardTitle
                    className="flex items-center gap-2 mb-2"
                    style={{ fontFamily: "Sora" }}
                  >
                    <Star className="w-5 h-5 text-yellow-500" />
                    Candidate Experience Scores
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Based on feedback from recent applicants
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div
                      className="space-y-4 cursor-pointer hover:bg-gray-50 rounded-lg p-4 transition-colors border"
                      onClick={() => setCandidateExperienceDialogOpen(true)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Feedback Quality
                        </span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={
                              company.candidateExperience.feedbackQuality * 20
                            }
                            className="w-24"
                          />
                          <span className="text-sm font-bold">
                            {company.candidateExperience.feedbackQuality}/5
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Communication Speed
                        </span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={
                              company.candidateExperience.communicationSpeed *
                              20
                            }
                            className="w-24"
                          />
                          <span className="text-sm font-bold">
                            {company.candidateExperience.communicationSpeed}/5
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Interview Experience
                        </span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={
                              company.candidateExperience.interviewExperience *
                              20
                            }
                            className="w-24"
                          />
                          <span className="text-sm font-bold">
                            {company.candidateExperience.interviewExperience}/5
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Process Transparency
                        </span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={
                              company.candidateExperience.processTransparency *
                              20
                            }
                            className="w-24"
                          />
                          <span className="text-sm font-bold">
                            {company.candidateExperience.processTransparency}/5
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-center mt-3">
                        Click to see detailed feedback breakdown
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center p-6 border rounded-lg bg-gray-50">
                        <div className="text-4xl font-bold text-pink-600 mb-2">
                          {company.candidateExperience.overallExperience}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Overall Experience
                        </div>
                        {renderStarRating(
                          company.candidateExperience.overallExperience,
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {company.pollenInsights.totalJobsPosted}
                          </div>
                          <div className="text-xs text-gray-600">
                            Jobs Posted
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {company.pollenInsights.monthsOnPlatform}
                          </div>
                          <div className="text-xs text-gray-600">
                            Months Active
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {company.pollenInsights.avgTimeToHire}
                          </div>
                          <div className="text-xs text-gray-600">
                            Avg Days to Hire
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Candidate Reviews */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle
                    className="flex items-center gap-2 mb-2"
                    style={{ fontFamily: "Sora" }}
                  >
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Candidate Reviews
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    What candidates say about their experience
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 my-4">
                    {company.candidateTestimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg bg-gray-50"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4
                              className="font-semibold text-gray-900"
                              style={{ fontFamily: "Sora" }}
                            >
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {testimonial.role}
                            </p>
                          </div>
                          <div className="text-xs text-gray-500">
                            {testimonial.timeframe}
                          </div>
                        </div>
                        <p
                          className="text-gray-700 leading-relaxed"
                          style={{ fontFamily: "Poppins" }}
                        >
                          "{testimonial.quote}"
                        </p>
                        <div className="mt-3">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              testimonial.experienceType === "feedback"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : testimonial.experienceType === "process"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-purple-50 text-purple-700 border-purple-200"
                            }`}
                          >
                            {testimonial.experienceType === "feedback"
                              ? "Feedback Experience"
                              : testimonial.experienceType === "process"
                                ? "Process Experience"
                                : "Interview Experience"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="space-y-6">
              {/* Recommended Jobs */}
              <Card className="p-6">
                <CardHeader className="mb-4">
                  <CardTitle className="mb-4" style={{ fontFamily: "Sora" }}>
                    Recommended for You
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Based on your profile and preferences
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {company.openRoles
                      .filter((role) => role.matchScore && role.matchScore > 80)
                      .map((role) => (
                        <div
                          key={role.id}
                          className="p-4 border-2 border-pink-200 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4
                                  className="font-semibold text-gray-900"
                                  style={{ fontFamily: "Sora" }}
                                >
                                  {role.title}
                                </h4>
                                <Badge className="bg-pink-600 text-white">
                                  Recommended
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {role.department} • {role.location}
                              </p>
                              <Badge variant="secondary" className="mt-2">
                                {role.type}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              className="bg-pink-600 hover:bg-pink-700 text-white"
                              onClick={() =>
                                (window.location.href = `/jobs/${role.id}/apply`)
                              }
                            >
                              View and Apply
                            </Button>
                          </div>
                        </div>
                      ))}

                    {/* Example of Already Applied Job */}
                    <div className="p-4 border-2 border-gray-200 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4
                              className="font-semibold text-gray-500"
                              style={{ fontFamily: "Sora" }}
                            >
                              Social Media Assistant
                            </h4>
                            <Badge className="bg-gray-500 text-white">
                              Applied
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            Marketing • London
                          </p>
                          <Badge
                            variant="secondary"
                            className="mt-2 bg-gray-100 text-gray-600"
                          >
                            Full-time
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            (window.location.href = "/applications")
                          }
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        >
                          View Application
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Other Open Roles */}
              <Card className="p-6">
                <CardHeader className="mb-4">
                  <CardTitle className="mb-4" style={{ fontFamily: "Sora" }}>
                    Other Open Roles
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Additional opportunities at {company.name}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {company.openRoles
                      .filter(
                        (role) => !role.matchScore || role.matchScore <= 80,
                      )
                      .map((role) => (
                        <div
                          key={role.id}
                          className="p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4
                                className="font-semibold text-gray-900"
                                style={{ fontFamily: "Sora" }}
                              >
                                {role.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {role.department} • {role.location}
                              </p>
                              <Badge variant="secondary" className="mt-2">
                                {role.type}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                (window.location.href = `/jobs/${role.id}/apply`)
                              }
                            >
                              View and Apply
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
