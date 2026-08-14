"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "@phosphor-icons/react";

const CALL_NUMBER = "918889666678";

/** Floating bottom-corner call CTA. Rendered once in the root layout so it's
 * present on every route.
 *
 * Fades out while the footer's social row (#footer-socials) is on screen —
 * both sit in the same bottom-right corner, so without this the button
 * covers the YouTube/Instagram/X icons at the very bottom of the page.
 * Pages without a footer (thank-you, 404) just never find the element, so
 * the button behaves as if this check weren't there. */
export function CallButton() {
  const pathname = usePathname();
  const [overFooter, setOverFooter] = useState(false);

  // Route changed: a leftover `overFooter=true` from the previous page's
  // footer shouldn't survive into a page that has no footer at all.
  const [trackedPathname, setTrackedPathname] = useState(pathname);
  if (pathname !== trackedPathname) {
    setTrackedPathname(pathname);
    setOverFooter(false);
  }

  useEffect(() => {
    const target = document.getElementById("footer-socials");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setOverFooter(entry.isIntersecting), {
      rootMargin: "0px 0px -16px 0px",
    });
    io.observe(target);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <a
      href={`tel:+${CALL_NUMBER}`}
      aria-label="Call AVR Developers"
      tabIndex={overFooter ? -1 : 0}
      className={`group fixed bottom-8 right-8 z-40 hidden size-14 place-items-center rounded-full bg-accent text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] transition-[opacity,transform] duration-300 lg:grid lg:hover:bg-accent-dark ${
        overFooter ? "invisible translate-y-3 opacity-0" : "visible translate-y-0 opacity-100"
      }`}
    >
      <Phone size={26} weight="fill" className="lg:group-hover:[animation:phone-shake_0.5s_ease-in-out]" />
    </a>
  );
}
