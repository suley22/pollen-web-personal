import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons/button";
import { useRouter } from "next/navigation";
import { JobSeekerRoutes } from "../../router";
import { PrimaryButton } from "@/components/design-system/primary-button";

export function CallToAction() {
  const router = useRouter();

  return (
    <>
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-6 text-center gap-5 flex flex-row justify-between items-center">
          <div className="flex flex-col items-start gap-0">
            <div className="text-xl font-bold mb-0">
              Ready to find your next opportunity?
            </div>
            <p className="font-poppins text-gray-600 ">
              Browse job opportunities from our partner companies and take the
              next step in your career journey.
            </p>
          </div>
          <PrimaryButton
            className="hover:opacity-90"
            onClick={() => {
              router.push(JobSeekerRoutes.jobs);
            }}
            icon={<Building2 className="w-5 h-5 mr-2" />}
            text="View All Jobs"
          />
        </CardContent>
      </Card>
    </>
  );
}
