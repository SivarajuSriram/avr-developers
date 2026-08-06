"use client";

import { usePathname } from "next/navigation";
import { Faq } from "@/components/sections/faq";

/** Renders the FAQ inside the footer, homepage only. */
export function FooterFaq() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <Faq />;
}
