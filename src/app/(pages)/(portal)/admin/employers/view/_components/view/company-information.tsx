"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, MapPin, Globe, Edit } from "lucide-react";

export function CompanyInformation({
  company,
  isEditing,
  editData,
  onInputChange,
}) {
  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="h-5 w-5" />
          <span>Company Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Company Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {company.logo || editData?.logo ? (
              <img
                src={editData?.logo || company.logo}
                alt={`${company.company_name} logo`}
                className="h-24 w-24 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() =>
                  isEditing && document.getElementById("logo-upload")?.click()
                }
              />
            ) : (
              <div
                className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                onClick={() =>
                  isEditing && document.getElementById("logo-upload")?.click()
                }
              >
                <Building2 className="h-12 w-12 text-gray-500" />
              </div>
            )}
            {isEditing && (
              <>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result;
                        onInputChange("logo", result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1.5 text-xs">
                  <Edit className="h-4 w-4" />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Industry
            </Label>
            {isEditing ? (
              <Input
                type="text"
                value={editData?.industries?.[0] || ""}
                onChange={(e) => onInputChange("industries", [e.target.value])}
                className="mt-1"
              />
            ) : (
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="secondary">
                  {Array.isArray(company.industries)
                    ? company.industries.join(", ")
                    : company.industries || "Not specified"}
                </Badge>
              </div>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Company Size
            </Label>
            {isEditing ? (
              <Select
                value={editData?.size || ""}
                onValueChange={(value) => onInputChange("size", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem className="" value="1-10">
                    1-10 employees
                  </SelectItem>
                  <SelectItem className="" value="11-50">
                    11-50 employees
                  </SelectItem>
                  <SelectItem className="" value="51-200">
                    51-200 employees
                  </SelectItem>
                  <SelectItem className="" value="201-500">
                    201-500 employees
                  </SelectItem>
                  <SelectItem className="" value="501-1000">
                    501-1000 employees
                  </SelectItem>
                  <SelectItem className="" value="1000+">
                    1000+ employees
                  </SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="mt-1">{company.size || "Not specified"}</p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Location
            </Label>
            {isEditing ? (
              <Input
                type="text"
                value={editData?.location || ""}
                onChange={(e) => onInputChange("location", e.target.value)}
                className="mt-1"
              />
            ) : (
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{company.location || "Not specified"}</span>
              </div>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Founded
            </Label>
            {isEditing ? (
              <Input
                type="number"
                value={editData?.foundedYear || ""}
                onChange={(e) => onInputChange("foundedYear", e.target.value)}
                placeholder="e.g. 2018"
                className="mt-1"
              />
            ) : (
              <p className="mt-1">{company.foundedYear || "Not specified"}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label className="text-sm font-medium text-muted-foreground">
              Website
            </Label>
            {isEditing ? (
              <Input
                type="url"
                value={editData?.website || ""}
                onChange={(e) => onInputChange("website", e.target.value)}
                placeholder="https://company.com"
                className="mt-1"
              />
            ) : company.website ? (
              <div className="flex items-center space-x-1 mt-1">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {company.website}
                </a>
              </div>
            ) : (
              <p className="mt-1 text-muted-foreground">Not specified</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
