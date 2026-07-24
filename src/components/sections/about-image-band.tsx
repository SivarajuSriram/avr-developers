import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";

export function AboutImageBand() {
  return (
    <section className="px-5 pt-20 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-[1400px]">
        <ParallaxImage
          src="/evania/clubhouse-interior.webp"
          alt="The Club Evania reception lobby"
          sizes="100vw"
          className="aspect-[16/9] rounded-sm"
        />
        <Reveal>
          <p className="mt-6 font-serif text-xl font-light leading-snug text-ink lg:whitespace-nowrap lg:text-2xl">
            Evania &mdash; twenty-five years of intent, built into one
            address.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
