"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/buttons/button";
import { Plus, ArrowLeft, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Building2, CheckCircle, Clock } from "lucide-react";
import { useEmployerManagement } from "./useEmployerManagement";
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
  EyeOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function AdminEmployersManagment() {
  const router = useRouter();
  const { form } = useEmployerManagement();
  const companies = form.employers;

  const [companyToDelete, setCompanyToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteClick = (company, e) => {
    e.stopPropagation();
    setCompanyToDelete(company);
    setDeleteDialogOpen(true);
  };

  const handleSetLive = (company) => {
    const updatedCompany = { ...company, status: "live" };
    updateCompanyMutation.mutate(updatedCompany);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      live: { label: "Live", variant: "default", icon: CheckCircle },
      draft: { label: "Draft", variant: "secondary", icon: Clock },
      hidden: { label: "Hidden", variant: "outline", icon: EyeOff },
    };

    const config = statusConfig[status];
    if (!config) return <Badge variant="secondary">Unknown</Badge>;

    const Icon = config.icon;

    return (
      <Badge
        variant={config.variant}
        className={`flex items-center gap-1 ${
          status === "hidden"
            ? "bg-orange-50 text-orange-700 border-orange-200"
            : ""
        }`}
      >
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <Button
          // TODO: implementar navegación a creación de perfil
          // onClick={() => router.push("/admin/company-profiles/create")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Company Profile
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies, industries, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="live">Live</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Companies
                </p>
                <p className="text-2xl font-bold">{companies.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Live
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {companies.filter((c) => c.status === "live").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Draft
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {companies.filter((c) => c.status === "draft").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies List */}
      <div className="space-y-4">
        {filteredCompanies.map((company) => (
          <Card
            key={company.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push(`/admin/company-profiles/${company.id}`)}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={company.logo} alt={company.companyName} />
                    <AvatarFallback>
                      <Building2 className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{company.name}</h3>
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
                        {company.companySize}
                      </span>
                      <span className="flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        {company.location}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {company.contactEmail}
                      </span>
                      {company.contactPhone && (
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {company.contactPhone}
                        </span>
                      )}
                    </div>

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
                          {company.liveJobsCount} Live Jobs
                        </Badge>
                      )}
                      {(company.draftJobsCount || 0) > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-orange-50 text-orange-700 border-orange-200"
                        >
                          {company.draftJobsCount} Draft Jobs
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Set Live button for draft companies only */}
                  {company.status === "draft" && (
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
                      Updated{" "}
                      {new Date(company.lastUpdated).toLocaleDateString()}
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
                          router.push(`/admin/company-profiles/${company.id}`);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
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
    </div>
  );
}
