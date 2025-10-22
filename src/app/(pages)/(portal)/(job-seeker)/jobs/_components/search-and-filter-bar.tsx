import { Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SimpleFilter } from "./filters";

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

  return (
    <Card className="w-full">
      <CardContent className="p-2">
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-2">
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                className="absolute right-1 top-1 h-7 w-7 p-0 hover:bg-muted"
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
            className="w-full"
          />
          <SimpleFilter
            options={industries}
            placeholder="Industry"
            value={jobIndustriesFilter}
            onValueChange={onIndustriesChange}
            className="w-full"
          />
          <SimpleFilter
            options={locations}
            placeholder="Location"
            value={jobLocationsFilter}
            onValueChange={onLocationsChange}
            className="w-full"
          />
          <SimpleFilter
            options={employmentType}
            placeholder="Contract Type"
            value={jobContractTypesFilter}
            onValueChange={onContractTypesChange}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
