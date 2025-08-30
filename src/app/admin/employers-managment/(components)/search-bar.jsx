import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/ui/buttons/primary-button";

function SearchBar({ addButtonOnClick, filterFunction }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    filterFunction(searchTerm, selectedStatus);
  }, [searchTerm, selectedStatus]);

  return (
    <div className="px-4">
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="flex-grow relative bg-white">
          <Search
            className="absolute left-3 top-1/2 
            transform -translate-y-1/2 
            h-4 w-4 
            text-gray-400"
          />
          <Input
            placeholder="Search companies or industries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-grow">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="flex flex-grow justify-end items-center">
          <PrimaryButton text="Add +" onClick={addButtonOnClick} className="" />

          {/* <div className="h-4 w-4 bg-black">Algo</div> */}
        </div>
      </div>
    </div>
  );
}

export { SearchBar };
