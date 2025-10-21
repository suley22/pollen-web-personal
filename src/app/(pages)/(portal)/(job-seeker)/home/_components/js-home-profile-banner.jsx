"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons/button";
import { ChevronRight, Clock, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import CircularProgress from "@/components/ui/circular-progress";

export function CompleteProfileBanner() {
  const router = useRouter();

  return (
    <Card style={{ backgroundColor: "#fff9e6" }}>
      <CardContent className="py-6 px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Complete Your Profile to Unlock Personalised Recommendations
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                Once complete, you&apos;ll be able to apply for Pollen approved,
                CV-less jobs, where you receive guaranteed feedback
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
  );
}
