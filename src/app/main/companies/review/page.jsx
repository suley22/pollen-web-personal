"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, Users, Calendar, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { company as companiesData } from "./(mocks)/mocks";

export default function CompanyReviewPage() {
  const company = companiesData["techflow-solutions"];
  const [candidateExperienceDialogOpen, setCandidateExperienceDialogOpen] =
    useState(false);

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
            <Button variant="ghost" onClick={() => router.push("/companies")}>
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
        </div>
      </div>
    </div>
  );
}
