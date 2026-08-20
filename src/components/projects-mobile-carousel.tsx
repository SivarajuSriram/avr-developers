"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { CoverImage } from "./ui/cover-image";
import type { Project } from "@/lib/site";

type Gsap = typeof import("gsap")["gsap"];

const GRID_SIZE = 8;
const STEP_DURATION = 0.35;
const AUTOPLAY_INTERVAL = 2300;

/**
 * Mobile-only project carousel (rendered `lg:hidden`, desktop keeps the
 * hover-reveal grid in ProjectsFeature). Autoplay steps swap the active
 * project's image behind a pixel-grid cover/reveal, the same GSAP technique
 * as ui/PixelTransition.tsx, driven by an index instead of that component's
 * fixed first/second content so it scales past two projects.
 */
export function ProjectsMobileCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const gsapRef = useRef<Gsap | null>(null);
  const pixelGridRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const animating = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let active = true;
    import("gsap").then((m) => {
      if (active) gsapRef.current = m.gsap;
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const grid = pixelGridRef.current;
    if (!grid) return;
    grid.innerHTML = "";
    const size = 100 / GRID_SIZE;
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const pixel = document.createElement("div");
        pixel.className = "absolute hidden bg-canvas";
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        grid.appendChild(pixel);
      }
    }
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      const next = (index + dir + projects.length) % projects.length;
      const gsap = gsapRef.current;
      const grid = pixelGridRef.current;
      const info = infoRef.current;
      const pixels = grid?.querySelectorAll<HTMLDivElement>("div") ?? null;

      if (!gsap || !grid || !info || !pixels?.length || reduce) {
        setIndex(next);
        return;
      }

      const stagger = STEP_DURATION / pixels.length;
      gsap.killTweensOf(pixels);
      gsap.killTweensOf(info);

      gsap
        .timeline({
          onStart: () => {
            animating.current = true;
          },
          onComplete: () => {
            animating.current = false;
          },
        })
        .set(pixels, { display: "none" })
        .to(pixels, { display: "block", duration: 0, stagger: { each: stagger, from: "random" } }, 0)
        .to(info, { opacity: 0, duration: STEP_DURATION * 0.6, ease: "power1.out" }, 0)
        .call(() => setIndex(next), undefined, STEP_DURATION)
        .to(
          pixels,
          { display: "none", duration: 0, stagger: { each: stagger, from: "random" } },
          STEP_DURATION,
        )
        .to(info, { opacity: 1, duration: STEP_DURATION * 0.6, ease: "power1.in" }, STEP_DURATION);
    },
    [index, projects.length, reduce],
  );

  useEffect(() => {
    if (reduce || projects.length < 2) return;
    const id = setInterval(() => go(1), AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [go, reduce, projects.length]);

  const project = projects[index];

  return (
    <div className="lg:hidden">
      <Link
        href={`/${project.slug}`}
        className="group relative block"
      >
        <div className="relative">
          <CoverImage
            src={project.image}
            alt={`${project.name} by AVR Developers`}
            sizes="100vw"
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
          />
          <span className="caps absolute left-4 top-4 z-20 rounded-xs bg-canvas/90 px-2.5 py-1 text-[10px] font-medium text-ink backdrop-blur-sm">
            {project.status}
          </span>
          <div ref={pixelGridRef} className="pointer-events-none absolute inset-0 z-30" />
        </div>

        <div ref={infoRef}>
          <p className="mt-6 font-serif text-2xl font-normal tracking-[0.02em]">{project.name}</p>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-70">{project.blurb}</p>
          <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
            {project.highlights.slice(0, 4).map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-[14px]">
                <Check size={15} weight="bold" className="shrink-0 text-accent" />
                {item.value ? `${item.value} ${item.label}` : item.label}
              </li>
            ))}
          </ul>
          <span className="caps mt-6 inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-4 py-2.5 text-[11px] font-medium text-white">
            Learn More
            <ArrowUpRight size={14} weight="bold" />
          </span>
        </div>
      </Link>
    </div>
  );
}
