"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Building,
  Banknote,
  Clock,
  MapPin,
  Heart,
  ExternalLink,
} from "lucide-react";
import { PrimaryButton } from "@/components/design-system";

import { SecondaryButton } from "@/components/design-system/primary-button";
import { JobSeekerRoutes } from "../../router";

const clampText = (text: string, maxChars: number) => {
  const t = text.trim();
  if (t.length <= maxChars) return t;
  const sliced = t.slice(0, maxChars);
  // Avoid cutting the last word in half
  return sliced.replace(/\s+\S*$/, "") + "…";
};

export function JobCard({ job, isSaved, onToggleSave, onApply }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(JobSeekerRoutes.applyJobs(job.id));
  };

  const handleSaveClick = () => {
    onToggleSave();
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <Card className="flex items-start justify-between border rounded-lg !p-3 hover:bg-gray-50">
        <CardHeader className="w-full flex-col">
          <div className="flex items-start">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-base">
                {job.title}
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  <a
                    href="/profile-checkpoints"
                    className="w-full font-light text-gray-600 hover:text-blue-600"
                  >
                    {job.company.name}
                  </a>
                </span>
                {job.type === "pollen" && (
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800 text-xs"
                  >
                    Pollen Approved
                  </Badge>
                )}
                {job.type === "hidden" && (
                  <Badge variant="outline" className="text-xs">
                    External
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col !gap-3 pt-4 justify-between w-full h-full">
          <div className="flex flex-col text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location ? job.location : "Not specified"}
            </span>
            <span className="flex items-center gap-1 mt-1">
              <Banknote className="w-4 h-4" />
              {job.salary ? job.salary : "Not disclosed"}
            </span>
          </div>
          <div className="flex h-full items-start">
            <p className="text-sm text-gray-600">
              {job.description
                ? clampText(job.description, 190)
                : "No description available."}
            </p>
          </div>
          <span className="flex items-center text-xs text-gray-600 gap-1">
            <Clock className="w-3 h-3" />
            Apply by{" "}
            {new Date(job.applicationDeadline).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </CardContent>

        <CardFooter className="w-full flex gap-1 justify-between flex-row px-0 border-t border-border/50 pt-4 mt-4">
          {job.type === "pollen" && !job.hasApplied && (
            <PrimaryButton className="grow" text="View and Apply" />
          )}
          {job.type === "pollen" && job.hasApplied && (
            <PrimaryButton
              className="grow"
              text="Already Applied"
              style="outline"
            />
          )}
          {job.type === "hidden" && !job.hasApplied && (
            <PrimaryButton
              className="grow"
              style="outline"
              icon={<ExternalLink className="w-4 h-4" />}
              text="Apply"
            />
          )}
          {job.type === "hidden" && job.hasApplied && (
            <PrimaryButton
              className="grow"
              style="outline"
              icon={<ExternalLink className="w-4 h-4" />}
              text="Already Applied"
            />
          )}
          <div onClick={(e) => e.stopPropagation()}>
            <SecondaryButton
              style="ghost"
              icon={
                <Heart
                  className={`${isSaved ? "fill-pink-600 text-pink-600" : ""}`}
                />
              }
              text=""
              onClick={handleSaveClick}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
