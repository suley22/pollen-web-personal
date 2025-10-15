import { createClient } from "@/lib/utils/supabase/server";
import { DashboardStats } from "@/types/dashboard-stats";

export class StatsService {
  private supabase: any;

  constructor(supabase: any) {
    this.supabase = supabase;
  }

  /**
   * Fetches total count from job_seekers table
   */
  private async getTotalCommunityMembers(): Promise<number> {
    try {
      const { count, error } = await this.supabase
        .from("job_seekers")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Error fetching total community members:", error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error("Unexpected error fetching community members:", error);
      return 0;
    }
  }

  /**
   * Fetches count of new signups today from job_seekers table
   */
  private async getNewSignupsToday(): Promise<number> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      const { count, error } = await this.supabase
        .from("job_seekers")
        .select("*", { count: "exact", head: true })
        .gte("created_at", todayISO);

      if (error) {
        console.error("Error fetching new signups today:", error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error("Unexpected error fetching new signups:", error);
      return 0;
    }
  }

  /**
   * Fetches total count from employer_profile table
   */
  private async getTotalEmployers(): Promise<number> {
    try {
      const { count, error } = await this.supabase
        .from("employer_profile")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Error fetching total employers:", error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error("Unexpected error fetching employers:", error);
      return 0;
    }
  }

  /**
   * Fetches count of employers requiring approval
   * Assuming there's a status field for approval
   */
  private async getNewEmployersRequiringApproval(): Promise<number> {
    try {
      const { count, error } = await this.supabase
        .from("employer_profile")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      if (error) {
        console.error("Error fetching employers requiring approval:", error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error("Unexpected error fetching pending employers:", error);
      return 0;
    }
  }

  /**
   * Fetches total count of all jobs from job table
   */
  private async getLiveJobs(): Promise<number> {
    try {
      const { count, error } = await this.supabase
        .from("job")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Error fetching total jobs:", error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error("Unexpected error fetching total jobs:", error);
      return 0;
    }
  }

  /**
   * Fetches count of pending job approvals from job table
   */
  private async getPendingJobApprovals(): Promise<number> {
    try {
      const { count, error } = await this.supabase
        .from("job")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      if (error) {
        console.error("Error fetching pending job approvals:", error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error("Unexpected error fetching pending jobs:", error);
      return 0;
    }
  }

  /**
   * Fetches all dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const [
        totalCommunityMembers,
        newSignupsToday,
        totalEmployers,
        newEmployersRequiringApproval,
        liveJobs,
        pendingJobApprovals,
      ] = await Promise.all([
        this.getTotalCommunityMembers(),
        this.getNewSignupsToday(),
        this.getTotalEmployers(),
        this.getNewEmployersRequiringApproval(),
        this.getLiveJobs(),
        this.getPendingJobApprovals(),
      ]);

      return {
        totalCommunityMembers,
        newSignupsToday,
        totalEmployers,
        newEmployersRequiringApproval,
        liveJobs,
        pendingJobApprovals,
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      // Return default values on error
      return {
        totalCommunityMembers: 0,
        newSignupsToday: 0,
        totalEmployers: 0,
        newEmployersRequiringApproval: 0,
        liveJobs: 0,
        pendingJobApprovals: 0,
      };
    }
  }
}

/**
 * Factory function to create StatsService instance
 */
export async function createStatsService() {
  const supabase = await createClient();
  return new StatsService(supabase);
}
