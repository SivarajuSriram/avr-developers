"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
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
import { Reveal } from "@/components/ui/reveal";

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
  const items = variant === "evania" ? EVANIA_AMENITIES : DEFAULT_AMENITIES;
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [
    AutoScroll({ speed: 0.5, startDelay: 0, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  return (
    <section
      id="amenities"
      className="mx-auto max-w-[1400px] scroll-mt-32 px-5 py-24 lg:px-10 lg:py-32"
    >
      <div>
        <Reveal>
          <p className="caps mb-4 text-[12px] font-medium text-accent">Amenities</p>
        </Reveal>
        <Reveal index={1}>
          <h2 className="font-serif text-4xl font-light leading-[1.08] lg:whitespace-nowrap lg:text-5xl">
            Everything a day at {name} could ask for.
          </h2>
        </Reveal>
      </div>

      <div
        ref={emblaRef}
        className="mt-16 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <ul className="flex gap-8 lg:gap-10">
          {items.map(({ Icon, label }) => (
            <li
              key={label}
              className="group flex w-[150px] shrink-0 flex-col items-center gap-5 text-center sm:w-[170px]"
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
