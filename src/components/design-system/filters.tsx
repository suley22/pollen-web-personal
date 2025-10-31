"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/design-system";
import type { FiltersProps } from "@/types/filters";

export function Filters({
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  debounceMs = 500,
}: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(searchTerm.trim());
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearchChange, debounceMs]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Card className="w-full">
      <CardContent className="p-2">
        <div className="flex flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="flex flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
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

          {/* Dynamic Filters */}

          {filters.map((filter) => (
            <Select
              className="w-56"
              key={filter.name}
              id={`filter-${filter.name}`}
              name={`filter-${filter.name}`}
              placeholder={filter.placeholder || "Select..."}
              onValueChange={filter.onValueChange}
              defaultValue={filter.defaultValue}
              options={filter.options}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
