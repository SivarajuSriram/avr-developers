import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    t: "We reach out",
    b: "A quick call within a working day to understand what you're looking for and set a time.",
  },
  {
    t: "A private walk-through",
    b: "An unhurried tour of the site, the model residence and the plans, no crowd, no pressure.",
  },
  {
    t: "Straight answers",
    b: "Pricing, approvals and timelines laid out clearly, so you can decide in your own time.",
  },
];

export function ContactWhatToExpect() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <h2 className="max-w-[20ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
            What a visit looks like.
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.t} index={i} as="li">
              <div className="border-t border-line pt-6">
                <span className="font-serif text-2xl font-light text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-xl text-ink">{step.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-70">
                  {step.b}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
