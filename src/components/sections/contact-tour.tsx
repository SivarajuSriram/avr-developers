import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/contact-form";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export function ContactTour() {
  return (
    <section className="relative overflow-hidden bg-ink-90 py-20 lg:py-32">
      <div className="absolute inset-0">
        <ParallaxImage
          src="/contact/hero-bg.jpg"
          alt="Luxury home exterior at dusk"
          className="absolute inset-0 h-full w-full"
          strength={10}
        />
        <div className="absolute inset-0 bg-ink-90/80" />
      </div>

      <div className="relative mx-auto flex max-w-[900px] flex-col items-center px-5 text-center lg:px-10">
        <Reveal>
          <h2 className="font-serif text-4xl font-light leading-[1.05] text-white lg:text-5xl">
            Let&rsquo;s start a conversation.
          </h2>
        </Reveal>
        <Reveal index={1}>
          <p className="mt-6 max-w-[54ch] text-[15px] leading-relaxed text-white/70 lg:text-base">
            Tell us what you&rsquo;re looking for and we&rsquo;ll arrange a
            private walk-through, at a time that suits you.
          </p>
        </Reveal>

        <Reveal index={2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-white/70">
            <div className="flex items-center gap-2">
              <EnvelopeSimple size={16} />
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-white/85 lg:hover:text-white"
              >
                {site.email}
              </a>
            </div>
            {site.phones.map((phone) => (
              <div key={phone} className="flex items-center gap-2">
                <Phone size={16} />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="link-underline text-white/85 lg:hover:text-white"
                >
                  {phone}
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal index={3} className="mt-14 w-full max-w-[640px]">
          <div className="rounded-md bg-surface p-6 shadow-2xl sm:p-10">
            <h3 className="mb-8 font-serif text-2xl font-light text-ink lg:text-3xl">
              Fill out the form
            </h3>
            <ContactForm bare />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
