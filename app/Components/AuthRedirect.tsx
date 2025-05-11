"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import RedirectToLogin from "./RedirectToLogin";

export default function AuthRedirect() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userType");
      
      // If we have a token and userType, consider the user authenticated
      if (token && userType) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  // If authentication status is still being determined, show nothing
  if (isAuthenticated === null) {
    return null;
  }

  // If not authenticated, redirect to login
  if (isAuthenticated === false) {
    return <RedirectToLogin />;
  }

  // If authenticated, render nothing (allow the children to render)
  return null;
}