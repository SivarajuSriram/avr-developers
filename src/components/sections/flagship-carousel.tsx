"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  Check,
} from "@phosphor-icons/react";
import { projects } from "@/lib/site";

type Gsap = typeof import("gsap")["gsap"];

/**
 * Project spotlight carousel. Prev/next reveals the next project's image over
 * the current one with a right-to-left stationary wipe, done with a
 * double-translate (outer frame slides in, inner image counter-slides so it
 * appears fixed). Transforms only, so it's GPU-composited with no repaint.
 * The right-column info stagger-fades. Reduced-motion users get an instant swap.
 */
export function FlagshipCarousel() {
  const [index, setIndex] = useState(0);
  const gsapRef = useRef<Gsap | null>(null);
  const animating = useRef(false);

  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const inners = useRef<(HTMLDivElement | null)[]>([]);
  const info = useRef<HTMLDivElement>(null);

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
    const next = (index + dir + projects.length) % projects.length;
    const gsap = gsapRef.current;
    const frame = frames.current[next];
    const inner = inners.current[next];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!gsap || reduce || !frame || !inner || !info.current) {
      resetLayers(next);
      setIndex(next);
      return;
    }

    animating.current = true;
    const items = info.current.querySelectorAll<HTMLElement>(".info-item");

    gsap.set(frame, { xPercent: 100, zIndex: 2 });
    gsap.set(inner, { xPercent: -100 });

    const tl = gsap.timeline({
      onComplete: () => {
        resetLayers(next);
        animating.current = false;
      },
    });

    tl.to(items, { autoAlpha: 0, y: 12, duration: 0.25, stagger: 0.03, ease: "power2.in" }, 0)
      .to(frame, { xPercent: 0, duration: 0.8, ease: "power3.inOut" }, 0.05)
      .to(inner, { xPercent: 0, duration: 0.8, ease: "power3.inOut" }, 0.05)
      .add(() => setIndex(next), 0.5)
      .to(items, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }, 0.9);
  };

  const current = projects[index];

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
      {/* mobile: both projects listed statically, no carousel/tap-to-switch needed */}
      <div className="flex flex-col gap-16 lg:hidden">
        {projects.map((project, i) => (
          <div key={project.slug} className="flex flex-col">
            {i === 0 && (
              <span className="caps text-[11px] font-medium text-accent">
                Featured Projects
              </span>
            )}
            <h2 className={`font-serif text-4xl font-light leading-[1.02] tracking-[-0.01em] ${i === 0 ? "mt-4" : ""}`}>
              {project.name}
            </h2>
            <p className="mt-3 text-[13px] text-ink-55">
              {project.configuration} <span className="mx-1 text-rose">·</span>{" "}
              {project.location}
            </p>
            <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-ink-70">
              {project.blurb}
            </p>

            <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-7">
              {project.highlights.slice(0, 4).map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14.5px]">
                  <Check size={16} weight="bold" className="shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={project.image.replace("/1200/1500", "/1600/2000")}
                alt={`${project.name} by AVR Developers`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <Link
              href={`/${project.slug}`}
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-sm bg-accent px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors"
            >
              Explore {project.name}
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        ))}
      </div>

      {/* desktop: image/info carousel */}
      <div className="hidden items-center gap-12 lg:grid lg:grid-cols-12 lg:gap-14">
        {/* stacked image layers */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:col-span-7 lg:aspect-auto lg:h-[600px]">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              ref={(el) => {
                frames.current[i] = el;
              }}
              className="absolute inset-0 overflow-hidden will-change-transform"
            >
              <div
                ref={(el) => {
                  inners.current[i] = el;
                }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={p.image.replace("/1200/1500", "/1600/2000")}
                  alt={`${p.name} by AVR Developers`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* details — top-aligned + reserved height so nothing shifts between slides */}
        <div className="flex flex-col lg:col-span-5 lg:min-h-[500px]">
          <span className="caps text-[11px] font-medium text-accent">
            Featured Projects
          </span>

          {/* heading (fades) + carousel controls (static) */}
          <div className="mt-4 flex items-start justify-between gap-6">
            <div ref={info}>
              <h2 className="info-item font-serif text-5xl font-light leading-[1.02] tracking-[-0.01em] lg:text-6xl">
                {current.name}
              </h2>
              <p className="info-item mt-3 text-[13px] text-ink-55">
                {current.configuration} <span className="mx-1 text-rose">·</span>{" "}
                {current.location}
              </p>
              <p className="info-item mt-6 max-w-[40ch] text-[15px] leading-relaxed text-ink-70">
                {current.blurb}
              </p>

              <ul className="info-item mt-8 flex flex-col gap-3 border-t border-line pt-7">
                {current.highlights.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[14.5px]">
                    <Check size={16} weight="bold" className="shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={`/${current.slug}`}
                className="info-item group mt-9 inline-flex items-center gap-3 rounded-sm bg-ink px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-ink-90"
              >
                Explore {current.name}
                <ArrowRight size={16} weight="bold" className="transition-transform duration-300 lg:group-hover:translate-x-1" />
              </Link>
            </div>

            {/* controls: prev · counter · next */}
            <div className="flex shrink-0 items-center gap-3 pt-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous project"
                className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors lg:hover:border-accent lg:hover:bg-accent lg:hover:text-white"
              >
                <CaretLeft size={17} weight="bold" />
              </button>
              <span className="min-w-[54px] text-center font-serif text-[15px] text-ink-55">
                <span className="text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>{" "}
                / {String(projects.length).padStart(2, "0")}
              </span>
              <button
                onClick={() => go(1)}
                aria-label="Next project"
                className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors lg:hover:border-accent lg:hover:bg-accent lg:hover:text-white"
              >
                <CaretRight size={17} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
