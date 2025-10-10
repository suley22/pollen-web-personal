"use client";

import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Users, Star, Target } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CompaniesPage() {
  const companies = [
    {
      id: 2,
      name: "TechFlow Solutions",
      logo: "🚀",
      industry: "Technology",
      location: "London, UK",
      size: "50-200 employees",
      rating: 4.8,
      openRoles: 12,
      description:
        "Leading fintech company transforming digital payments across Europe",
      benefits: [
        "Remote work",
        "Health insurance",
        "Learning budget",
        "Equity options",
      ],
    },
    {
      id: 3,
      name: "GreenEnergy Solutions",
      logo: "🌱",
      industry: "Clean Energy",
      location: "Manchester, UK",
      size: "200-500 employees",
      rating: 4.6,
      openRoles: 8,
      description: "Sustainable energy solutions for a greener future",
      benefits: [
        "Hybrid work",
        "Pension scheme",
        "Wellness programmes",
        "Career development",
      ],
    },
    {
      id: 4,
      name: "DataMind Analytics",
      logo: "📊",
      industry: "Data & AI",
      location: "Remote",
      size: "20-50 employees",
      rating: 4.9,
      openRoles: 6,
      description:
        "AI-powered analytics platform helping businesses make data-driven decisions",
      benefits: [
        "Fully remote",
        "Flexible hours",
        "Top-tier equipment",
        "Conference budget",
      ],
    },
    {
      id: 5,
      name: "HealthTech Connect",
      logo: "🏥",
      industry: "Healthcare Technology",
      location: "Birmingham, UK",
      size: "100-300 employees",
      rating: 4.5,
      openRoles: 15,
      description:
        "Digital health solutions improving patient care and outcomes",
      benefits: [
        "Health insurance",
        "Learning stipend",
        "Flexible schedule",
        "Volunteering days",
      ],
    },
    {
      id: 6,
      name: "CreativeSpace Studios",
      logo: "🎨",
      industry: "Design & Marketing",
      location: "Edinburgh, UK",
      size: "30-100 employees",
      rating: 4.7,
      openRoles: 9,
      description:
        "Award-winning creative agency specialising in brand experiences",
      benefits: [
        "Creative freedom",
        "Professional development",
        "Team retreats",
        "Modern workspace",
      ],
    },
    {
      id: 7,
      name: "FinanceFirst",
      logo: "💼",
      industry: "Financial Services",
      location: "London, UK",
      size: "500+ employees",
      rating: 4.4,
      openRoles: 22,
      description:
        "Innovative financial services firm driving digital transformation",
      benefits: [
        "Competitive salary",
        "Bonus scheme",
        "Training programmes",
        "Career progression",
      ],
    },
  ];

  const recommendedCompanies = companies.slice(0, 2); // Show first 2 as recommended
  const allCompanies = companies;
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Companies</h1>
        <p className="text-gray-600 text-lg">
          Discover amazing companies and career opportunities
        </p>
      </div>

      <div className="my-4">
        <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl mb-3 mx-2 p-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="bg-pink-100 p-1 sm:p-2 rounded-lg">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h2
                className="text-base sm:text-lg lg:text-xl font-bold text-gray-900"
                style={{ fontFamily: "Sora" }}
              >
                Recommended For You
              </h2>
              <p
                className="text-xs sm:text-sm lg:text-base text-gray-600"
                style={{ fontFamily: "Poppins" }}
              >
                Based on your skills and preferences
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {recommendedCompanies.map((company) => (
              <Card key={company.id} className="border-blue-200 bg-white/80">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{company.logo}</div>
                    <div>
                      <h3 className="font-bold" style={{ fontFamily: "Sora" }}>
                        {company.name}
                      </h3>
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {company.industry}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span
                        className="text-sm font-medium"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {company.rating}★ candidate rating
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-sm text-gray-700 mb-3"
                    style={{ fontFamily: "Poppins" }}
                  >
                    {company.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-semibold text-green-600 uppercase"
                      style={{
                        fontFamily: "Sora",
                        fontSize: "0.75rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {company.openRoles} OPEN ROLES
                    </span>
                    <Button
                      size="sm"
                      style={{ fontFamily: "Sora" }}
<<<<<<< HEAD:src/app/main/companies/page.jsx
                      onClick={() => router.push(`/main/companies/review/2`)}
=======
                      onClick={() => router.push(`/main/companies/review`)}
>>>>>>> ae9222938fc5feadd6a28c2fc7742dc9592a707f:src/app/(portal)/main/companies/page.jsx
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="m-8">
        <h2
          className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 px-2 sm:px-4 lg:px-0"
          style={{ fontFamily: "Sora" }}
        >
          All Companies
        </h2>
        <div className="grid grid-cols-3 gap-y-3 gap-x-4 px-2">
          {allCompanies.map((company) => (
            <Card
              key={company.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-6">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="text-xl sm:text-2xl">{company.logo}</div>
                  <div className="flex-1 min-w-0">
                    <CardTitle
                      className="text-base sm:text-lg font-bold"
                      style={{ fontFamily: "Sora" }}
                    >
                      {company.name}
                    </CardTitle>
                    <p
                      className="text-xs sm:text-sm text-gray-600"
                      style={{ fontFamily: "Poppins" }}
                    >
                      {company.industry}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-2 mb-3 sm:mb-4">
                  <div
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                    style={{ fontFamily: "Poppins" }}
                  >
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{company.location}</span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                    style={{ fontFamily: "Poppins" }}
                  >
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{company.size}</span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                    style={{ fontFamily: "Poppins" }}
                  >
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                    <span>
                      {company.rating}★ candidate rating • {company.openRoles}{" "}
                      open roles
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 text-xs sm:text-sm"
                    variant="outline"
                    style={{ fontFamily: "Sora" }}
<<<<<<< HEAD:src/app/main/companies/page.jsx
                    onClick={() => router.push(`/main/companies/review/2`)}
=======
                    onClick={() => router.push(`/main/companies/review`)}
>>>>>>> ae9222938fc5feadd6a28c2fc7742dc9592a707f:src/app/(portal)/main/companies/page.jsx
                  >
                    View Company
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Call to Action */}
        <Card
          className="mt-16 border mb-4"
          style={{ backgroundColor: "#FFFCE5" }}
        >
          <CardContent className="p-8 text-center">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "Sora", color: "#272727" }}
            >
              Ready to find your next opportunity?
            </h3>
            <p
              className="text-gray-600 mb-6 max-w-2xl mx-auto"
              style={{ fontFamily: "Poppins" }}
            >
              Browse job opportunities from our partner companies and take the
              next step in your career journey.
            </p>
            <Button
              size="lg"
              className="hover:opacity-90"
              style={{
                backgroundColor: "#E2007A",
                color: "white",
                fontFamily: "Sora",
              }}
              onClick={() => (window.location.href = "/jobs")}
            >
              <Building2 className="w-5 h-5 mr-2" />
              View All Jobs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
