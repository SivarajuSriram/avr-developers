"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CoverImage } from "@/components/ui/cover-image";
import { Reveal } from "@/components/ui/reveal";
import type { ClubhouseSpace } from "@/lib/site";

export function Clubhouse({
  spaces,
  projectName = "Evania",
  eyebrow,
  heading,
  body,
}: {
  spaces: ClubhouseSpace[];
  projectName?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || spaces.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % spaces.length);
    }, 2000);
    return () => clearInterval(id);
  }, [active, paused, spaces.length]);

  return (
    <section id="clubhouse" className="scroll-mt-32 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative order-2 aspect-[4/5] overflow-hidden rounded-sm lg:order-none lg:aspect-[5/6] lg:col-span-6">
            <AnimatePresence>
              <motion.div
                key={spaces[active].image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <CoverImage
                  src={spaces[active].image}
                  alt={`${spaces[active].label} — ${projectName} Club`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full"
                />
              </motion.div>
            </AnimatePresence>
          </Reveal>
          <Reveal index={1} className="order-1 lg:order-none lg:col-span-6">
            <p className="caps mb-4 text-[12px] font-medium text-accent">
              {eyebrow ?? "2-Level Clubhouse"}
            </p>
            <h2 className="max-w-[45ch] font-serif text-3xl font-light leading-[1.08] md:text-5xl">
              {heading ?? "Your Private Haven of Leisure"}
            </h2>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ink-70">
              {body ??
                "A thoughtfully curated clubhouse that offers spaces to relax, rejuvenate, and reconnect. Every corner is designed to complement your lifestyle and create meaningful experiences close to home."}
            </p>
            <ul
              className="mt-10 border-t border-line"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {spaces.map((space, i) => (
                <li key={space.label} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={`w-full py-4 text-left text-[15px] transition-colors lg:text-base ${
                      active === i ? "text-accent" : "text-ink lg:hover:text-accent"
                    }`}
                  >
                    {space.label}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
