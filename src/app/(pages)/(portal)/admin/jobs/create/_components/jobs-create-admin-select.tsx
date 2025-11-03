"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useSearchAdmins } from "../../_services/jobs-page-service";

export function AdminSearchSelect({
  initialUserId = null,
  initialAdminName = "",
  onValueChange,
}) {
  const [searchTerm, setSearchTerm] = useState(initialAdminName);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState(initialUserId);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Update state when initial values change (important for edit mode)
  useEffect(() => {
    if (initialUserId && initialAdminName) {
      setUserId(initialUserId);
      setSearchTerm(initialAdminName);
    }
  }, [initialUserId, initialAdminName]);

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
    if (userId) {
      setUserId(null);
      if (onValueChange) {
        onValueChange("");
      }
    }
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
    // Clear the search term to show all admins when focusing
    if (searchTerm === initialAdminName) {
      setSearchTerm("");
    }
  };

  const handleAdminSelect = (admin) => {
    const fullName = `${admin.first_name} ${admin.last_name}`;
    setUserId(admin.id);
    setSearchTerm(fullName);
    setShowDropdown(false);

    if (onValueChange) {
      onValueChange(admin.id);
    }

    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-col space-y-2 relative">
      {/* Hidden input for form submission */}
      <input type="hidden" name="user_id" value={userId || ""} />

      <Label htmlFor="adminName">Assigned Admin</Label>
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search and select admin..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
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
    </div>
  );
}
