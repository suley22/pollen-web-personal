import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";

export function CommunityFooter() {
  return (
    <Card className="p-2" style={{ backgroundColor: "#fff9e6" }}>
      <CardHeader className="">
        <CardTitle className="flex items-center font-sora text-lg p-3">
          <Users className="h-5 w-5 text-gray-700" />
          Weekly Community Drop-in
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-700 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-700" />
                Every Monday, 1:00 PM GMT
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-700" />
                42/100 attending this week
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Meet the Pollen team in a relaxed, low-pressure environment for
              career support
            </p>
          </div>
          <div className="sm:ml-6">
            <Button
              size="sm"
              variant="pollen"
              onClick={() =>
                window.open(
                  "https://calendly.com/pollencareers/ask-us-anything",
                  "_blank",
                )
              }
              className="w-full sm:w-auto"
            >
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
