import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";

/* Approximate drive times from Kokapet — confirm before launch. */
const places = [
  { place: "Financial District", time: "~ 8 min" },
  { place: "Outer Ring Road", time: "~ 5 min" },
  { place: "Gachibowli", time: "~ 15 min" },
  { place: "International schools", time: "~ 10 min" },
  { place: "Rajiv Gandhi Intl. Airport", time: "~ 30 min" },
];

export function LocationAdvantage() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-2 text-[13px] text-ink-70">
                <MapPin size={16} weight="fill" className="text-accent" />
                Kokapet, Hyderabad
              </p>
              <h2 className="mt-5 max-w-[16ch] font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] lg:text-5xl">
                Minutes from where the city is going.
              </h2>
              <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-ink-70">
                The Financial District on one side, the Outer Ring Road on the
                other. Evania sits at the centre of Hyderabad&rsquo;s
                fastest-growing corridor.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-line">
              {places.map((p, i) => (
                <Reveal key={p.place} index={i} as="li">
                  <div className="flex items-baseline justify-between gap-6 border-b border-line py-5">
                    <span className="font-serif text-xl text-ink lg:text-2xl">
                      {p.place}
                    </span>
                    <span className="shrink-0 text-[13px] text-ink-55">
                      {p.time}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
