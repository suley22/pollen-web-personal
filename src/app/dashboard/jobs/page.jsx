import { ExternalLink, CheckCircle, Shield } from "lucide-react";

export default function JobsPage() {
  return (
    <div>
      <div className="container mx-auto p-4 space-y-4 jobs-page">
        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Find Your Next Opportunity
          </h1>
          <div className="grid md:grid-cols-2 gap-4 w-full mb-6">
            {/* Pollen Approved Jobs */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#E2007A] rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#E2007A] text-sm">
                    Pollen Approved Jobs
                  </h3>
                  <p className="text-xs text-gray-600">
                    Vetted employers with fair hiring
                  </p>
                </div>
              </div>
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
            </div>

            {/* External Jobs */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 text-sm">
                    External Jobs
                  </h3>
                  <p className="text-xs text-gray-500">
                    Entry-level opportunities from other sites
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                <p>
                  These jobs are from external websites. We thought they looked
                  like a safe bet, but they aren't affiliated with Pollen, and
                  we don't endorse the companies or positions listed, so please
                  make sure to research each opportunity before applying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
