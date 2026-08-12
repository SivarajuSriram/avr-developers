import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ResponsiveImage } from "@/components/ui/responsive-image";

/** Fullscreen banner hero with an image background and a centered text overlay. */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden text-white"
    >
      {/* background */}
      <div className="absolute inset-0">
        <ResponsiveImage
          src="/Home-page-hero.webp"
          /* drop the mobile-res render at this path once available */
          mobileSrc="/home-page-hero-mobile.webp"
          alt="Evania by AVR Developers, luxury residences in Kokapet, Hyderabad"
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* legibility scrims */}
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-ink/35" />
      </div>

      {/* overlay content */}
      <div className="relative z-10 mx-auto max-w-[1000px] px-5 text-center pt-24">
        <h1
          className="rise mx-auto max-w-[18ch] font-serif text-4xl font-light leading-[1.1] tracking-[-0.01em] sm:text-6xl lg:text-[5.5rem] lg:leading-[1.02]"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          Reshaping the
          <br />
          <span className="inline-block pb-1 text-rose">
            DNA of Urban Living
          </span>
        </h1>

        <p
          className="rise mx-auto mt-7 max-w-[52ch] text-[15px] leading-relaxed text-white/85 lg:text-base"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          AVR Developers creates future-ready spaces where thoughtful design, lasting value, and modern lifestyles come together. 
        </p>

        <div
          className="rise mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-sm bg-accent px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-accent-dark"
          >
            Book a Site Visit
            <ArrowRight
              size={16}
              weight="bold"
              className="transition-transform duration-300 lg:group-hover:translate-x-1"
            />
          </Link>
          {/* <Link
            href="/contact"
            className="link-underline inline-flex items-center py-2 text-[13px] font-medium uppercase tracking-[0.1em] text-white"
          >
            Book a Visit
          </Link>*/}
        </div>
      </div>
    </section>
  );
}
