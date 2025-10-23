import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons/button";
import { useRouter } from "next/navigation";
import { JobSeekerRoutes } from "../../router";

export function CallToAction() {
  const router = useRouter();

  return (
    <>
      <Card className="bg-yellow-50 mt-16 border mb-4">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to find your next opportunity?
          </h3>
          <p className="font-poppins text-gray-600 mb-6 max-w-2xl mx-auto">
            Browse job opportunities from our partner companies and take the
            next step in your career journey.
          </p>
          <Button
            size="lg"
            className="hover:opacity-90"
            variant="pollen"
            style={{ fontFamily: "Sora" }}
            onClick={() => {
              router.push(JobSeekerRoutes.jobs);
            }}
          >
            <Building2 className="w-5 h-5 mr-2" />
            View All Jobs
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
