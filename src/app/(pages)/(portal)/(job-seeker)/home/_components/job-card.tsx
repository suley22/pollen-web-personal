import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/buttons/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Building, Banknote, Clock, MapPin, Heart } from "lucide-react";
import { PrimaryButton } from "@/components/design-system";
import { ApprovalSourceBadge } from "@/components/design-system/badge";

const clampText = (text: string, maxChars: number) => {
  const t = text.trim();
  if (t.length <= maxChars) return t;
  const sliced = t.slice(0, maxChars);
  // Avoid cutting the last word in half
  return sliced.replace(/\s+\S*$/, "") + "…";
};

export function JobCard({ job, isSaved, onToggleSave, onApply }) {
  const apply = () => {
    if (onApply) return onApply();
    if (typeof window !== "undefined") {
      window.location.href = `/jobs/${job.id}/apply`;
    }
  };

  return (
    <Card className="flex items-start justify-between border rounded-lg !p-3 hover:bg-gray-50">
      <CardHeader className="w-full flex-col">
        <div className="flex items-start">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-base">
              {job.title}
            </div>
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
            <div className="flex flex-row items-center gap-3 mt-1">
              <span className="flex items-center gap-1">
                <Building className="w-3 h-3" />
                <a
                  href="/profile-checkpoints"
                  className="w-full font-light text-gray-600 hover:text-blue-600"
                >
                  {job.company.name}
                </a>
              </span>
              <ApprovalSourceBadge approvedByPollen={!!job.pollenApproved} />
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

      <CardFooter className="w-full flex gap-1 flex-row px-0 border-t border-border/50 pt-4 mt-4">
        <PrimaryButton className="grow" text="View and Apply" onClick={apply} />
        <Button
          size="sm"
          variant="outline"
          onClick={onToggleSave}
          className={`flex ${isSaved ? "text-pink-600" : ""}`}
        >
          <Heart
            className={`!w-5 !h-5 ${isSaved ? "fill-pink-600 text-pink-600" : ""}`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
