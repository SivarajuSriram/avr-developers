"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

type Gsap = typeof import("gsap")["gsap"];
type GalleryItem = { view: string; src: string };

/* Fallback views for projects without real photography yet (e.g. Avira). */
const VIEWS = ["facade", "courtyard", "pool", "living", "club"] as const;

const AUTO_ADVANCE_DELAY = 3000;

/**
 * Full-bleed (120dvh) project gallery. Prev/next reveals the next frame over the
 * current with a slow, soft right-to-left curtain wipe (double-translate: the
 * outer frame slides in while the inner image counter-slides, so the picture
 * holds still). Transforms only — GPU-composited, no repaint. Reduced-motion
 * → instant swap.
 *
 * Auto-advances every AUTO_ADVANCE_DELAY once idle: the timer only starts
 * counting again once the previous wipe has fully completed (chained from the
 * transition's onComplete), so the curtain never re-triggers mid-animation.
 * Manual prev/next clicks clear and re-chain the same timer.
 *
 * Perf note: the active index lives in a ref, not state — go() always reads
 * indexRef.current at call time, so a stale closure (e.g. from a chained
 * scheduleNext callback captured on an earlier render) can never compute the
 * wrong "next" frame. Only the first frame is eager; the rest lazy-load.
 */
export function ProjectGallery({
  slug,
  name,
  gallery,
}: {
  slug: string;
  name: string;
  gallery?: GalleryItem[];
}) {
  const views = gallery?.length ? gallery.map((g) => g.view) : VIEWS;
  const indexRef = useRef(0);
  const gsapRef = useRef<Gsap | null>(null);
  const animating = useRef(false);
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const inners = useRef<(HTMLDivElement | null)[]>([]);

  const resetLayers = (active: number) => {
    frames.current.forEach((el, i) => {
      if (!el) return;
      el.style.zIndex = i === active ? "1" : "0";
      el.style.transform = "translateX(0%)";
    });
    inners.current.forEach((el) => {
      if (el) el.style.transform = "translateX(0%)";
    });
  };

  const go = (dir: 1 | -1) => {
    if (animating.current) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const next = (indexRef.current + dir + views.length) % views.length;
    const gsap = gsapRef.current;
    const frame = frames.current[next];
    const inner = inners.current[next];

    if (!gsap || reduce || !frame || !inner) {
      resetLayers(next);
      indexRef.current = next;
      scheduleNext();
      return;
    }

    animating.current = true;
    gsap.set(frame, { xPercent: dir * 100, zIndex: 2 });
    gsap.set(inner, { xPercent: dir * -100 });

    const tl = gsap.timeline({
      onComplete: () => {
        resetLayers(next);
        indexRef.current = next;
        animating.current = false;
        scheduleNext();
      },
    });

    // soft curtain — gentle symmetric ease, no snap
    tl.to(frame, { xPercent: 0, duration: 1.6, ease: "sine.inOut" }, 0).to(
      inner,
      { xPercent: 0, duration: 1.6, ease: "sine.inOut" },
      0,
    );
  };

  const scheduleNext = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (views.length < 2) return;
    timeoutRef.current = setTimeout(() => go(1), AUTO_ADVANCE_DELAY);
  };

  useEffect(() => {
    resetLayers(0);
    let active = true;
    import("gsap").then((m) => {
      if (active) gsapRef.current = m.gsap;
    });
    scheduleNext();
    return () => {
      active = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={section}
      aria-roledescription="carousel"
      aria-label={`${name} gallery`}
      className="relative h-[120dvh] w-full overflow-hidden bg-ink"
    >
      <div className="absolute inset-0">
        {views.map((view, i) => (
          <div
            key={view}
            ref={(el) => {
              frames.current[i] = el;
            }}
            className="absolute inset-0 overflow-hidden"
          >
            <div
              ref={(el) => {
                inners.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <Image
                src={gallery?.[i]?.src ?? `https://picsum.photos/seed/avr-${slug}-${view}/1760/1200`}
                alt={`${name} — ${view}`}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                sizes="100vw"
                quality={82}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* side controls — one on each edge */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous image"
        className="group absolute left-5 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] backdrop-blur transition lg:hover:bg-white lg:left-8 lg:size-14"
      >
        <ArrowLeft size={20} className="transition-transform duration-300 lg:group-hover:-translate-x-0.5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next image"
        className="group absolute right-5 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] backdrop-blur transition lg:hover:bg-white lg:right-8 lg:size-14"
      >
        <ArrowRight size={20} className="transition-transform duration-300 lg:group-hover:translate-x-0.5" />
      </button>
    </section>
  );
}
