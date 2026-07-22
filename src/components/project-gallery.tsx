"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

type Gsap = typeof import("gsap")["gsap"];

/* Placeholder views — swap picsum seeds for real renders before launch. */
const VIEWS = ["facade", "courtyard", "pool", "living", "club"] as const;

/**
 * Full-bleed (100dvh) project gallery. Prev/next reveals the next frame over the
 * current with a slow, soft right-to-left curtain wipe (double-translate: the
 * outer frame slides in while the inner image counter-slides, so the picture
 * holds still). Transforms only — GPU-composited, no repaint. The whole stack
 * also gets a gentle vertical scroll parallax. Reduced-motion → instant swap.
 *
 * Perf note: setIndex runs on the timeline's onComplete (not mid-tween) so React
 * never re-renders during the wipe — that was the source of the mid-animation
 * hitch. Only the first frame is eager; the rest lazy-load.
 */
export function ProjectGallery({ slug, name }: { slug: string; name: string }) {
  const [index, setIndex] = useState(0);
  const gsapRef = useRef<Gsap | null>(null);
  const animating = useRef(false);
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const inners = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-3.5%", "3.5%"]);

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

  useEffect(() => {
    resetLayers(0);
    let active = true;
    import("gsap").then((m) => {
      if (active) gsapRef.current = m.gsap;
    });
    return () => {
      active = false;
    };
  }, []);

  const go = (dir: 1 | -1) => {
    if (animating.current) return;
    const next = (index + dir + VIEWS.length) % VIEWS.length;
    const gsap = gsapRef.current;
    const frame = frames.current[next];
    const inner = inners.current[next];

    if (!gsap || reduce || !frame || !inner) {
      resetLayers(next);
      setIndex(next);
      return;
    }

    animating.current = true;
    gsap.set(frame, { xPercent: 100, zIndex: 2 });
    gsap.set(inner, { xPercent: -100 });

    const tl = gsap.timeline({
      onComplete: () => {
        resetLayers(next);
        setIndex(next);
        animating.current = false;
      },
    });

    // soft curtain — gentle symmetric ease, no snap
    tl.to(frame, { xPercent: 0, duration: 1.6, ease: "sine.inOut" }, 0).to(
      inner,
      { xPercent: 0, duration: 1.6, ease: "sine.inOut" },
      0,
    );
  };

  return (
    <section
      ref={section}
      aria-roledescription="carousel"
      aria-label={`${name} gallery`}
      className="relative h-[100dvh] w-full overflow-hidden bg-ink"
    >
      {/* parallax layer holds the whole stack; oversized so drift never bares an edge */}
      <motion.div
        style={{ y: reduce ? 0 : y }}
        className="absolute inset-[-5%] will-change-transform"
      >
        {VIEWS.map((view, i) => (
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
                src={`https://picsum.photos/seed/avr-${slug}-${view}/1760/1200`}
                alt={`${name} — view ${i + 1}`}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                sizes="100vw"
                quality={60}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </motion.div>

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
