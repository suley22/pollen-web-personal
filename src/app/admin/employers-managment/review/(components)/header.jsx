import { Button } from "@/components/ui/buttons/button";
import { Eye } from "lucide-react";

export function Header({ employerProfile }) {
  return (
    <div className="bg-white border-b mb-4">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "Sora" }}>
              Company Profile
            </h1>
            <p className="text-gray-600 mt-1" style={{ fontFamily: "Poppins" }}>
              Manage the information shared with our talent community
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => window.open("/company-profile/2", "_blank")}
              style={{ fontFamily: "Sora" }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Public View
            </Button>
            <div className="flex gap-2">
              {/* Development Status Switch (remove in production) */}
              {employerProfile.approvalStatus === "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Simulate status change for demo purposes
                    window.location.href =
                      window.location.href + "?status=approved";
                  }}
                  className="text-xs"
                >
                  Demo: Set Live
                </Button>
              )}
              {employerProfile.approvalStatus === "approved" &&
                !employerProfile.hasUnapprovedChanges && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Simulate status change for demo purposes
                      window.location.href =
                        window.location.href.split("?")[0] +
                        "?status=changes_pending";
                    }}
                    className="text-xs"
                  >
                    Demo: Edit & Pending
                  </Button>
                )}
              {employerProfile.hasUnapprovedChanges && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Simulate status change for demo purposes
                    window.location.href =
                      window.location.href.split("?")[0] + "?status=approved";
                  }}
                  className="text-xs"
                >
                  Demo: Approve Changes
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Simulate status change for demo purposes
                  window.location.href =
                    window.location.href.split("?")[0] +
                    "?status=requires_changes";
                }}
                className="text-xs"
              >
                Demo: Requires Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
