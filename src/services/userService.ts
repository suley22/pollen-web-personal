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
  

