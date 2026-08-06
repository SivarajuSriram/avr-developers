"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { scrollToTop } from "@/lib/scroll";

/** White AVR wordmark for the dark footer. Links home + scrolls to top. */
export function FooterLogo() {
  const isHome = usePathname() === "/";
  return (
    <Link
      href="/"
      onClick={isHome ? scrollToTop : undefined}
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
