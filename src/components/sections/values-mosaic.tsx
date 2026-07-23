import Image from "next/image";
import { Clock, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type Tile =
  | {
      type: "text";
      span: string;
      Icon: LucideIcon;
      title: string;
      body: string;
      dropcap?: boolean;
    }
  | { type: "photo"; span: string; title: string; image: string }
  | { type: "quote"; span: string; title: string; body: string };

const tiles: Tile[] = [
  {
    type: "text",
    span: "lg:col-span-5",
    Icon: Clock,
    title: "Work Ethics",
    dropcap: true,
    body: "Our work ethics are non-negotiable and our on-time deliverables are sacrosanct. If we have made a promise, we will deliver.",
  },
  {
    type: "photo",
    span: "lg:col-span-7 lg:row-span-2",
    title: "Uncompromising Integrity",
    image: "/evania/facade.webp",
  },
  {
    type: "text",
    span: "lg:col-span-5",
    Icon: Users,
    title: "Professionalism",
    body: "We hold professionalism and efficiency in high esteem. Every domain of creating the perfect address is handled by masters in their craft, spanning engineers, designers, architects, landscape artists, leisure management companies and more.",
  },
  {
    type: "quote",
    span: "lg:col-span-4",
    title: "Undeniable Edge",
    body: "Our ability to listen, respond and take action just the way our clientele wants us to gives us an undeniable edge.",
  },
  {
    type: "photo",
    span: "lg:col-span-8",
    title: "Attention to Detail",
    image: "/evania/clubhouse-interior.webp",
  },
];

/* asymmetric magazine mosaic — mixed text/photo/quote tiles rather than a
   uniform row-by-row list */
export function ValuesMosaic() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-flow-dense lg:auto-rows-[220px] lg:grid-cols-12 lg:gap-7">
          {tiles.map((tile, i) => {
            if (tile.type === "photo") {
              return (
                <Reveal
                  key={tile.title}
                  index={i % 3}
                  className={`relative min-h-[280px] overflow-hidden rounded-sm ${tile.span}`}
                >
                  <Image
                    src={tile.image}
                    alt={`${tile.title} at AVR Developers`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 max-w-[20ch] font-serif text-xl font-light text-white lg:text-2xl">
                    {tile.title}
                  </p>
                </Reveal>
              );
            }
            if (tile.type === "quote") {
              return (
                <Reveal
                  key={tile.title}
                  index={i % 3}
                  className={`flex flex-col justify-center rounded-sm bg-ink-90 p-8 text-white ${tile.span}`}
                >
                  <span className="font-serif text-5xl leading-none text-white/25">
                    &ldquo;
                  </span>
                  <p className="mt-2 font-serif text-lg font-light italic leading-relaxed">
                    {tile.body}
                  </p>
                  <p className="caps mt-6 text-[11px] font-medium text-white/50">
                    {tile.title}
                  </p>
                </Reveal>
              );
            }
            return (
              <Reveal
                key={tile.title}
                index={i % 3}
                className={`rounded-sm border border-line bg-canvas p-8 ${tile.span}`}
              >
                <tile.Icon size={26} strokeWidth={1.3} className="text-accent" aria-hidden />
                <h3 className="mt-4 font-serif text-2xl font-light text-ink">
                  {tile.title}
                </h3>
                <p
                  className={`mt-4 text-[15px] leading-relaxed text-ink-70 ${
                    tile.dropcap
                      ? "first-letter:float-left first-letter:pr-2 first-letter:font-serif first-letter:text-5xl first-letter:leading-[0.8] first-letter:text-accent"
                      : ""
                  }`}
                >
                  {tile.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
