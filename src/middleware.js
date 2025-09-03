import { NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const publicRoutes = ["/auth/confirm","/login", "/auth", "/error", "/"];

export async function middleware(request) {
  const { response, user } = await updateSession(request, true);

  if (
    !user &&
    !publicRoutes.includes(request.nextUrl.pathname)
  ) {
    // TODO: Agregar el redirect url
    const url = request.nextUrl.clone();
    url.pathname = "/";

    return NextResponse.redirect(url);
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
