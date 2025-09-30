"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { useEmployerManagement } from "./useEmployerManagement";
import { PrimaryButton } from "@/components/ui/buttons/primary-button";
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
  ArrowLeft
} from "lucide-react";


export default function AdminEmployersManagment() {

  const router = useRouter();
  const { form } = useEmployerManagement();

  return (
   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
        <div className="flex flex-row">
      <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
          <h1 className="text-4xl px-4 font-bold text-gray-900">Employers Management</h1>
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
              value={form.searchTerm}
              onChange={(e) => form.setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-grow">
            <select
              value={form.selectedStatus}
              onChange={(e) => form.setSelectedStatus(e.target.value)}
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
              onClick={form.addButtonOnClick}
              className=""
            />

            {/* <div className="h-4 w-4 bg-black">Algo</div> */}
          </div>
        </div>

        {/* Loading State */}
        {form.loading && (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading employers...</div>
          </div>
        )}

        {/* Error State */}
        {form.error && !form.loading && (
          <div className="flex justify-center items-center py-8">
            <div className="text-red-500 bg-red-50 p-4 rounded-md">
              Error: {form.error}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!form.loading && !form.error && form.employers.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500 text-center">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No employers found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}

        {/* Applications List */}
        <div className="space-y-4">
          {!form.loading && form.employers.map((application) => (
            <Card key={application.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.company_name || "Unknown Company"}
                      </h3>
                      {form.getStatusBadge(application.approval_status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        {application.industries || "Industry not specified"}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {application.company_location || "Location not specified"}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {application.company_size || "Size not specified"}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {application.contact_email || "Email not provided"}
                      </div>
                      {application.contact_phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {application.contact_phone}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {application.created_at ? new Date(
                          application.created_at,
                        ).toLocaleDateString() : "Date not available"}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    {application.approval_status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() =>
                            router.push(`/admin/employers-managment/review/${application.id}`)
                          }
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review Application
                        </Button>
                      </>
                    )}
                    {application.approval_status === "approved" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() =>
                          router.push(
                            `/admin/employers-managment/review/${application.id}`
                          )
                        }
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        View Approved
                      </Button>
                    )}
                    {application.approval_status === "rejected" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          router.push(`/admin/employers-managment/review/${application.id}`)
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
