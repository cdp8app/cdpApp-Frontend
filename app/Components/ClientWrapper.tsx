"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      try {
        const res = await originalFetch(...args);
        
        // Only handle redirects for API requests to avoid redirect loops
        if (res.status === 401 && args[0] && typeof args[0] === "string" && args[0].includes("/api/proxy/")) {
          console.log("Authentication required for API request:", args[0]);
          
          // Store the current URL to redirect back after login
          const currentPath = window.location.pathname;
          if (!currentPath.includes("/user/auth")) {
            // Store the current path for redirect after login
            localStorage.setItem("redirectAfterLogin", currentPath);
            
            // Redirect to login page with redirect parameter
            router.push(`/user/auth?redirect=${encodeURIComponent(currentPath)}`);
          }
        }
        
        return res;
      } catch (error) {
        console.error("Fetch error:", error);
        return originalFetch(...args);
      }
    };

    // Cleanup function to restore original fetch
    return () => {
      window.fetch = originalFetch;
    };
  }, [router]);

  return <>{children}</>;
}