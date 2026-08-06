"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Guarantees every route change lands at the top of the page. Skips when the
 * URL carries a hash so in-page anchor links still work.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
