import { Reveal } from "@/components/ui/reveal";

/* magazine-style drop-cap opener, right after the page header */
export function ValuesLede() {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="mx-auto max-w-[880px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="font-serif text-2xl font-light leading-[1.5] text-ink first-letter:float-left first-letter:pr-3 first-letter:pt-1 first-letter:font-serif first-letter:text-7xl first-letter:font-normal first-letter:leading-[0.85] first-letter:text-accent lg:text-3xl">
            Five things, held to on every project. Not a mission statement for
            the wall — a working list, and the one we would want if we were
            the ones buying the home. What follows is not a grid of icons. It
            is closer to a case file: a claim, and the evidence beside it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
