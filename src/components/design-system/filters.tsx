"use client";

import { useState, useEffect } from "react";
import {
  Search,
  X,
  Filter as FilterIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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
  collapsible = false,
  defaultCollapsed = true,
  toggleButtonLabel = "Filters",
}: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(
    !collapsible || !defaultCollapsed,
  );

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

          {collapsible && (
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setShowFilters((v) => !v)}
            >
              <FilterIcon className="h-4 w-4 mr-2" />
              {toggleButtonLabel}
              {showFilters ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
          )}

          {/* Dynamic Filters (inline only when not collapsible) */}
          {!collapsible &&
            filters.map((filter) => (
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
        {collapsible && showFilters && (
          <div className="mt-2 flex flex-row gap-2 justify-between items-center">
            {filters.map((filter) => (
              <div key={filter.name} className="w-full">
                <Select
                  key={filter.name}
                  id={`filter-${filter.name}`}
                  name={`filter-${filter.name}`}
                  placeholder={filter.placeholder || "Select..."}
                  onValueChange={filter.onValueChange}
                  defaultValue={filter.defaultValue}
                  options={filter.options}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
