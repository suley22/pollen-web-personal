"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const getLoggedInUserId = async () => {
  try {
    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user?.id || null;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};

export interface UserFilters {
  searchTerm?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  raw_user_meta_data: {
    full_name?: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    email?: string;
    role?: string;
  };
  created_at: string;
}

/**
 * Hook to search users with filters
 * Supports search by full name, first name, or last name from metadata
 */
export function useSearchUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: ["users", "search", filters],
    queryFn: async () => {
      // Get current user to exclude from results
      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !currentUser) {
        throw new Error("User not authenticated");
      }

      // Build query
      let query = supabase
        .from("profile")
        .select("id, email, raw_user_meta_data, created_at")
        .neq("id", currentUser.id)
        .order("created_at", { ascending: false });

      // Apply search filter if provided
      if (filters?.searchTerm && filters.searchTerm.trim()) {
        const searchTerm = filters.searchTerm.trim();
        // Search in metadata fields
        query = query.or(
          `raw_user_meta_data->>full_name.ilike.%${searchTerm}%,raw_user_meta_data->>first_name.ilike.%${searchTerm}%,raw_user_meta_data->>last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`,
        );
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      // Transform data to include full_name at root level for easier access
      const users = (data || []).map((user: any) => ({
        ...user,
        full_name:
          user.raw_user_meta_data?.full_name ||
          `${user.raw_user_meta_data?.first_name || ""} ${user.raw_user_meta_data?.last_name || ""}`.trim() ||
          user.email,
        avatar_url: user.raw_user_meta_data?.avatar_url || null,
        role: user.raw_user_meta_data?.role || "user",
      }));

      return users;
    },
    enabled: filters?.searchTerm ? filters.searchTerm.trim().length > 0 : true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
