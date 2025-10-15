import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export interface FiltersProps {
  form: {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedAssignment: string;
    setSelectedAssignment: (value: string) => void;
    selectedStatus: string;
    setSelectedStatus: (value: string) => void;
  };
}

const Filters: React.FC<FiltersProps> = ({ form }) => (
  <div className="flex items-center space-x-4 mb-6">
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search jobs..."
        value={form.searchTerm}
        onChange={(e) => form.setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
    <select
      value={form.selectedAssignment}
      onChange={(e) => form.setSelectedAssignment(e.target.value)}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm"
    >
      <option value="all">All Jobs</option>
      <option value="mine">My Assigned Jobs</option>
      <option value="karen">Karen&apos;s Jobs</option>
      <option value="sophie">Sophie&apos;s Jobs</option>
    </select>
    <select
      value={form.selectedStatus}
      onChange={(e) => form.setSelectedStatus(e.target.value)}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm"
    >
      <option value="all">All Statuses</option>
      <option value="draft">In Draft</option>
      <option value="live">Live</option>
      <option value="paused">Paused</option>
      <option value="cancelled">Cancelled</option>
      <option value="complete">Complete</option>
    </select>
  </div>
);

export default Filters;
