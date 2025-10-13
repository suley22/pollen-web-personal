import { NextResponse } from "next/server";
import { updateSession } from "@/lib/utils/supabase/middleware";
import { LoginRoutes } from "./app/(pages)/(public)/login/router";
import { ADMIN_ROUTES, AdminRoutes } from "./app/(pages)/(portal)/admin/router";
import { JOB_SEEKER_ROUTES, JobSeekerRoutes } from "@/job-seeker/router";
import { PUBLIC_ROUTES } from "@/public/router";

// Helper function to check if route requires specific role
function isAdminRoute(pathname) {
  return ADMIN_ROUTES.some((route) => pathname == route);
}

function isJobSeekerRoute(pathname) {
  return JOB_SEEKER_ROUTES.some((route) => pathname == route);
}

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Allow access to public routes
  if (PUBLIC_ROUTES.some((route) => pathname == route)) {
    return NextResponse.next();
  }

  const { response, user } = await updateSession(request, true);

  // Redirect to login if user is not authenticated
  if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    console.log(`🔐 Unauthenticated access attempt to: ${pathname}`);
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Check if user needs to complete profile setup
  if (user && !user.user_metadata.register_profile_completed) {
    if (pathname !== LoginRoutes.userInfo) {
      console.log(`📝 Redirecting ${user.email} to complete profile setup`);
      const url = request.nextUrl.clone();
      url.pathname = LoginRoutes.userInfo;
      return NextResponse.redirect(url);
    }
  }

  // Role-based access control
  if (user) {
    const userRole = user.user_metadata?.role || "job_seeker";

    // Check admin route access
    if (isAdminRoute(pathname)) {
      if (userRole !== "admin") {
        console.log(
          `🚫 Access denied - User: ${user.email} (role: ${userRole}) tried to access admin route: ${pathname}`,
        );
        const url = request.nextUrl.clone();
        url.pathname = userRole === "job_seeker" ? JobSeekerRoutes.home : "/";
        return NextResponse.redirect(url);
      } else {
        console.log(
          `✅ Admin access granted - User: ${user.email} accessing: ${pathname}`,
        );
      }
    }

    // Check job seeker route access - STRICT: Only job seekers can access these routes
    if (isJobSeekerRoute(pathname)) {
      if (userRole !== "job_seeker") {
        console.log(
          `🚫 Access denied - User: ${user.email} (role: ${userRole}) tried to access job seeker route: ${pathname}`,
        );
        const url = request.nextUrl.clone();
        url.pathname = userRole === "admin" ? AdminRoutes.home : "/";
        return NextResponse.redirect(url);
      } else {
        console.log(
          `✅ Job seeker access granted - User: ${user.email} accessing: ${pathname}`,
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
