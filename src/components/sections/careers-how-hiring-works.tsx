import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    t: "You write in",
    b: "A short note and your work. No forms, no cover-letter theatre.",
  },
  {
    t: "A first conversation",
    b: "A relaxed call to understand what you're after and share what we're building.",
  },
  {
    t: "A closer look",
    b: "A practical chat, on site where it makes sense, with the people you'd work beside.",
  },
  {
    t: "An honest offer",
    b: "Clear terms, quickly. If it's a fit, we move without dragging it out.",
  },
];

export function CareersHowHiringWorks() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <Reveal>
        <h2 className="max-w-[18ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
          How hiring works.
        </h2>
      </Reveal>
      <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
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
    </section>
  );
}
