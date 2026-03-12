import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect account routes — check for session cookie
  if (pathname.startsWith("/account") || pathname.startsWith("/admin")) {
    const session = request.cookies.get("b2b_session");
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
