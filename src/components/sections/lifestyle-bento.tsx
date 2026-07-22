import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ParallaxImage } from "@/components/ui/parallax-image";

/* Placeholder amenity imagery — swap with real Club Evania renders. */
const cells = [
  {
    seed: "avr-club-pool",
    alt: "Infinity-edge pool deck at Club Evania",
    className:
      "aspect-[16/10] sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:aspect-auto",
  },
  {
    seed: "avr-club-lounge",
    alt: "Residents' lounge at Club Evania",
    className: "aspect-[4/3] sm:col-span-2 lg:col-span-2 lg:aspect-auto",
  },
  {
    seed: "avr-club-court",
    alt: "Sports court at Evania",
    className: "aspect-square lg:aspect-auto",
  },
  {
    seed: "avr-club-green",
    alt: "Landscaped courtyard at Evania",
    className: "aspect-square lg:aspect-auto",
  },
];

export function LifestyleBento() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
      <Reveal>
        <h2 className="max-w-[20ch] font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] lg:max-w-none lg:text-5xl">
          The best part of the day happens at home.
        </h2>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-ink-70">
          Club Evania brings a pool deck, courts, a fitness studio and green
          courtyards together, a few steps from your front door.
        </p>
      </Reveal>

      <Reveal
        index={1}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[260px_260px]"
      >
        {cells.map((cell) => (
          <div key={cell.seed} className={`group relative h-full w-full overflow-hidden rounded-sm ${cell.className}`}>
            <ParallaxImage
              src={`https://picsum.photos/seed/${cell.seed}/1200/1200`}
              alt={cell.alt}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className="w-full h-full rounded-sm"
              imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:scale-[1.04]"
            />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
