"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CircularProgress from "@/components/ui/circular-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

import {
  Users,
  Calendar,
  Star,
  Clock,
  ChevronRight,
  Trophy,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      // Use router navigation instead of direct window.location
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un problema al cerrar sesión. Por favor intenta de nuevo.");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-white home-page">
      {/* Navbar */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-3">
        {/* Welcome Section */}
        <div className="mb-6 mt-10">
          <h1 className="text-7xl lg:text-8xl font-sora font-bold text-gray-900 mb-2">
            Welcome back, querido! 👋
          </h1>
          <div className="flex flex-row justify-between ">
            <p className="text-sm font-sora text-gray-600 inline-block align-middle">
              Let's find you a job you love.
            </p>
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="outline"
              className="border-gray-300"
            >
              {isLoggingOut ? (
                <>
                  <span className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2" />
                  Cerrando sesión...
                </>
              ) : (
                "Cerrar sesión"
              )}
            </Button>
          </div>
        </div>

        {/* How to Use Pollen Video Section */}
        <Card className="mb-6">
          <CardContent className="p-4">
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
        <Card className="mb-8" style={{ backgroundColor: "#fff9e6" }}>
          <CardContent className="py-6 px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Complete Your Profile to Unlock Personalised Recommendations
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Once complete, you'll be able to apply for Pollen approved,
                    CV-less jobs, where you receive guaranteed feedback
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
                    onClick={() =>
                      (window.location.href = "/profile-checkpoints")
                    }
                    variant="pollen"
                    size="sm"
                    className="w-full sm:w-auto whitespace-nowrap font-sora"
                  >
                    Complete Profile
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4">
                <div className="h-full aspect-square w-20 sm:w-24 lg:w-28">
                  {" "}
                  {/* altura del contenedor */}
                  <CircularProgress
                    value={20}
                    fluid // <= clave
                    size={96} // fallback por si el padre no tuviera alto
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
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-sora text-lg p-3">
              <Star className="h-5 w-5 text-gray-700" />
              This Week's Featured Jobs
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Weekly Community Drop-in - Full Width Banner */}
        <Card style={{ backgroundColor: "#fff9e6" }} className="mb-4">
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
                  Meet the Pollen team in a relaxed, low-pressure environment
                  for career support
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
      </div>

      {/* Simple chatbot */}
    </div>
  );
}
