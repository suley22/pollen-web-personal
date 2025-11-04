import { PageHeader, PrimaryButton } from "@/components/design-system";
import { Button } from "@/components/ui/buttons/button";
import { Eye, Heart } from "lucide-react";

export default function ApplyJobHeader({
  job,
  isSaved,

  onToggleSave,
  onBack,
  handleCompanyDetails,
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
          onClick={onToggleSave}
          className={isSaved ? "text-pink-600 border-pink-600" : ""}
        >
          <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          {isSaved ? "Saved" : "Save Job"}
        </Button>
        <PrimaryButton
          text="Company Details"
          icon={<Eye className="h-4 w-4" />}
          onClick={handleCompanyDetails}
          style="outline"
          className="text-sm"
        />
        <div className="flex items-center gap-2 text-sm text-gray-600"></div>
      </div>
    </PageHeader>
  );
}
