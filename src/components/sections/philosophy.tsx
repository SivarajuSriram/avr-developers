import { Reveal } from "@/components/ui/reveal";

const values = [
  {
    title: "Considered by design",
    body: "Every plan starts with how a day actually unfolds. Light, flow and privacy come before square footage.",
  },
  {
    title: "Green as standard",
    body: "Open courtyards, planted decks and shaded walks are built in, not sold as an upgrade.",
  },
  {
    title: "Built to outlast trends",
    body: "Materials and detailing chosen for how they age. A home that still feels right in twenty years.",
  },
];

export function Philosophy() {
  return (
    <section id="values" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
        <Reveal>
          <p className="max-w-[24ch] font-serif text-3xl font-light leading-[1.15] tracking-[-0.01em] sm:text-4xl lg:max-w-[54ch] lg:text-[2.9rem]">
            We build homes the way we&rsquo;d want to live in them, for people
            who are just getting started.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border-y border-line sm:mt-24 sm:grid-cols-3">
          {values.map((value, i) => (
            <Reveal
              key={value.title}
              index={i}
              className="bg-surface px-0 py-8 sm:px-8 sm:py-10 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-line"
            >
              <h3 className="font-serif text-xl font-normal text-ink">
                {value.title}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[14.5px] leading-relaxed text-ink-70">
                {value.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
