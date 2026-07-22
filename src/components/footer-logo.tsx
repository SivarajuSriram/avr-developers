"use client";

import Link from "next/link";
import Image from "next/image";

/** Smooth-scroll to the top of the page — mirrors the header logo behaviour. */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** White AVR wordmark for the dark footer. Links home + scrolls to top. */
export function FooterLogo() {
  return (
    <Link
      href="/"
      onClick={scrollToTop}
      aria-label="AVR Developers — home"
      className="relative block h-9 w-[126px] transition-opacity duration-300 lg:hover:opacity-80"
    >
      <Image
        src="/logo-light.png"
        alt="AVR Developers"
        fill
        sizes="126px"
        className="object-contain object-left"
      />
    </Link>
  );
}
