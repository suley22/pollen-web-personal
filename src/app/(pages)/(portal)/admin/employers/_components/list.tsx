"use client";

import { useEmployerManagementContext } from "@/admin/employers/_context/EmployerManagementContext";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, CheckCircle } from "lucide-react";

import {
  User,
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
import { useTransition } from "react";
import { AdminRoutes } from "../../router";
import { ListAvatar } from "./list-avatar";
import { ListSkeleton } from "./list-skeleton";

export function List() {
  const router = useRouter();
  const { employers, getStatusBadge, loading } = useEmployerManagementContext();
  const [isPending, startTransition] = useTransition();

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

  function onEmployerClick(company) {
    startTransition(() => {
      router.push(AdminRoutes.employersView(company.id));
    });
  }

  if (loading) {
    return <ListSkeleton />;
  }

  return (
    <div className="space-y-3">
      {employers.map((company) => (
        <Card
          key={company.id}
          className="hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer border-border/40"
          onClick={() => onEmployerClick(company)}
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              {/* Left Section - Avatar and Info */}
              <div className="flex gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <ListAvatar company={company} />
                </div>

                <div className="flex-1 min-w-0 space-y-3">
                  {/* Company Name and Status */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {company.company_name}
                    </h3>
                    {getStatusBadge(company.approval_status)}
                  </div>

                  {/* Company Details - 3 Rows */}
                  <div className="space-y-2 text-sm">
                    {/* Primera fila: Industria */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{company.industries}</span>
                    </div>

                    {/* Segunda fila: Localización y Cantidad de personas */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{company.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{company.size}</span>
                      </div>
                    </div>

                    {/* Tercera fila: Email y Teléfono */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{company.contact_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">
                          {company.contact_email}
                        </span>
                      </div>
                      {company.contact_phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">
                            {company.contact_phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border/50 pt-3 mt-3">
                    {/* Job Counts and Admin */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {(company.live_jobs_count || 0) > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 font-medium"
                        >
                          {company.live_jobs_count} Live Jobs
                        </Badge>
                      )}
                      {(company.draft_jobs_count || 0) > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-orange-50 text-orange-700 border-orange-200 font-medium"
                        >
                          {company.draft_jobs_count} Draft Jobs
                        </Badge>
                      )}
                      {company.assignedAdmin ? (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 font-medium"
                        >
                          Assigned to: {company.assignedAdmin}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-gray-50 text-gray-600 border-gray-200 font-medium"
                        >
                          Unassigned
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Actions and Meta */}
              <div className="flex flex-col items-end gap-3">
                {/* Meta Info Card */}
                <div className="text-right space-y-1 bg-muted/30 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">
                    Profile Complete
                  </div>
                  <div className="text-xl font-bold text-foreground">
                    {company.profileCompleteness}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated {new Date(company.lastUpdated).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* Set Live button for draft companies only */}
                  {company.approval_status === "draft" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetLive(company);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Set Live
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="text-muted-foreground hover:bg-muted hover:text-foreground"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-5 w-5" />
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
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Profile
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
