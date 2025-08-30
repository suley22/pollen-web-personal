"use client";

import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Building2,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Users,
} from "lucide-react";

export function List({ employerList }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 space-y-4">
      {employerList.map((application) => (
        <Card key={application.id} className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {application.companyName}
                  </h3>
                  {getStatusBadge(application.status)}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    {application.industries.join(", ")}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {application.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {application.companySize} employees
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {application.contactEmail}
                  </div>
                  {application.contactPhone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {application.contactPhone}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(application.submittedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                {application.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() =>
                        redirect(`/admin/employers-managment/review/`)
                      }
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Review Application
                    </Button>
                  </>
                )}
                {application.status === "approved" && (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() =>
                      redirect(`/main/admin/employers-managment/review/`)
                    }
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    View Approved
                  </Button>
                )}
                {application.status === "rejected" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      redirect(`/main/admin/employers-managment/review/`)
                    }
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    View Rejected
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
