"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { ArrowUp } from "@phosphor-icons/react";

const SHOW_AFTER = 480;

/** Floating bottom-corner button that appears once the page has scrolled
 * a bit, and jumps back to the top on click. Rendered once in the root
 * layout so it's present on every route.
 *
 * Also fades out while the footer's social row (#footer-socials) is on
 * screen — both sit in the same bottom-right corner, so without this the
 * button covers the YouTube/Instagram/X icons at the very bottom of the
 * page. Pages without a footer (thank-you, 404) just never find the
 * element, so the button behaves as if this check weren't there. */
export function ScrollToTopButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const reduce = useReducedMotion();

  // Route changed: a leftover `overFooter=true` from the previous page's
  // footer shouldn't survive into a page that has no footer at all.
  const [trackedPathname, setTrackedPathname] = useState(pathname);
  if (pathname !== trackedPathname) {
    setTrackedPathname(pathname);
    setOverFooter(false);
  }

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("footer-socials");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setOverFooter(entry.isIntersecting), {
      rootMargin: "0px 0px -16px 0px",
    });
    io.observe(target);
    return () => io.disconnect();
  }, [pathname]);

  const show = visible && !overFooter;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" })}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-6 right-5 z-40 grid size-11 place-items-center rounded-full bg-ink text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 lg:bottom-8 lg:right-8 lg:hover:bg-accent ${
        show ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp size={18} weight="bold" />
    </button>
  );
}
