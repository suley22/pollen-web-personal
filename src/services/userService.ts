import { createClient } from "@/lib/utils/supabase/server";

export class UserService {
  private supabase: any;

  constructor(supabase: any) {
    this.supabase = supabase;
  }

  async getLoggedInUserId() {

    try {

      // Get current user
      const {
        data: { user },
      } = await this.supabase.auth.getUser();

      return user?.id || null;

    } catch (error) {
      console.error("Upload error:", error);
      return null;
    } 
  };
  
}

/**
 * Factory function to create UserService    instance
 */
export async function createUserService() {
  const supabase = await createClient();
  return new UserService(supabase);
}
