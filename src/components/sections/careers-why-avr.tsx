import { Reveal } from "@/components/ui/reveal";

const reasons = [
  {
    t: "Work that ships",
    b: "Projects you can walk through, not slides that never leave a deck. Your work stands on the ground.",
  },
  {
    t: "A seat at the table",
    b: "We're small enough that your judgement shapes the outcome, whatever your title says.",
  },
  {
    t: "Craft over churn",
    b: "We'd rather do fewer things properly. There's time here to get the details right.",
  },
  {
    t: "Learn across the whole",
    b: "See a project end to end, from land and design to sales and handover, not just your slice.",
  },
  {
    t: "Grow with us",
    b: "As the portfolio grows, the people who built it grow into leading it.",
  },
  {
    t: "Looked after",
    b: "Fair pay, health cover and a calm, respectful place to spend your days.",
  },
];

export function CareersWhyAvr() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="caps mb-4 text-[12px] font-medium text-accent">
            Why AVR
          </p>
          <h2 className="max-w-[22ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
            A small team, real ownership.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, i) => (
            <Reveal key={item.t} index={i % 3}>
              <div className="border-t border-line pt-6">
                <h3 className="font-serif text-xl text-ink">{item.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-70">
                  {item.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
