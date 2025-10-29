import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, FileText, Users, Award, Trophy } from "lucide-react";

export default function WhatHappensNext() {
  return (
    <Card className="flex flex-col p-6 gap-6">
      <CardHeader>
        <CardTitle
          className="flex items-center gap-2 text-xl"
          style={{ fontFamily: "Sora" }}
        >
          <Zap className="w-5 h-5 text-gray-600" />
          What Happens Next
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h4
              className="font-medium text-md mb-1"
              style={{ fontFamily: "Sora" }}
            >
              1. Complete Assessment
            </h4>
            <p
              className="text-md text-gray-600"
              style={{ fontFamily: "Poppins" }}
            >
              Demonstrate your skills with our practical challenge
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h4
              className="font-medium text-md mb-1"
              style={{ fontFamily: "Sora" }}
            >
              2. Team Review
            </h4>
            <p
              className="text-md text-gray-600"
              style={{ fontFamily: "Poppins" }}
            >
              Our team reviews and shortlists curated applications
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <h4
              className="font-medium text-md mb-1"
              style={{ fontFamily: "Sora" }}
            >
              3. Pollen Feedback
            </h4>
            <p
              className="text-md text-gray-600"
              style={{ fontFamily: "Poppins" }}
            >
              Receive detailed feedback within 1 week guaranteed
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <h4
              className="font-medium text-md mb-1"
              style={{ fontFamily: "Sora" }}
            >
              4. Interview Invitation
            </h4>
            <p
              className="text-md text-gray-600"
              style={{ fontFamily: "Poppins" }}
            >
              Top candidates invited for interview
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
