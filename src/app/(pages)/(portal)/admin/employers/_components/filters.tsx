"use client";

import { Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/design-system";

export function Filters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
}) {
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
          <div className="flex gap-2 items-center">
            <Select
              id="filter-by-status"
              name="filter-by-status"
              placeholder="Select company size"
              onValueChange={setSelectedStatus}
              defaultValue={selectedStatus}
              options={[
                { label: "All Statuses", value: "all" },
                { label: "Approved", value: "approved" },
                { label: "Pending", value: "pending" },
                { label: "Rejected", value: "rejected" },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
