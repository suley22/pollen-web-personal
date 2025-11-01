import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function JobSeekerHomeVideoSection() {
  return (
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
  );
}
