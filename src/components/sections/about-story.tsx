import { Reveal } from "@/components/ui/reveal";

export function AboutStory() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="font-serif text-2xl font-light leading-[1.4] text-ink sm:text-[1.7rem]">
            We didn&rsquo;t start by buying land. We started by looking after
            it, and learning what makes a place worth living in for the long
            run.
          </p>
        </Reveal>
        <Reveal index={1} className="lg:col-span-5 lg:pt-2">
          <p className="text-[15px] leading-relaxed text-ink-70">
            That background means we think in decades, not launches. We choose
            locations we understand, design homes around daylight and open
            green, and specify materials for how they age. Every AVR project
            is a place we would be happy to hand to our own family.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
