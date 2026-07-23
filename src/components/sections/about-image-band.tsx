import { ParallaxImage } from "@/components/ui/parallax-image";

export function AboutImageBand() {
  return (
    <section className="px-5 pt-20 lg:px-10 lg:pt-28">
      <ParallaxImage
        src="/evania/clubhouse-gym.webp"
        alt="Inside Club Evania, AVR Developers' resident clubhouse"
        sizes="100vw"
        className="mx-auto aspect-[16/9] max-w-[1400px] rounded-sm"
      />
    </section>
  );
}
