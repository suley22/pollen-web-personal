"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Brain, Target, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

export default function PersonaResultsPage() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Aquí deberías hacer la llamada a tu API para obtener los datos
    // Por ahora, simularemos algunos datos de ejemplo
    const mockData = {
      discProfile: [
        { style: "Red", percentage: 30 },
        { style: "Yellow", percentage: 25 },
        { style: "Green", percentage: 25 },
        { style: "Blue", percentage: 20 },
      ],
      personalityInsights: {
        primary: "Results-oriented and decisive",
        workApproach: "Takes initiative and drives projects forward",
        teamStyle: "Direct communication and goal-focused leadership",
        motivations: "Achievement, challenges, and measurable outcomes",
        strengths: "Decision making, problem solving, and strategic thinking",
      },
    };
    setProfileData(mockData);
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  // Parse URL parameters
  const jobTitle = searchParams.get("job") || "Marketing Assistant";
  const companyName = searchParams.get("company") || "Your Company";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                Persona Questionnaire Results
              </h1>
              <p className="text-gray-600">
                {jobTitle} at {companyName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              Persona Profile Created
            </h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-lg font-semibold text-blue-900">
                {jobTitle} at {companyName}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DISC Profile */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Behavioural Profile
              </h3>
              <div className="space-y-3">
                {profileData && profileData.discProfile ? (
                  profileData.discProfile.map(({ style, percentage }) => {
                    const colors = {
                      Red: "bg-red-500",
                      Yellow: "bg-yellow-400",
                      Green: "bg-green-500",
                      Blue: "bg-blue-500",
                    };
                    const behaviorNames = {
                      Red: "Decisive",
                      Yellow: "Interactive",
                      Green: "Steady",
                      Blue: "Conscientious",
                    };
                    return (
                      <div
                        key={style}
                        className="flex items-center justify-between"
                      >
                        <span className="font-medium">
                          {behaviorNames[style]}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`${colors[style]} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm w-10 text-right">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">Loading profile data...</p>
                )}
              </div>
            </Card>

            {/* Personality Insights */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Ideal Candidate Insights
              </h3>
              <div className="space-y-4">
                {profileData && profileData.personalityInsights ? (
                  <>
                    <div>
                      <h4 className="text-sm font-semibold text-pink-600 mb-1">
                        Primary Style
                      </h4>
                      <p className="text-sm text-gray-700">
                        {profileData.personalityInsights.primary}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-pink-600 mb-1">
                        Work Approach
                      </h4>
                      <p className="text-sm text-gray-700">
                        {profileData.personalityInsights.workApproach}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-pink-600 mb-1">
                        Team Interaction
                      </h4>
                      <p className="text-sm text-gray-700">
                        {profileData.personalityInsights.teamStyle}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-pink-600 mb-1">
                        Key Motivations
                      </h4>
                      <p className="text-sm text-gray-700">
                        {profileData.personalityInsights.motivations}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-pink-600 mb-1">
                        Potential Strengths
                      </h4>
                      <p className="text-sm text-gray-700">
                        {profileData.personalityInsights.strengths}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">
                    Loading personality insights...
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Detailed DISC Explanations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Understanding Each Behavioral Style
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-700 mb-2">
                    Decisive (Red)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Direct, results-focused, and competitive. Thrives on
                    challenges, makes quick decisions, and drives for immediate
                    results. Natural leaders who take charge and push for
                    efficiency.
                  </p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-yellow-700 mb-2">
                    Interactive (Yellow)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Enthusiastic, persuasive, and optimistic. Excels at building
                    relationships, inspiring others, and bringing energy to
                    teams. Natural communicators who thrive in social
                    environments.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700 mb-2">
                    Steady (Green)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Patient, reliable, and supportive. Values stability,
                    teamwork, and consistent processes. Natural team players who
                    provide dependable support and maintain harmony.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-700 mb-2">
                    Conscientious (Blue)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Precise, analytical, and systematic. Focuses on accuracy,
                    quality, and thorough planning. Natural problem-solvers who
                    ensure standards are met and details are covered.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Next Steps
            </h3>
            <p className="text-green-800 text-sm">
              Our team will review your persona profile and create a tailored
              job posting and assessment for your {jobTitle} role. We&apos;ll be in
              touch within 2 business days with your customised hiring
              materials.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              className="flex items-center gap-2"
              onClick={() => window.print()}
            >
              <Download className="h-4 w-4" />
              Download Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
