import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Get access token from cookies (since it's stored on the server side)
  const accessToken = req.cookies.get("access_token")?.value;

  // If no access token, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

// Apply middleware only to /dashboard and its subroutes
export const config = {
  matcher: ["/dashboard/:path*"],
};
