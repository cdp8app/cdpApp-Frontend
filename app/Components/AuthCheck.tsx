"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthCheck() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth_token");

    // If not authenticated and not on a public route, redirect to login
    if (!token && !isPublicRoute(pathname)) {
      router.push(`/user/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router]);

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
  ];

  return publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}
