"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  MapPin,
  Users,
  Calendar,
  Star,
  ExternalLink,
  Heart,
  GraduationCap,
  Globe,
  Award,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { company as companiesData } from "./(mocks)/mocks";
import { CardHeader, CardTitle } from "@/components/ui/card";

export default function CompanyReviewPage() {
  const company = companiesData["techflow-solutions"];
  const [candidateExperienceDialogOpen, setCandidateExperienceDialogOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [demoSavedState, setDemoSavedState] = useState(null);

  const router = useRouter();

  // Check if company is saved

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
          <Card className={"p-6"}>
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
                // disabled={removeSavedCompanyMutation.isPending}
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
                  <CardHeader className="mb-4">
                    <CardTitle style={{ fontFamily: "Sora" }}>
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
                  <CardHeader className="mb-4">
                    <CardTitle style={{ fontFamily: "Sora" }}>
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
                  <CardHeader className="mb-4">
                    <CardTitle
                      className="flex items-center gap-2"
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
                      <CardHeader className="mb-4">
                        <CardTitle
                          className="flex items-center gap-2"
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
                  <CardHeader className="mb-4">
                    <CardTitle
                      className="flex items-center gap-2"
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
                  <CardHeader className="mb-4">
                    <CardTitle
                      className="flex items-center gap-2"
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
                      className="flex items-center gap-2 mb-1"
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
                                company.candidateExperience
                                  .interviewExperience * 20
                              }
                              className="w-24"
                            />
                            <span className="text-sm font-bold">
                              {company.candidateExperience.interviewExperience}
                              /5
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
                                company.candidateExperience
                                  .processTransparency * 20
                              }
                              className="w-24"
                            />
                            <span className="text-sm font-bold">
                              {company.candidateExperience.processTransparency}
                              /5
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
                  <CardHeader className="mb-4">
                    <CardTitle
                      className="flex items-center gap-2"
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
                    <div className="space-y-4">
                      {company.candidateTestimonials.map(
                        (testimonial, index) => (
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
                        ),
                      )}
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
                    <CardTitle style={{ fontFamily: "Sora" }}>
                      Recommended for You
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Based on your profile and preferences
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {company.openRoles
                        .filter(
                          (role) => role.matchScore && role.matchScore > 80,
                        )
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
                    <CardTitle style={{ fontFamily: "Sora" }}>
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

          {/* Candidate Experience Detail Dialog */}
          <Dialog
            open={candidateExperienceDialogOpen}
            onOpenChange={setCandidateExperienceDialogOpen}
          >
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle style={{ fontFamily: "Sora" }}>
                  Candidate Experience at {company.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4
                          className="font-semibold text-gray-900"
                          style={{ fontFamily: "Sora" }}
                        >
                          Feedback Quality
                        </h4>
                        <span className="text-lg font-bold text-pink-600">
                          {company.candidateExperience.feedbackQuality}/5
                        </span>
                      </div>
                      <Progress
                        value={company.candidateExperience.feedbackQuality * 20}
                        className="mb-2"
                      />
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Poppins" }}
                      >
                        Candidates receive detailed, constructive feedback
                        regardless of the outcome. Reviews highlight specific
                        strengths and areas for development.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4
                          className="font-semibold text-gray-900"
                          style={{ fontFamily: "Sora" }}
                        >
                          Communication Speed
                        </h4>
                        <span className="text-lg font-bold text-pink-600">
                          {company.candidateExperience.communicationSpeed}/5
                        </span>
                      </div>
                      <Progress
                        value={
                          company.candidateExperience.communicationSpeed * 20
                        }
                        className="mb-2"
                      />
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Poppins" }}
                      >
                        Average response time is 2-3 business days. Candidates
                        are kept informed at each stage of the process with
                        clear next steps.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4
                          className="font-semibold text-gray-900"
                          style={{ fontFamily: "Sora" }}
                        >
                          Interview Experience
                        </h4>
                        <span className="text-lg font-bold text-pink-600">
                          {company.candidateExperience.interviewExperience}/5
                        </span>
                      </div>
                      <Progress
                        value={
                          company.candidateExperience.interviewExperience * 20
                        }
                        className="mb-2"
                      />
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Poppins" }}
                      >
                        Structured interviews that focus on potential and growth
                        mindset. Interviewers are well-prepared and create a
                        welcoming environment.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4
                          className="font-semibold text-gray-900"
                          style={{ fontFamily: "Sora" }}
                        >
                          Process Transparency
                        </h4>
                        <span className="text-lg font-bold text-pink-600">
                          {company.candidateExperience.processTransparency}/5
                        </span>
                      </div>
                      <Progress
                        value={
                          company.candidateExperience.processTransparency * 20
                        }
                        className="mb-2"
                      />
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Poppins" }}
                      >
                        Clear information about role expectations, company
                        culture, and career progression opportunities shared
                        upfront.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className="font-semibold text-gray-900"
                        style={{ fontFamily: "Sora" }}
                      >
                        Overall Experience Rating
                      </h4>
                      <p className="text-sm text-gray-600">
                        Based on feedback from{" "}
                        {Math.floor(Math.random() * 50) + 25} recent candidates
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-pink-600">
                        {company.candidateExperience.overallExperience}/5
                      </div>
                      <div className="flex">
                        {renderStarRating(
                          company.candidateExperience.overallExperience,
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
