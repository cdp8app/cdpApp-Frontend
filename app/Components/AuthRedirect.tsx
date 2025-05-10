"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function AuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth_token");
    const redirect = searchParams.get("redirect");

    if (token) {
      // If authenticated and on login page, redirect to dashboard
      if (pathname === "/user/auth/login") {
        router.push(redirect || "/student/dashboard");
      }
    } else {
      // If not authenticated and not on login page, redirect to login
      if (pathname !== "/user/auth/login" && !isPublicRoute(pathname)) {
        router.push(`/user/auth/login?redirect=${encodeURIComponent(pathname)}`);
      }
    }

    setIsChecking(false);
  }, [pathname, router, searchParams]);

  if (isChecking) {
    return null;
  }

  return null;
}

// Helper function to check if a route is public
function isPublicRoute(pathname: string) {
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
  ];

  return publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}
