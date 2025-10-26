"use client";

import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmployerProfileHelper } from "@/types/employers-types";
import { Building2 } from "lucide-react";
import { ResultsCount } from "@/app/(pages)/(portal)/admin/employers/_components/employers-page-results-count";

import {
  User,
  Users,
  Globe,
  Mail,
  Phone,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { EmployerStatusBadge } from "@/components/design-system";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "@/admin/router";
import { ListSkeleton } from "./employers-page-list-skeleton";
import { CompanyAvatar } from "@/components/ui/company-avatar";
import { EmptyState } from "@/components/design-system/empty-state";
import { useCallback } from "react";

export function List({
  employers,
  loading,
  pagination,
  handlePageChange,
  handlePageSizeChange,
}) {
  const router = useRouter();

  const onEmployerClick = useCallback(
    (company) => {
      router.push(AdminRoutes.employersView(company.id));
    },
    [router],
  );

  if (loading) {
    return <ListSkeleton />;
  }

  if (employers.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="No employers found"
        description="No employers match your current filters. Try adjusting your search criteria or clear filters to see all employers."
      />
    );
  }

  return (
    <div className="space-y-3">
      <ResultsCount
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
      {employers.map((company) => {
        return (
          <Card
            key={company.id}
            className="hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer border-border/40"
            onClick={() => onEmployerClick(company)}
          >
            <CardContent className="px-5 py-3">
              <div className="flex items-start justify-between gap-4">
                {/* Left Section - Avatar and Info */}
                <div className="flex gap-4 flex-1 min-w-0">
                  <div className="flex flex-col justify-center pr-2">
                    <CompanyAvatar
                      logoUrl={company.logo_url}
                      companyName={company.company_name}
                      size="md"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        {/* Company Name and Status */}
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-foreground truncate">
                            {company.company_name}
                          </h3>
                          <EmployerStatusBadge
                            status={company.approval_status}
                          />
                        </div>

                        {/* Company Details - 3 Rows */}
                        <div className="space-y-2 text-sm">
                          {/* Primera fila: Industria */}
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building2 className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">
                              {EmployerProfileHelper.getIndustriesDisplay(
                                company.industries,
                              ) || "Not specified"}
                            </span>
                          </div>

                          {/* Segunda fila: Localización y Cantidad de personas */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Globe className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">
                                {company.company_location || "Not specified"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">
                                {company.company_size || "Not specified"}
                              </span>
                            </div>
                          </div>

                          {/* Tercera fila: Email y Teléfono */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">
                                {company.contact_name || "Not specified"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">
                                {company.contact_email || "Not specified"}
                              </span>
                            </div>
                            {company.contact_phone && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">
                                  {company.contact_phone || "Not specified"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Right Section - Actions and Meta */}

                      <div className="flex flex-col justify-end gap-3">
                        <div className="text-right space-y-1 bg-muted/30 p-0 rounded-lg">
                          <div className="text-xs text-muted-foreground">
                            Profile Complete
                          </div>
                          <div className="text-xl font-bold text-foreground">
                            {company.profile_completeness || 0}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Updated{" "}
                            {EmployerProfileHelper.getFormattedUpdatedAt(
                              company.updated_at,
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border/50 pt-3 mt-3">
                      {/* Job Counts and Admin */}
                      <div className="flex flex-row justify-between">
                        <div className="flex  items-center gap-2 flex-wrap">
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
                        {/* Action Buttons Row */}
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              router.push(
                                AdminRoutes.employersView(company.id),
                              );
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            <span className="text-xs">View</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              router.push(
                                AdminRoutes.employersEdit(company.id),
                              );
                            }}
                            onMouseEnter={() => {
                              // Prefetch the edit page on hover for instant navigation
                              router.prefetch(
                                AdminRoutes.employersEdit(company.id),
                              );
                            }}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            <span className="text-xs">Edit</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <ResultsCount
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
