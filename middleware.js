// middleware.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function middleware(request) {
  // Define protected routes
  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  const path = request.nextUrl.pathname;

  // Check if the path is protected
  if (protectedPaths.some((prefix) => path.startsWith(prefix))) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // If no token exists, redirect to sign-in
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Verify token (optional additional check)
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // For non-protected routes, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
