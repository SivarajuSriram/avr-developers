import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    t: "Choose the ground carefully",
    b: "We only build where we know the roads, the water table and where the city is genuinely heading next.",
  },
  {
    t: "Design around the day",
    b: "Plans begin with light, air and how a family actually moves through a home, long before square footage.",
  },
  {
    t: "Specify for the long run",
    b: "Materials and detailing are picked for how they age, so a home still feels right two decades on.",
  },
  {
    t: "Build in the green",
    b: "Courtyards, planted decks and shaded walks are part of the structure, never sold back as an upgrade.",
  },
  {
    t: "Stay honest on timelines",
    b: "Clear dates, straight answers on approvals, and no surprises between the brochure and the handover.",
  },
  {
    t: "Stand behind the handover",
    b: "The relationship doesn't end at possession. We're around long after the last family moves in.",
  },
];

export function AboutHowWeBuild() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <Reveal>
        <p className="caps mb-4 text-[12px] font-medium text-accent">
          How we build
        </p>
        <h2 className="max-w-[20ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
          A slower, more deliberate way of working.
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.t} index={i % 3}>
            <div className="border-t border-line pt-6">
              <span className="font-serif text-2xl font-light text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-xl text-ink lg:text-2xl">
                {step.t}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-70">
                {step.b}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
