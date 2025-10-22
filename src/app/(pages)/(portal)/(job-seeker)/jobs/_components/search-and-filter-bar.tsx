import { useState } from "react";
import { Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SimpleFilter } from "./filters";

export function SearchAndFilterBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search companies, industries, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            options={[
              { value: "all", label: "All Jobs" },
              { value: "external", label: "External Jobs" },
              { value: "pollen", label: "Pollen Approved" },
            ]}
            placeholder="Job Type"
            value={jobTypeFilter}
            onValueChange={setJobTypeFilter}
            className="w-[180px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
