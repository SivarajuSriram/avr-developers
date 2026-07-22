import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AVR Developers builds future-ready homes in Hyderabad, founded on a family legacy of managing prime real estate.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built on a long relationship with place."
        intro="Before AVR Developers, the AVR family spent decades stewarding prime real estate across Hyderabad. That patience shapes how we build today."
      />

      {/* story */}
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

      {/* track record */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-12 px-5 py-20 lg:grid-cols-4 lg:px-10 lg:py-24">
          {[
            { n: "25+", l: "Years around real estate" },
            { n: "1.2M", l: "Sq. ft. under development" },
            { n: "500+", l: "Families we're building for" },
            { n: "100%", l: "RERA-registered projects" },
          ].map((stat, i) => (
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

      {/* image band */}
      <section className="px-5 pt-20 lg:px-10 lg:pt-28">
        <ParallaxImage
          src="https://picsum.photos/seed/avr-about-band/2000/1100"
          alt="An AVR Developers residential community"
          sizes="100vw"
          className="mx-auto aspect-[16/9] max-w-[1400px] rounded-sm"
        />
      </section>

      {/* how we build */}
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
          {[
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
          ].map((step, i) => (
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

      {/* leadership note */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="font-serif text-2xl font-light leading-[1.4] text-ink sm:text-[1.7rem]">
                &ldquo;We build the kind of home we&rsquo;d want our own children
                to grow up in. That single test decides everything else.&rdquo;
              </p>
              <p className="mt-8 text-[14px] font-medium text-ink">
                The AVR family
              </p>
              <p className="text-[13px] text-ink-55">Founders, AVR Developers</p>
            </Reveal>
            <Reveal index={1} className="lg:col-span-5 lg:pt-2">
              <p className="text-[15px] leading-relaxed text-ink-70">
                A closely held, family-run practice, we keep our portfolio small
                on purpose. Fewer projects mean every decision, from the master
                plan to the door handles, still passes across our own desk.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
