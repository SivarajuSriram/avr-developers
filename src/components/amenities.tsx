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
  Clapperboard,
  PartyPopper,
  PawPrint,
  Trophy,
  Landmark,
  Sparkles,
} from "lucide-react";

const DEFAULT_AMENITIES = [
  { Icon: Armchair, label: "Resident-only Clubhouse" },
  { Icon: Waves, label: "Infinity-edge Pool" },
  { Icon: Dumbbell, label: "Fitness Studio" },
  { Icon: TreePine, label: "Landscaped Courtyard" },
  { Icon: Puzzle, label: "Children's Play Area" },
  { Icon: ShieldCheck, label: "24×7 Gated Security" },
  { Icon: Zap, label: "EV Charging Bays" },
  { Icon: Leaf, label: "Yoga & Wellness Deck" },
] as const;

/* Evania's real amenity set, from avrdevelopers.com/about-project — 18,000 sq ft Club Evania. */
export const EVANIA_AMENITIES = [
  { Icon: Armchair, label: "18,000 Sq. Ft. Club Evania" },
  { Icon: Waves, label: "Adult & Kids Pool, Jacuzzi" },
  { Icon: Dumbbell, label: "Fitness Station & Gym" },
  { Icon: Leaf, label: "Yoga & Wellness Room" },
  { Icon: Clapperboard, label: "Mini Theatre" },
  { Icon: Sparkles, label: "Rooftop Designer Terrace" },
  { Icon: PartyPopper, label: "Party & Celebration Lawn" },
  { Icon: Puzzle, label: "Kids' Play Area" },
  { Icon: TreePine, label: "Senior Citizen & Reflexology Garden" },
  { Icon: Trophy, label: "Badminton, Pickleball & Basketball Courts" },
  { Icon: Landmark, label: "Temple" },
  { Icon: PawPrint, label: "Pet Park" },
  { Icon: ShieldCheck, label: "24×7 Gated Security, 6-Level Parking" },
] as const;

export function Amenities({
  name,
  variant = "default",
}: {
  name: string;
  variant?: "default" | "evania";
}) {
  const reduce = useReducedMotion();
  const items = variant === "evania" ? EVANIA_AMENITIES : DEFAULT_AMENITIES;

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
        {items.map(({ Icon, label }, i) => (
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
