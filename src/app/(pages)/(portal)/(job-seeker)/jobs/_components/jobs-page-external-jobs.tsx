import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function ExternalJobs() {
  return (
    <Card className="p-4">
      <CardHeader className="mb-4">
        <div className="flex flex-row items-center gap-2">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <ExternalLink className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-700 text-sm">External Jobs</div>
            <p className="text-xs text-gray-500">
              Entry-level opportunities from other sites
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-gray-600">
          <p>
            These jobs are from external websites. We thought they looked like a
            safe bet, but they aren&apos;t affiliated with Pollen, and we
            don&apos;t endorse the companies or positions listed, so please make
            sure to research each opportunity before applying.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
