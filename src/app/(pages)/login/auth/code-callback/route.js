import { JobSeekerRoutes } from "@/app/(pages)/(portal)/(job-seeker)/router";
import { AdminRoutes } from "@/app/(pages)/(portal)/admin/router";
import { createClient } from "@/lib/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Get user data to determine role-based redirect
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!userError && user) {
        // Get user metadata to determine role
        const metadata = user.user_metadata || {};
        const role = metadata.role || "job_seeker"; // default to job_seeker

        // Determine redirect URL based on role
        let redirectUrl;
        if (role === "admin") {
          redirectUrl = AdminRoutes.home;
        } else {
          redirectUrl = JobSeekerRoutes.home;
        }

        // Use "next" param if provided, otherwise use role-based redirect
        const next = searchParams.get("next") ?? redirectUrl;

        console.log(
          `🔄 Auth callback - User: ${user.email}, Role: ${role}, Redirecting to: ${next}`,
        );

        // Handle different environments
        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";

        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      }
    }

    console.error("🔴 Auth callback error:", error);
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/`);
}
