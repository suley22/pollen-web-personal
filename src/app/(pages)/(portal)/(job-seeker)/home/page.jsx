"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import CircularProgress from "@/components/ui/circular-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { CardFooter } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Heart,
  Building,
  Users,
  Calendar,
  Star,
  Clock,
  ChevronRight,
  Trophy,
  MapPin,
  Banknote,
} from "lucide-react";

import { useUser } from "@/app/providers";
import { Header } from "@/components/design-system";
import { JobCard } from "./_components/job-card";

export default function Home() {
  const user = useUser();
  const [, setProgress] = useState(0);
  const router = useRouter();

  // estado para guardados (JS puro)
  const [savedJobs, setSavedJobs] = useState(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle job saving/unsaving (JSX: sin tipos)
  const handleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      const newSavedJobs = new Set(prev);
      if (newSavedJobs.has(jobId)) {
        newSavedJobs.delete(jobId);
      } else {
        newSavedJobs.add(jobId);
      }
      return newSavedJobs;
    });
  };

  // Top job recommendations for home page
  const topJobRecommendations = [
    {
      id: "job-001",
      title: "Media Planning Assistant",
      company: {
        id: "5",
        name: "CreativeMinds Agency",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=50&h=50&fit=crop&crop=center",
        applicationDeadline: new Date(),
      },
      location: "London, UK",
      salary: { min: 26000, max: 32000 },
      matchScore: 92,
      matchReason: "",
      applicationDeadline: new Date(),
    },
    {
      id: "job-002",
      title: "Client Relationship Coordinator",
      company: {
        id: "2",
        name: "Adaptive Solutions Ltd",
        logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=50&h=50&fit=crop&crop=center",
        applicationDeadline: new Date(),
      },
      location: "Manchester, UK",
      salary: { min: 24000, max: 28000 },
      matchScore: 85,
      matchReason: "",
      applicationDeadline: new Date(),
    },
    {
      id: "job-003",
      title: "Marketing Assistant",
      company: {
        id: "3",
        name: "Growth Partners",
        logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=50&h=50&fit=crop&crop=center",
        applicationDeadline: new Date(),
      },
      location: "Birmingham, UK",
      salary: { min: 25000, max: 30000 },
      matchScore: 81,
      matchReason: "",
      applicationDeadline: new Date(),
    },
  ];

  return (
    <div className="w-full flex flex-col py-6 gap-5 home-page">
      {/* Welcome Section */}
      <Header
        titleSize="text-5xl"
        title={<>Welcome back, {user?.firstName}! 👋</>}
        subtitle={"Let's find you a job you love."}
      />

      {/* How to Use Pollen Video Section */}
      <Card>
        <CardContent className="p-2">
          <div className="flex items-center gap-4">
            {/* Video Container - Compact */}
            <div className="relative w-32 h-20 flex-shrink-0">
              <div className="w-full h-full bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                <div className="w-8 h-8 bg-[#E2007A] rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Platform Tutorial
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Quick 3-minute guide to get started
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />3 min watch
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complete Profile Banner */}
      <Card style={{ backgroundColor: "#fff9e6" }}>
        <CardContent className="py-6 px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Complete Your Profile to Unlock Personalised Recommendations
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Once complete, you&apos;ll be able to apply for Pollen
                  approved, CV-less jobs, where you receive guaranteed feedback
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Takes 10-15 minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    Required for job applications
                  </span>
                </div>

                <Button
                  onClick={() => router.push("/profile-checkpoints")}
                  variant="pollen"
                  size="sm"
                  className="w-full sm:w-auto whitespace-nowrap font-sora"
                >
                  Complete Profile
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="h-full aspect-square w-20 sm:w-24 lg:w-28">
                {/* altura del contenedor */}
                <CircularProgress
                  value={20}
                  fluid
                  size={80}
                  strokeWidth={10}
                  progressClassName="text-[#E2007A]"
                  trackClassName="text-pink-100"
                  textClassName="text-gray-800"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Jobs - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center font-sora text-lg p-3">
            <Star className="h-5 w-5 text-gray-700" />
            This Week&apos;s Featured Jobs
          </CardTitle>
        </CardHeader>
        <CardContent style={{ padding: "0.75rem" }}>
          <div className="grid grid-cols-3 gap-4">
            {topJobRecommendations.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.has(job.id)}
                onToggleSave={() => handleSaveJob(job.id)}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "/jobs")}
            size="sm"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
          >
            <span className="hidden sm:inline">View All Jobs</span>
            <ChevronRight className="w-3 h- ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {/* Weekly Community Drop-in - Full Width Banner */}
      <Card className="p-2" style={{ backgroundColor: "#fff9e6" }}>
        <CardHeader className="">
          <CardTitle className="flex items-center font-sora text-lg p-3">
            <Users className="h-5 w-5 text-gray-700" />
            Weekly Community Drop-in
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-700 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-700" />
                  Every Monday, 1:00 PM GMT
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-700" />
                  42/100 attending this week
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Meet the Pollen team in a relaxed, low-pressure environment for
                career support
              </p>
            </div>
            <div className="sm:ml-6">
              <Button
                size="sm"
                variant="pollen"
                onClick={() =>
                  window.open(
                    "https://calendly.com/pollencareers/ask-us-anything",
                    "_blank",
                  )
                }
                className="w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple chatbot */}
    </div>
  );
}
