"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ClockCountdown, ShieldCheck, HandCoins, Wrench } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";

/* Illustrative differentiators — replace with confirmed copy before launch. */
const reasons = [
  {
    icon: ClockCountdown,
    stat: "On Time",
    label: "Every handover, on schedule",
    detail: "We commit a date at booking and build to hit it, not push past it.",
  },
  {
    icon: ShieldCheck,
    stat: "RERA",
    label: "Fully compliant, always",
    detail: "Every project registered and compliant, so your investment stays protected.",
  },
  {
    icon: HandCoins,
    stat: "No Fine Print",
    label: "Transparent pricing",
    detail: "The cost you're quoted at booking is the cost you pay at handover.",
  },
  {
    icon: Wrench,
    stat: "In-House",
    label: "Quality control, in-house",
    detail: "We oversee construction quality directly, not through layers of contractors.",
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
  const [tick, setTick] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = reasons[active];

  function selectItem(i: number) {
    setActive(i);
    setTick((t) => t + 1);
  }

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % reasons.length);
    }, 3000);
    return () => clearInterval(id);
  }, [reduceMotion, tick]);

  return (
    <section className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
        {/* intro */}
        <div className="max-w-[70ch] lg:max-w-[90ch]">
          <Reveal>
            <span className="caps text-[11px] font-medium text-accent">
              Why Choose Us
            </span>
            <h2 className="mt-4 max-w-[26ch] font-serif text-4xl font-light leading-[1.08] tracking-[-0.01em] lg:max-w-[34ch] lg:text-5xl">
              A developer that treats every home like our own.
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-6 max-w-[60ch] text-[15px] leading-relaxed text-ink-70 lg:max-w-[70ch]">
              Twenty-five years in real estate taught us that trust is built
              one handover at a time, in transparent pricing, honest
              timelines and construction we&rsquo;d be happy to live in
              ourselves. That&rsquo;s the standard behind everything we
              build.
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
                  onClick={() => selectItem(i)}
                  className={`flex items-baseline gap-3 border-b border-line py-4 text-left font-serif text-xl transition-colors duration-300 first:pt-0 lg:text-2xl ${
                    i === active ? "text-ink" : "text-ink-25 hover:text-ink-55"
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
                    <current.icon size={22} weight="bold" className="text-accent" />
                    <p className="mt-6 font-serif text-3xl font-light leading-none text-ink lg:text-4xl">
                      {current.stat}
                    </p>
                    <p className="mt-3 text-[15px] font-medium text-ink">
                      {current.label}
                    </p>
                    <p className="mt-2 max-w-[42ch] text-[13.5px] leading-relaxed text-ink-55">
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
