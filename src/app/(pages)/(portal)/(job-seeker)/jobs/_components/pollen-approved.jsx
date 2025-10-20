import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, CheckCircle } from "lucide-react";

export default function PollenApprovedJobs() {
  return (
    <Card className="p-4">
      <CardHeader className="pb-4">
        <div className="flex flex-row items-center">
          <div className="w-8 h-8 bg-[#E2007A] rounded-full flex items-center justify-center mr-2">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-[#E2007A] text-sm">
              Pollen Approved Jobs
            </div>
            <p className="text-xs text-gray-600">
              Vetted employers with fair hiring
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-[#E2007A]" />
            <span>No CV required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-[#E2007A]" />
            <span>Guaranteed feedback</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-[#E2007A]" />
            <span>Custom assessments</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-[#E2007A]" />
            <span>Fair hiring process</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
