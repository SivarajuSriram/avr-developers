import { Reveal } from "@/components/ui/reveal";

const stats = [
  { n: "25+", l: "Years around Hyderabad real estate" },
  { n: "34", l: "Floors at Evania, our flagship address" },
  { n: "102", l: "Residences across Evania" },
  { n: "100%", l: "RERA-registered projects" },
];

export function AboutTrackRecord() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-12 px-5 py-20 lg:grid-cols-4 lg:px-10 lg:py-24">
        {stats.map((stat, i) => (
          <Reveal key={stat.l} index={i}>
            <div className="lg:px-4">
              <p className="font-serif text-5xl font-light text-ink lg:text-6xl">
                {stat.n}
              </p>
              <p className="mt-3 max-w-[18ch] text-[13px] leading-relaxed text-ink-55">
                {stat.l}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
