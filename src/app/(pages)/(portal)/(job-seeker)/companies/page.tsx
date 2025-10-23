"use client";

import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Users, Star, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader, PageContainer } from "@/components/design-system";
import { FormCard } from "./_components/form-card";
import { JobSeekerRoutes } from "../router";
import {
  AllCompanies,
  RecommendedCompanies,
} from "./_components/companies-list";

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

  return (
    <PageContainer>
      <PageHeader
        title="Companies"
        subtitle={"Discover amazing companies and career opportunities."}
      />
      <RecommendedCompanies />

      <div className="m-8">
        <AllCompanies />

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
              variant="pollen"
              style={{ fontFamily: "Sora" }}
              onClick={() => {
                window.location.href = "/jobs";
              }}
            >
              <Building2 className="w-5 h-5 mr-2" />
              View All Jobs
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
