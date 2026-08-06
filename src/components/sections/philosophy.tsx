import { Reveal } from "@/components/ui/reveal";
import { CoverImage } from "@/components/ui/cover-image";

const values = [
  {
    title: "Future-Focused Design:",
    body: "Creating contemporary homes that evolve with changing lifestyles and aspirations.",
  },
  {
    title: "Quality & Experience:",
    body: "Delivering thoughtfully crafted spaces with premium amenities and lasting value.",
  },
  {
    title: "Trust & Innovation:",
    body: "Combining experience with fresh thinking to create meaningful living experiences.",
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
        <CoverImage
          src="/about/about-section.webp"
          /* drop the mobile-res render at this path once available */
          mobileSrc={undefined}
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
          <p className="max-w-[34ch] font-serif text-2xl font-light leading-[1.15] tracking-[-0.01em] sm:max-w-[42ch] sm:text-3xl lg:max-w-[46ch] lg:text-4xl">
            AVR Group creates new-age living spaces that respond to evolving lifestyles through fresh design, premium amenities, and a powerful blend of innovation, experience, and trust.
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
