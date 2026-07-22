import { Reveal } from "@/components/ui/reveal";
import { ParallaxImage } from "@/components/ui/parallax-image";

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
    <section
      id="values"
      className="relative flex min-h-[480px] items-end overflow-hidden text-white lg:min-h-[600px]"
    >
      {/* background */}
      <div className="absolute inset-0">
        <ParallaxImage
          src="/evania/clubhouse-exterior.webp"
          alt="Club Evania, an AVR Developers residence"
          sizes="100vw"
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10" />

      {/* overlay content */}
      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-10 lg:px-10 lg:py-14">
        <Reveal>
          <p className="max-w-[34ch] font-serif text-3xl font-light leading-[1.15] tracking-[-0.01em] sm:max-w-[42ch] sm:text-4xl lg:max-w-[46ch] lg:text-[2.75rem]">
            We build homes the way we&rsquo;d want to live in them, for
            people who are just getting started.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-8 border-t border-white/20 pt-8 sm:grid-cols-3 sm:gap-10 lg:mt-12">
          {values.map((value, i) => (
            <Reveal as="li" key={value.title} index={i + 1}>
              <h3 className="font-serif text-xl font-normal">
                {value.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
                {value.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
