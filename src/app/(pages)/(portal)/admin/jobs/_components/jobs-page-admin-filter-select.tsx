"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useSearchAdmins } from "../_services/jobs-page-service";

export function AdminFilterSelect({ value, onValueChange, placeholder = "Filter by admin..." }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Use React Query hook for fetching admins
  const { data: admins = [], isLoading } = useSearchAdmins(debouncedSearchTerm);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
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
    if (selectedAdmin) {
      setSelectedAdmin(null);
      if (onValueChange) {
        onValueChange("all");
      }
    }
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleAdminSelect = (admin) => {
    const fullName = `${admin.first_name} ${admin.last_name}`;
    setSelectedAdmin({ id: admin.id, name: fullName });
    setSearchTerm(fullName);
    setShowDropdown(false);

    if (onValueChange) {
      onValueChange(admin.id);
    }

    inputRef.current?.blur();
  };

  const handleClear = () => {
    setSelectedAdmin(null);
    setSearchTerm("");
    if (onValueChange) {
      onValueChange("all");
    }
  };

  const displayValue = selectedAdmin ? selectedAdmin.name : searchTerm;

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="pl-10 pr-10"
        />
        {selectedAdmin && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {isLoading ? (
            <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
          ) : admins.length > 0 ? (
            <ul className="py-1">
              {admins.map((admin) => (
                <li
                  key={admin.id}
                  onClick={() => handleAdminSelect(admin)}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {admin.first_name} {admin.last_name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              {searchTerm
                ? "No admins found"
                : "Start typing to search admins"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
