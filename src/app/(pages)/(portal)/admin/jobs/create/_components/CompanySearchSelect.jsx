"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { getEmployerProfiles } from "../../actions";

export function CompanySearchSelect({ value, onValueChange, name }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Fetch companies on mount and when search term changes
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const result = await getEmployerProfiles(searchTerm);
      if (result.success) {
        setCompanies(result.data);
      }
      setLoading(false);
    };

    fetchCompanies();
  }, [searchTerm]);

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
    onValueChange(newValue);
    setShowDropdown(true);
  };

  const handleCompanySelect = (companyName) => {
    onValueChange(companyName);
    setSearchTerm("");
    setShowDropdown(false);
    inputRef.current?.blur();
  };

  const filteredCompanies = companies.filter((company) =>
    company.company_name
      .toLowerCase()
      .includes((value || searchTerm).toLowerCase()),
  );

  return (
    <div className="flex flex-col space-y-2 relative">
      <Label htmlFor="companyName">Company Name</Label>
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search and select company..."
            value={value || searchTerm}
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
            {loading ? (
              <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
            ) : filteredCompanies.length > 0 ? (
              <ul className="py-1">
                {filteredCompanies.map((company) => (
                  <li
                    key={company.id}
                    onClick={() => handleCompanySelect(company.company_name)}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {company.company_name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                {searchTerm || value
                  ? "No companies found"
                  : "Start typing to search companies"}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
