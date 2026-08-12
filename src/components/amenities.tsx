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
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { AmenityIconName, AmenityItem } from "@/lib/site";

const ICONS: Record<AmenityIconName, LucideIcon> = {
  armchair: Armchair,
  waves: Waves,
  dumbbell: Dumbbell,
  treepine: TreePine,
  puzzle: Puzzle,
  shield: ShieldCheck,
  zap: Zap,
  leaf: Leaf,
  clapperboard: Clapperboard,
  party: PartyPopper,
  pawprint: PawPrint,
  trophy: Trophy,
  landmark: Landmark,
  sparkles: Sparkles,
};

/* generic placeholder set — only used when a project hasn't set its own amenityItems yet */
const DEFAULT_AMENITIES: AmenityItem[] = [
  { icon: "armchair", label: "Resident-only Clubhouse" },
  { icon: "waves", label: "Infinity-edge Pool" },
  { icon: "dumbbell", label: "Fitness Studio" },
  { icon: "treepine", label: "Landscaped Courtyard" },
  { icon: "puzzle", label: "Children's Play Area" },
  { icon: "shield", label: "24×7 Gated Security" },
  { icon: "zap", label: "EV Charging Bays" },
  { icon: "leaf", label: "Yoga & Wellness Deck" },
];

export function Amenities({
  heading,
  items,
}: {
  heading?: string;
  items?: AmenityItem[];
}) {
  const list = items ?? DEFAULT_AMENITIES;

  return (
    <section
      id="amenities"
      className="mx-auto max-w-[1400px] scroll-mt-32 px-5 py-14 lg:px-10 lg:py-32"
    >
      <div>
        <Reveal>
          <p className="caps mb-4 text-[12px] font-medium text-accent">Amenities</p>
        </Reveal>
        <Reveal index={1}>
          <h2 className="font-serif text-3xl font-light leading-[1.08] md:whitespace-nowrap md:text-5xl">
            {heading ?? "A 360° Experience"}
          </h2>
        </Reveal>
      </div>

      <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
        {list.map(({ icon, label }) => {
          const Icon = ICONS[icon];
          return (
            <li
              key={label}
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
            </li>
          );
        })}
      </ul>
    </section>
  );
}
