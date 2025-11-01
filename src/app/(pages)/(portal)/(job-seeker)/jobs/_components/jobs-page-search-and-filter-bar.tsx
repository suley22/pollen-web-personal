import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SimpleFilter } from "./jobs-page-filters";

export function SearchAndFilterBar({
  searchTerm,
  onSearchChange,
  jobTypeFilter,
  onJobTypeChange,
  jobIndustriesFilter,
  onIndustriesChange,
  jobLocationsFilter,
  onLocationsChange,
  jobContractTypesFilter,
  onContractTypesChange,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const industries = [
    { value: "all", label: "All Industries" },
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "design", label: "Design" },
    { value: "engineering", label: "Engineering" },
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "london", label: "London" },
    { value: "manchester", label: "Manchester" },
    { value: "birmingham", label: "Birmingham" },
    { value: "edinburgh", label: "Edinburgh" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "glasgow", label: "Glasgow" },
    { value: "bristol", label: "Bristol" },
  ];

  const jobType = [
    { value: "all", label: "All Jobs" },
    { value: "external", label: "External Jobs" },
    { value: "pollen", label: "Pollen Approved" },
  ];

  const employmentType = [
    { value: "all", label: "All Contract Types" },
    { value: "full-time", label: "Full-Time" },
    { value: "part-time", label: "Part-Time" },
    { value: "contract", label: "Contract" },
    { value: "temporary", label: "Temporary" },
    { value: "internship", label: "Internship" },
  ];

  const handleClearSearch = () => {
    onSearchChange("");
  };

  const handleClearFilters = () => {
    onSearchChange("");
    onJobTypeChange("all");
    onIndustriesChange("all");
    onLocationsChange("all");
    onContractTypesChange("all");
  };

  return (
    <div className="w-full gap-2 flex flex-col">
      <div className="flex items-center gap-2 bg-white rounded-xl border p-2 ">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search companies, industries, or locations..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <SimpleFilter
          options={jobType}
          placeholder="Job Type"
          value={jobTypeFilter}
          onValueChange={onJobTypeChange}
          className="w-[180px]"
        />

        <Button
          variant={isExpanded ? "default" : "outline"}
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Sección expandible */}
      {isExpanded && (
        <div className="animate-in slide-in-from-top-2 duration-200 rounded-lg border bg-card pb-4 pt-2 px-4">
          <div className="flex items-end justify-between ">
            <div className="text-sm">Aditional Filters</div>
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className=" text-xs p-1"
              >
                <X className="mr-1 h-2 w-2" />
                Clear all filters
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Industry
              </label>
              <SimpleFilter
                options={industries}
                placeholder="Select industry"
                value={jobIndustriesFilter}
                onValueChange={onIndustriesChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Location
              </label>
              <SimpleFilter
                options={locations}
                placeholder="Select location"
                value={jobLocationsFilter}
                onValueChange={onLocationsChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Contract Type
              </label>
              <SimpleFilter
                options={employmentType}
                placeholder="Select contract type"
                value={jobContractTypesFilter}
                onValueChange={onContractTypesChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
