"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CaretDown, CaretRight, List, Phone, X } from "@phosphor-icons/react";
import { nav, site } from "@/lib/site";

/** Smooth-scroll to the top of the page (used by the logo + Home link). */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Real AVR logo. Two variants crossfade with the header state: the navy
   mark over the solid canvas bar, the white mark over the hero. */
function Wordmark({ solid, className = "" }: { solid: boolean; className?: string }) {
  return (
    <Link
      href="/"
      onClick={scrollToTop}
      aria-label="AVR Developers — home"
      className={`relative block h-9 w-[126px] transition-opacity duration-300 lg:hover:opacity-80 ${className}`}
    >
      <Image
        src="/logo-cropped.png"
        alt="AVR Developers"
        fill
        priority
        sizes="126px"
        className={`object-contain transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`}
      />
      <Image
        src="/logo-light.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="126px"
        className={`object-contain transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`}
      />
    </Link>
  );
}

type NavItem = {
  label: string;
  href: string;
  children?: readonly NavItem[];
};

/* Desktop top-level item: renders a controlled hover/focus flyout when it has
   children. Driven by state (not pure CSS :hover) so it can be force-closed the
   moment the route changes — otherwise a client-side navigation leaves the
   clicked link focused and the cursor over the panel, and the flyout never
   dismisses. */
function TopItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Any route change closes the flyout (covers clicking a child link, which
  // navigates without remounting the header).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={item.href === "/" ? scrollToTop : undefined}
        className="link-underline caps py-2 text-[12.5px] font-medium transition-colors lg:hover:text-accent"
      >
        {item.label}
      </Link>
    );
  }

  /* Drop the retained focus after a click so the flyout doesn't linger via
     :focus-within, then close immediately for a snappy feel. */
  const dismiss = () => {
    setOpen(false);
    if (typeof document !== "undefined") {
      (document.activeElement as HTMLElement | null)?.blur();
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        // Only close when focus leaves the whole item subtree.
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`caps inline-flex items-center gap-1 py-2 text-[12.5px] font-medium transition-colors ${
          open ? "text-accent" : ""
        }`}
      >
        {item.label}
        <CaretDown
          size={11}
          weight="bold"
          className={`translate-y-px transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* first-level panel */}
      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0"
        }`}
      >
        <ul className="min-w-[160px] rounded-md border border-line bg-surface p-2 text-ink shadow-[0_24px_60px_-24px_rgba(23,35,59,0.35)]">
          {item.children.map((child) => (
            <li key={child.label} className="group/sub relative">
              <Link
                href={child.href}
                onClick={dismiss}
                className="flex items-center justify-center gap-4 rounded-sm px-4 py-3 font-serif text-[15px] transition-colors lg:hover:bg-canvas lg:hover:text-accent group-focus-within/sub:bg-canvas text-center w-full"
              >
                {child.label}
                {child.children && (
                  <CaretRight size={13} weight="bold" className="opacity-50" />
                )}
              </Link>

              {/* second-level flyout, opens to the right */}
              {child.children && (
                <div className="invisible absolute left-full top-0 z-50 -translate-x-2 pl-2 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:translate-x-0 group-focus-within/sub:opacity-100">
                  <ul className="min-w-[230px] rounded-md border border-line bg-surface p-2 text-ink shadow-[0_24px_60px_-24px_rgba(23,35,59,0.35)]">
                    {child.children.map((leaf) => (
                      <li key={leaf.label}>
                        <Link
                          href={leaf.href}
                          onClick={dismiss}
                          className="block rounded-sm px-4 py-2.5 font-serif text-[14.5px] transition-colors lg:hover:bg-canvas lg:hover:text-accent"
                        >
                          {leaf.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Transparent over the hero, solid once it scrolls away. No scroll listener.
  // Re-runs on every route change because the header lives in the layout and
  // never remounts — otherwise it keeps observing the previous page's hero.
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setSolid(true);
      return;
    }
    setSolid(false);
    const io = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  // Lock body scroll while the mobile menu is open. Compensate with
  // padding-right for the width of the now-hidden scrollbar, otherwise the
  // page content reflows wider the instant the scrollbar disappears — a
  // visible jump/glitch on every scrollable page.
  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-line bg-canvas/85 text-ink backdrop-blur-md"
          : "border-b border-transparent bg-transparent text-white"
      }`}
    >
      <div className="mx-auto grid h-[72px] max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-5 lg:px-10">
        {/* left cluster */}
        <nav className="hidden items-center gap-8 justify-self-start lg:flex">
          {nav.left.map((item) => (
            <TopItem key={item.label} item={item} />
          ))}
        </nav>

        {/* mobile menu button (left on small screens) */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="-m-2.5 justify-self-start p-2.5 lg:hidden"
        >
          <List size={24} />
        </button>

        {/* centered logo */}
        <Wordmark solid={solid} className="justify-self-center" />

        {/* right cluster */}
        <nav className="hidden items-center gap-8 justify-self-end lg:flex">
          {nav.right.map((item) => (
            <TopItem key={item.label} item={item} />
          ))}
        </nav>

        {/* mobile call button (right on small screens) */}
        <a
          href={`tel:${site.phones[0].replace(/\s/g, "")}`}
          aria-label={`Call ${site.phones[0]}`}
          className="-m-2.5 justify-self-end p-2.5 lg:hidden"
        >
          <Phone size={22} />
        </a>
      </div>
    </header>

    {/* mobile overlay menu — rendered outside <header> so its position:fixed
        isn't trapped inside the header's containing block when backdrop-blur
        is active (backdrop-filter creates a new containing block for fixed
        descendants, which clipped this to the header's own height). */}
    <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items: NavItem[] = [...nav.left, ...nav.right];
  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-canvas text-ink transition-[transform,visibility] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
        open ? "visible translate-x-0" : "invisible translate-x-full"
      }`}
    >
      <div className="flex h-[72px] items-center justify-between px-5">
        <Link
          href="/"
          onClick={() => {
            scrollToTop();
            onClose();
          }}
          aria-label="AVR Developers — home"
          className="relative block h-9 w-[126px]"
        >
          <Image
            src="/logo-cropped.png"
            alt="AVR Developers"
            fill
            sizes="126px"
            className="object-contain"
          />
        </Link>
        <button onClick={onClose} aria-label="Close menu" className="-m-2.5 p-2.5">
          <X size={24} />
        </button>
      </div>
      <nav className="flex flex-col px-5 pt-6">
        {items.map((item) => (
          <MobileNavItem key={item.label} item={item} onClose={onClose} />
        ))}
      </nav>
    </div>
  );
}

/* Single row in the mobile overlay nav. Items with children become a tap
   accordion (chevron rotates, sub-list expands via a grid-rows tween) instead
   of a static, unclickable-looking label. */
function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!item.children) {
    return (
      <div>
        <Link
          href={item.href}
          onClick={() => {
            if (item.href === "/") scrollToTop();
            onClose();
          }}
          className="block py-4 font-serif text-2xl"
        >
          {item.label}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between py-4 font-serif text-2xl"
      >
        {item.label}
        <CaretDown
          size={18}
          weight="bold"
          className={`text-ink-40 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="overflow-hidden pl-4">
          {item.children.map((child) => (
            <li key={child.label} className="last:pb-4">
              <Link
                href={child.href}
                onClick={onClose}
                className="block py-2 font-serif text-xl text-ink-70"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
