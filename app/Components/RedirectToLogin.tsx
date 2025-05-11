"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RedirectToLogin() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.push(`/user/auth?redirect=${encodeURIComponent(pathname)}`);
  }, [pathname, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg">Redirecting to login...</p>
      </div>
    </div>
  );
}