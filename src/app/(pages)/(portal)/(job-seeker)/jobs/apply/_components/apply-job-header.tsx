import { PageHeader } from "@/components/design-system";
import { Button } from "@/components/ui/buttons/button";
import { Heart } from "lucide-react";

export default function ApplyJobHeader({
  job,
  isSaved,
  showCompanyProfile,
  setShowCompanyProfile,
  onSaveJob,
  onBack,
  saveJobMutation,
  removeSavedJobMutation,
}) {
  return (
    <PageHeader
      title={`Apply for ${job?.job_title || "Job"}`}
      showBackButton={true}
      onBack={onBack}
      subtitle={`at ${job?.company_name || ""}`}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onSaveJob}
          className={isSaved ? "text-pink-600 border-pink-600" : ""}
          disabled={
            saveJobMutation?.isPending || removeSavedJobMutation?.isPending
          }
        >
          <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          {isSaved ? "Saved" : "Save Job"}
        </Button>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Job Details</span>
          <button
            onClick={() => setShowCompanyProfile(!showCompanyProfile)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colours ${
              showCompanyProfile ? "bg-pink-600" : "bg-gray-200"
            }`}
            style={showCompanyProfile ? { backgroundColor: "#E2007A" } : {}}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showCompanyProfile ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span>Company Profile</span>
        </div>
      </div>
    </PageHeader>
  );
}
