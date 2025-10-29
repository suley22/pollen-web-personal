"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { getLoggedInUserId } from "@/services/userService";

const supabase = createClient();

const homeQueryKey = "home";

export interface HomeFilters {
  status?: string;
  searchTerm?: string;
}

/**
 * Hook to fetch jobs assigned to the current admin user
 */
export function useAssignedJobs(filters: HomeFilters) {
  return useQuery({
    queryKey: [homeQueryKey, "assigned-jobs", filters],
    queryFn: async () => {
      try {
        // Get the current logged-in user ID
        const userId = await getLoggedInUserId();

        if (!userId) {
          throw new Error("User not authenticated");
        }

        // Build the query to get jobs
        let query = supabase
          .from("job")
          .select(
            `
            *,
            employer_profile:company_id (
              company_name,
              logo_url
            )
          `,
          )
          .filter("deleted_at", "is", null)
          .order("created_at", { ascending: false })
          .limit(6); // Limit to 6 most recent jobs for home page

        // Apply status filter
        if (filters.status && filters.status !== "all") {
          query = query.eq("status", filters.status);
        }

        // Apply search filter
        if (filters.searchTerm) {
          query = query.or(
            `job_title.ilike.%${filters.searchTerm}%,company_name.ilike.%${filters.searchTerm}%`,
          );
        }

        const { data, error } = await query;

        if (error) {
          throw new Error(error.message);
        }

        // Normalize jobs data
        const normalizedJobs =
          data?.map((job) => ({
            ...job,
            assigned_date: job.published_at || job.created_at,
            total_applications: job.total_applications || 0,
            newApplicationsToReview: job.new_applications_to_review || 0,
            pollenInterviewsBooked: job.pollen_interviews_booked || 0,
            needsApproval: job.needs_approval || false,
            company_name:
              job.employer_profile?.company_name ||
              job.company_name ||
              "Unknown Company",
            company_logo_url: job.employer_profile?.logo_url || null,
            responsibilities: job.responsibilities || [],
            who_would_love: job.who_would_love || [],
            interviewsScheduled: job.interviews_scheduled || 0,
            offersExtended: job.offers_extended || 0,
            hiresMade: job.hires_made || 0,
          })) || [];

        return normalizedJobs;
      } catch (error) {
        console.error("❌ Error fetching assigned jobs:", error);
        throw error;
      }
    },
  });
}
