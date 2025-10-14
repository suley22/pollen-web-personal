"use client";

import { useEmployerManagement } from "@/admin/employers/_hooks/useEmployerManagement";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Globe,
  Mail,
  Phone,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export function List() {
  const router = useRouter();
  const { employers, getStatusBadge } = useEmployerManagement();

  const handleSetLive = (company) => {
    const updatedCompany = { ...company, status: "live" };
    // TODO: Implement updateCompanyMutation
    console.log("Would update company:", updatedCompany);
  };

  const handleDeleteClick = (company, e) => {
    // TODO: Implement updateCompanyMutation
    e.stopPropagation();
    console.log("Would update company");
  };

  return (
    <div className="space-y-4">
      {employers.map((company) => (
        <Card
          key={company.id}
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => router.push(`/admin/company-profiles/${company.id}`)}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    className="rounded-md"
                    src={company.logo}
                    alt={company.company_name}
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    <Building2 className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold">
                      {company.company_name}
                    </h3>
                    {getStatusBadge(company.approval_status)}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      {Array.isArray(company.industries)
                        ? company.industries.join(", ")
                        : company.industries}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {company.size}
                    </span>
                    <span className="flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      {company.location}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {company.contact_email}
                    </span>
                    {company.contact_phone && (
                      <span className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {company.contact_phone}
                      </span>
                    )}
                  </div>

                  {/* TODO: revisar si esto es necesario */}

                  {company.assignedAdmin && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        Assigned to:{" "}
                      </span>
                      <span className="font-medium">
                        {company.assignedAdmin}
                      </span>
                    </div>
                  )}

                  {/* Job Counts */}
                  <div className="flex items-center space-x-3 text-sm mt-2">
                    {(company.liveJobsCount || 0) > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {company.live_jobs_count} Live Jobs
                      </Badge>
                    )}
                    {(company.draft_jobs_count || 0) > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-orange-50 text-orange-700 border-orange-200"
                      >
                        {company.draft_jobs_count} Draft Jobs
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Set Live button for draft companies only */}
                {company.approval_status === "draft" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetLive(company);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Set Live
                  </Button>
                )}

                <div className="text-right space-y-1">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Profile: </span>
                    <span className="font-medium">
                      {company.profileCompleteness}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated {new Date(company.lastUpdated).toLocaleDateString()}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="text-muted-foreground hover:bg-muted"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      inset={0}
                      className=""
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/company-profiles/${company.id}`);
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      inset={0}
                      className=""
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/admin/company-profiles/${company.id}?edit=true`,
                        );
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      inset={0}
                      onClick={(e) => handleDeleteClick(company, e)}
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
