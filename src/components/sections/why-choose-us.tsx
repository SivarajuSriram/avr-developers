"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";

/* Illustrative differentiators. Replace with confirmed copy before launch. */
const reasons = [
  {
    stat: "WORK ETHICS",
    detail: "Our work ethics are unwavering, and our commitments are sacred. Every promise we make is backed by our dedication to timely delivery and uncompromising quality.",
  },
  {
    stat: "UNCOMPROMISING INTEGRITY",
    detail: "We stand for uncompromising integrity and complete transparency. Every detail is clear, every commitment is honest, and there is nothing hidden between the lines.",
  },
  {
    stat: "ATTENTION TO DETAIL",
    detail: "Attention to detail defines our approach. From thoughtful space planning and refined aesthetics to the direction of sunlight, natural breezes, and the timeless placement of sit-outs, every element is carefully considered to create spaces that feel balanced, beautiful, and purposeful.",
  },
  {
    stat: "UNDENIABLE EDGE",
    detail: "Our ability to listen, respond, and take decisive action in the way our clientele values most gives us a distinct and undeniable competitive edge.",
  },
];

const pane = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 1.1, ease: "easeInOut" as const },
};

export function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = reasons[active];

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % reasons.length);
    }, 3000);
    return () => clearInterval(id);
  }, [reduceMotion, active]);

  return (
    <section className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
        {/* intro */}
        <div className="max-w-[70ch] lg:max-w-[90ch]">
          <Reveal>
            <span className="caps text-[11px] font-medium text-accent">
              Why Choose Us
            </span>
            <h2 className="mt-4 max-w-[26ch] font-serif text-3xl font-light leading-[1.08] tracking-[-0.01em] md:max-w-[34ch] md:text-5xl">
              Our Core Values Guide Our Path.
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-6 max-w-[60ch] text-[15px] leading-relaxed text-ink-70 lg:max-w-[70ch]">
              At AVR, homes are environments that inspire growth, happiness, and meaningful connections. Built with passion, purpose, and care, our communities bring people closer to nature, spirituality, and each other. OUR VALUES:
            </p>
          </Reveal>
        </div>

        {/* interactive selector */}
        <Reveal index={2}>
          <div className="mt-16 grid gap-10 lg:grid-cols-[260px_1px_1fr] lg:items-start lg:gap-16">
            <div className="flex flex-col">
              {reasons.map((r, i) => (
                <button
                  key={r.stat}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex items-baseline gap-3 border-b border-line py-4 text-left font-sans text-xs transition-colors duration-300 first:pt-0 lg:text-xl ${
                    i === active ? "text-ink" : "text-ink-25 lg:hover:text-ink-55"
                  }`}
                >
                  <span
                    className={`w-3.5 shrink-0 font-sans text-[12px] text-accent transition-opacity duration-300 ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden
                  >
                    &rarr;
                  </span>
                  {r.stat}
                </button>
              ))}
            </div>

            <div className="hidden self-stretch bg-line lg:block" />

            <div className="grid overflow-hidden rounded-md shadow-[0_24px_60px_-36px_rgba(23,35,59,0.28)] sm:grid-cols-[110px_1fr] lg:grid-cols-[130px_1fr]">
              <div className="relative hidden min-h-[280px] overflow-hidden bg-ink-90 sm:block">
                <AnimatePresence>
                  <motion.div
                    key={active}
                    {...pane}
                    className="absolute inset-0 flex items-end gap-1.5 p-6 font-serif text-[2.5rem] leading-none text-white/90 lg:p-7 lg:text-[2.75rem]"
                  >
                    {String(active + 1).padStart(2, "0")}
                    <span className="mb-[3px] font-sans text-[13px] font-normal text-accent">
                      /{String(reasons.length).padStart(2, "0")}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative min-h-[280px] overflow-hidden bg-surface">
                <AnimatePresence>
                  <motion.div key={active} {...pane} className="absolute inset-0 p-8 lg:p-10">
                    <p className="mt-5 text-[15px] font-medium text-ink md:mt-10">
                      {current.stat}
                    </p>
                    <p className="mt-2 max-w-[60ch] text-[13.5px] leading-relaxed text-ink-55">
                      {current.detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
