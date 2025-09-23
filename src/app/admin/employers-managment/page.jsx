"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { applicationMocks } from "./(mocks)/application-mocks";

import {
  Building2,
  Eye,
  CheckCircle,
  XCircle,
  Search,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { PrimaryButton } from "@/components/ui/buttons/primary-button";

// Función para obtener el badge según el status
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

export default function AdminEmployersManagment() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const applications = applicationMocks;

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.industries.some((industry) =>
        industry.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesStatus =
      selectedStatus === "all" || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const addButtonOnClick = () => {
    console.log("Funciona");
  };

  return (
    <div className="">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mx-auto px-4 py-4">
          Employers Management
        </h1>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-grow relative bg-white">
            <Search
              className="absolute left-3 top-1/2 
            transform -translate-y-1/2 
            h-4 w-4 
            text-gray-400"
            />
            <Input
              placeholder="Search companies or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-grow">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="flex flex-grow justify-end items-center">
            <PrimaryButton
              text="Add +"
              onClick={addButtonOnClick}
              className=""
            />

            {/* <div className="h-4 w-4 bg-black">Algo</div> */}
          </div>
        </div>
        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => (
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
                        {new Date(
                          application.submittedDate,
                        ).toLocaleDateString()}
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
                            router.push(`/admin/employers-managment/review/`)
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
                          router.push(
                            `/main/admin/employers-managment/review/}`,
                          )
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
                          router.push(`/main/admin/employers-managment/review/`)
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
      </div>
    </div>
  );
}
