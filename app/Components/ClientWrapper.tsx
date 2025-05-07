"use client";

import { useEffect } from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const res = await originalFetch(...args);

      if (res.status === 401) {
        localStorage.setItem("authError", "Your session has expired. Please log in again.");

        localStorage.removeItem("token");

        window.location.href = "/";
      }

      return res;
    };
  }, []);

  return <>{children}</>;
}
