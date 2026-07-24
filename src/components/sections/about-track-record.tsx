import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";

const stats = [
  { n: 25, suffix: "+", l: "Years around Hyderabad real estate" },
  { n: 34, suffix: "", l: "Floors at Evania, our flagship address" },
  { n: 102, suffix: "", l: "Residences across Evania" },
  { n: 100, suffix: "%", l: "RERA-registered projects" },
];

export function AboutTrackRecord() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid grid-cols-2 gap-x-10 gap-y-12 text-center lg:max-w-[900px] lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.l} index={i}>
              <div>
                <p className="font-serif text-5xl font-light text-ink lg:text-6xl">
                  <CountUp value={stat.n} suffix={stat.suffix} />
                </p>
                <p className="mx-auto mt-3 max-w-[18ch] text-[13px] leading-relaxed text-ink-55">
                  {stat.l}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
