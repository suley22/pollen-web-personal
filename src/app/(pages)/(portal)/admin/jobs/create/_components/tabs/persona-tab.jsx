import { UserCheck, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PersonaTab({ personaData }) {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="flex items-center pb-4">
          <UserCheck className="h-5 w-5 mr-2" />
          Employer Persona Questionnaire Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {personaData ? (
          <>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Ideal Candidate Profile
              </h3>
              <p className="text-sm text-blue-800 mb-3">
                <strong>Primary Behavioral Type:</strong>{" "}
                {personaData.primaryDisc}
              </p>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-blue-900">
                    Key Traits:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {personaData.traits.map((trait, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-900">
                    Work Style:
                  </span>
                  <p className="text-sm text-blue-700 mt-1">
                    {personaData.workStyle}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-900">
                    Ideal Environment:
                  </span>
                  <p className="text-sm text-blue-700 mt-1">
                    {personaData.idealEnvironment}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                Behavioral Insights
              </h4>
              <p className="text-sm text-gray-700">
                {personaData.behavioralInsights}
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  console.log("View full persona results");
                }}
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Full Persona Results
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Persona Data Available
            </h3>
            <p className="text-gray-600">
              Persona questionnaire has not been completed yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
