import { NextResponse } from "next/server";
import { updateSession } from "@/lib/utils/supabase/middleware";
import { LoginRoutes } from "./app/(pages)/login/router";
import { AdminRoutes } from "./app/(pages)/(portal)/admin/router";
import { JobSeekerRoutes } from "./app/(pages)/(portal)/(job-seeker)/router";

const publicRoutes = [
  LoginRoutes.login,
  LoginRoutes.logout,
  LoginRoutes.forgotPassword,
  LoginRoutes.authConfirm,
  LoginRoutes.authResetPassword,
  LoginRoutes.authCodeCallback,
  "/error",
  "/",
];

// Define role-based route access
const adminRoutes = [
  "/admin",
  AdminRoutes.home,
  AdminRoutes.dashboard,
  AdminRoutes.applications,
  AdminRoutes.profile,
  "/admin/jobs-managment",
  "/admin/employers-managment",
  "/admin/all-job-seekers",
  "/admin/role-managment",
];

const jobSeekerRoutes = [
  JobSeekerRoutes.home,
  JobSeekerRoutes.dashboard,
  JobSeekerRoutes.applications,
  JobSeekerRoutes.profile,
  "/jobs",
  "/companies",
  "/community",
];

// Helper function to check if route requires specific role
function isAdminRoute(pathname) {
  return adminRoutes.some((route) => pathname.startsWith(route));
}

function isJobSeekerRoute(pathname) {
  return jobSeekerRoutes.some((route) => pathname.startsWith(route));
}

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Allow access to public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const { response, user } = await updateSession(request, true);

  // Redirect to login if user is not authenticated
  if (!user && !publicRoutes.includes(pathname)) {
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
