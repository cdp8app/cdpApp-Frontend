import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define public routes that don't require authentication
const publicRoutes = [
  "/user/auth/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/activate",
  "/resend-activation",
  "/registration-success",
  "/user/auth/verify-otp",
  "/user/auth/register/successful",
  "/user/auth/register/successful/onboarding",
]

// Define API routes that don't require authentication
const publicApiRoutes = [
  "/api/proxy/csrf-token",
  "/api/proxy/csrf-cookie",
  "/api/proxy/user/auth",
  "/api/proxy/user/register",
  "/api/proxy/user/activate",
  "/api/proxy/user/resend-activation",
  "/api/status",
  "/api/test-connection",
  "/api/discover-api",
]

export function middleware(request: NextRequest) {
  // Only apply to /api/proxy routes
  if (request.nextUrl.pathname.startsWith("/api/proxy")) {
    console.log(`API Proxy Request: ${request.method} ${request.nextUrl.pathname}`)

    // You can add authentication checks here if needed

    // Continue with the request
    return NextResponse.next()
  }

  // Skip auth check for public routes
  if (
    publicRoutes.some((route) => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + "/"))
  ) {
    return NextResponse.next()
  }

  // Skip auth check for static files and API routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api/") ||
    request.nextUrl.pathname.includes(".") // Static files like .jpg, .css, etc.
  ) {
    return NextResponse.next()
  }

  // Check for authentication token for protected routes
  const authToken = request.cookies.get("auth_token")?.value

  // If no token and not a public route, redirect to login
  if (!authToken) {
    console.log(`Redirecting unauthenticated request from ${request.nextUrl.pathname} to /user/auth/login`)
    const url = new URL("/user/auth/login", request.url)
    url.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Continue with authenticated request
  return NextResponse.next()
}

export const config = {
  matcher: "/api/proxy/:path*",
}
