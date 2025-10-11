import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Card, CardContent } from "@/app/components/ui/card";
import { useEmployerManagement } from "../useEmployerManagement";
import {
  Building2,
  Edit,
  Eye,
  User,
  Globe,
  Mail,
  MoreHorizontal,
  Phone,
  Trash2,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function EmployerList() {
  const { form } = useEmployerManagement();
  const router = useRouter();

  return (
    <div className="space-y-4">
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
      {!form.loading &&
        form.employers.map((application) => (
          <Card key={application.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={application.logo}
                      alt={application.company_name}
                    />
                    <AvatarFallback>
                      <Building2 className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="!mb-0 text-lg font-semibold">
                        {application.company_name || "Unknown Company"}
                      </h3>
                      {form.getStatusBadge(application.approval_status)}
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-muted-foreground flex-wrap">
                      {application.industries ? (
                        String(application.industries)
                          .split(",")
                          .map((industry) => {
                            const trimmed = industry.trim();
                            return (
                              <Badge
                                key={trimmed}
                                variant="secondary"
                                className="mr-1 mb-1 cursor-pointer"
                              >
                                {trimmed}
                              </Badge>
                            );
                          })
                      ) : (
                        <span className="flex items-center">
                          Industry not specified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {application.company_size || "Size not specified"}
                      </span>
                      <span className="flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        {application.company_location ||
                          "Location not specified"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {application.contact_name || "Name not provided"}
                      </span>
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {application.contact_email || "Email not provided"}
                      </span>
                      {application.contact_phone && (
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {application.contact_phone || "Phone not provided"}
                        </span>
                      )}
                    </div>

                    {/* Job Counts */}
                    <div className="flex items-center space-x-3 text-sm mt-2">
                      {(application.liveJobsCount || 0) > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {application.liveJobsCount} Live Jobs
                        </Badge>
                      )}
                      {(application.draftJobsCount || 0) > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-orange-50 text-orange-700 border-orange-200"
                        >
                          {application.draftJobsCount} Draft Jobs
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right space-y-1">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Profile: </span>
                      <span className="font-medium">
                        {application.profileCompleteness}%
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Updated{" "}
                      {application.updated_at
                        ? new Date(application.updated_at).toLocaleDateString()
                        : "Date not available"}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          // setLocation(
                          //   `/admin/company-profiles/${application.id}`,
                          // );
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          // setLocation(
                          //   `/admin/company-profiles/${company.id}?edit=true`,
                          // );
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        // onClick={(e) => handleDeleteClick(company, e)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Profile
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
