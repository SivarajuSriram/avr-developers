import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";

/* Track-record figures — confirm exact numbers before launch. */
const stats = [
  { n: "25+", l: "Years around Hyderabad real estate" },
  { n: "1.2M", l: "Sq. ft. under development" },
  { n: "500+", l: "Families we're building for" },
  { n: "100%", l: "RERA-registered projects" },
];

export function Milestones() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-2 gap-y-12 lg:mx-auto lg:w-fit lg:grid-cols-4 lg:gap-x-32">
          {stats.map((stat, i) => (
            <Reveal key={stat.l} index={i}>
              <div>
                <Counter
                  value={stat.n}
                  className="font-serif text-5xl font-light leading-none text-ink lg:text-6xl"
                />
                <p className="mt-4 max-w-[18ch] text-[13px] leading-relaxed text-ink-55">
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
