"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchUsers } from "@/services/userService";
import { cn } from "@/lib/utils";

interface UserSelectorProps {
  value?: string;
  onValueChange: (userId: string) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
}

export function UserSelector({
  value,
  onValueChange,
  placeholder = "Search users...",
  emptyText = "No users found.",
  disabled = false,
  className,
}: UserSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Fetch users with debounced search
  const { data: users = [], isLoading } = useSearchUsers({
    searchTerm: debouncedSearchTerm,
  });

  // Find selected user
  const selectedUser = users.find((user: any) => user.id === value);

  const handleUserSelect = (userId: string) => {
    onValueChange(userId);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    onValueChange("");
    setSearchTerm("");
  };

  return (
    <div className={cn("relative", className)}>
      {/* Selected User Display or Search Input */}
      {value && selectedUser ? (
        <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={selectedUser.avatar_url}
              alt={selectedUser.full_name}
            />
            <AvatarFallback className="text-xs">
              {selectedUser.full_name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="flex-1 truncate text-sm">
            {selectedUser.full_name}
          </span>
          {!disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="pl-10"
            disabled={disabled}
          />
        </div>
      )}

      {/* Dropdown List */}
      {isOpen && !value && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Results Card */}
          <Card className="absolute z-20 mt-2 w-full max-h-[300px] overflow-auto">
            <CardContent className="p-2">
              {isLoading && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Loading users...
                </div>
              )}

              {!isLoading && users.length === 0 && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {emptyText}
                </div>
              )}

              {!isLoading && users.length > 0 && (
                <div className="space-y-1">
                  {users.map((user: any) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleUserSelect(user.id)}
                      className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-accent transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          className="h-8 w-8"
                          src={user.avatar_url}
                          alt={user.full_name}
                        />
                        <AvatarFallback className="text-sm">
                          {user.full_name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {user.full_name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
