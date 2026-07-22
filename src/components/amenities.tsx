"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Armchair,
  Waves,
  Dumbbell,
  TreePine,
  Puzzle,
  ShieldCheck,
  Zap,
  Leaf,
} from "lucide-react";

const AMENITIES = [
  { Icon: Armchair, label: "Resident-only Clubhouse" },
  { Icon: Waves, label: "Infinity-edge Pool" },
  { Icon: Dumbbell, label: "Fitness Studio" },
  { Icon: TreePine, label: "Landscaped Courtyard" },
  { Icon: Puzzle, label: "Children's Play Area" },
  { Icon: ShieldCheck, label: "24×7 Gated Security" },
  { Icon: Zap, label: "EV Charging Bays" },
  { Icon: Leaf, label: "Yoga & Wellness Deck" },
] as const;

export function Amenities({ name }: { name: string }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="amenities"
      className="mx-auto max-w-[1400px] scroll-mt-32 px-5 py-24 lg:px-10 lg:py-32"
    >
      <div className="max-w-[46ch]">
        <p className="caps mb-4 text-[12px] font-medium text-accent">Amenities</p>
        <h2 className="font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
          Everything a day at {name} could ask for.
        </h2>
      </div>

      <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
        {AMENITIES.map(({ Icon, label }, i) => (
          <motion.li
            key={label}
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.6,
              delay: (i % 4) * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group flex flex-col items-center gap-5 text-center"
          >
            <Icon
              size={44}
              strokeWidth={1.4}
              className="text-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:scale-110"
              aria-hidden
            />
            <span className="max-w-[16ch] text-[15px] font-medium leading-snug text-ink">
              {label}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
