"use client";

import type React from "react";
import { useEffect, useState } from "react";

export function SupressHydrationWarning({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : null;
}
