"use client";

import { Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  form: any;
}

const Filters: React.FC<FiltersProps> = ({ form }) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedAssignment,
    setSelectedAssignment,
    selectedStatus,
    setSelectedStatus,
  } = form;

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Card className="flex flex-col w-full mb-6 ">
      <CardContent className="flex-col w-full p-6">
        <div className="flex flex-col w-full sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search jobs..."
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
              value={selectedAssignment}
              onValueChange={setSelectedAssignment}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by assignment" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="all" className="">
                  All Jobs
                </SelectItem>
                <SelectItem value="mine" className="">
                  My Assigned Jobs
                </SelectItem>
                <SelectItem value="karen" className="">
                  Karen&apos;s Jobs
                </SelectItem>
                <SelectItem value="sophie" className="">
                  Sophie&apos;s Jobs
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="all" className="">
                  All Statuses
                </SelectItem>
                <SelectItem value="draft" className="">
                  In Draft
                </SelectItem>
                <SelectItem value="live" className="">
                  Live
                </SelectItem>
                <SelectItem value="paused" className="">
                  Paused
                </SelectItem>
                <SelectItem value="cancelled" className="">
                  Cancelled
                </SelectItem>
                <SelectItem value="complete" className="">
                  Complete
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Filters;
