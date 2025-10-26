"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useSearchEmployers } from "../../_services/jobs-page-service";

export function CompanySearchSelect({
  initialCompanyId = null,
  initialCompanyName = "",
  onValueChange,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [companyId, setCompanyId] = useState(initialCompanyId);
  const [companyName, setCompanyName] = useState(initialCompanyName);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Use React Query hook for fetching employers
  const { data: companies = [], isLoading } =
    useSearchEmployers(debouncedSearchTerm);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setShowDropdown(true);

    // Clear selection if user is typing
    if (companyId) {
      setCompanyId(null);
      setCompanyName("");
      if (onValueChange) {
        onValueChange("");
      }
    }
  };

  const handleCompanySelect = (company) => {
    setCompanyId(company.id);
    setCompanyName(company.company_name);
    setSearchTerm(company.company_name);
    setShowDropdown(false);

    if (onValueChange) {
      onValueChange(company.company_name);
    }

    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-col space-y-2 relative">
      {/* Hidden inputs for form submission */}
      <input type="hidden" name="company_id" value={companyId || ""} />
      <input type="hidden" name="company_name" value={companyName || ""} />

      <Label htmlFor="companyName">Company Name</Label>
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search and select company..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
            className="pl-10"
          />
        </div>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {isLoading ? (
              <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
            ) : companies.length > 0 ? (
              <ul className="py-1">
                {companies.map((company) => (
                  <li
                    key={company.id}
                    onClick={() => handleCompanySelect(company)}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {company.company_name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                {searchTerm
                  ? "No companies found"
                  : "Start typing to search companies"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
