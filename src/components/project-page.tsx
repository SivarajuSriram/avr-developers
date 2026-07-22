import Image from "next/image";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ProjectGallery } from "@/components/project-gallery";
import { Amenities } from "@/components/amenities";
import { Reveal } from "@/components/ui/reveal";
import { site, type Project } from "@/lib/site";

export function ProjectPage({ project }: { project: Project }) {
  const residenceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: `${project.name} by ${site.name}`,
    description: project.blurb,
    url: `${site.url}/${project.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.location.split(",")[0].trim(),
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    ...(project.rera ? { identifier: project.rera } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(residenceJsonLd) }}
      />

      {/* hero */}
      <section
        id="hero"
        className="relative flex min-h-[86dvh] flex-col justify-end overflow-hidden text-white"
      >
        <Image
          src={project.image.replace("/1200/1500", "/2400/1500")}
          alt={`${project.name} by AVR Developers`}
          fill
          priority
          sizes="100vw"
          quality={72}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/40" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 pt-28 lg:px-10 lg:pb-24">
          <p className="caps mb-5 text-[12px] font-medium text-white/80">
            {project.status} <span className="mx-2 text-rose">/</span>{" "}
            {project.location}
          </p>
          <h1 className="font-serif text-6xl font-light leading-none tracking-[-0.01em] lg:text-8xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-[44ch] text-[15px] text-white/85">
            {project.configuration}
          </p>
        </div>
      </section>

      {/* about */}
      <section id="about" className="mx-auto max-w-[1400px] scroll-mt-32 px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
              A gated address, shaped around light and green.
            </h2>
          </Reveal>
          <Reveal index={1} className="lg:col-span-5 lg:pt-3">
            <p className="text-[15px] leading-relaxed text-ink-70">{project.blurb}</p>
            {project.rera && (
              <p className="mt-6 text-[12px] text-ink-40">RERA: {project.rera}</p>
            )}
          </Reveal>
        </div>
      </section>

      {/* highlights */}
      {project.highlights.length > 0 && (
        <section
          id="highlights"
          className="scroll-mt-32 border-t border-line"
        >
          <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
            <Reveal>
              <p className="caps mb-4 text-[12px] font-medium text-accent">
                The essentials
              </p>
              <h2 className="max-w-[20ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
                Everything that makes it {project.name}.
              </h2>
            </Reveal>
            <ul className="mt-16 grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
              {project.highlights.map((highlight, i) => (
                <Reveal key={highlight} index={i % 5} as="li">
                  <p className="font-serif text-5xl font-light leading-none text-ink lg:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-5 max-w-[20ch] text-[14px] leading-relaxed text-ink-55">
                    {highlight}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* site plan (parallax band) */}
      <section id="site-plan" className="scroll-mt-32 px-5 lg:px-10">
        <ParallaxImage
          src={project.image.replace("/1200/1500", "/2000/1100")}
          alt={`${project.name} master site plan`}
          sizes="100vw"
          className="mx-auto aspect-[16/9] max-w-[1400px] rounded-sm"
        />
      </section>

      {/* amenities (animated icons) */}
      <Amenities name={project.name} />

      {/* gallery (full-bleed carousel) */}
      <div id="gallery" className="scroll-mt-32 border-t border-line">
        <ProjectGallery slug={project.slug} name={project.name} />
      </div>

      {/* club */}
      <section id="club" className="mx-auto max-w-[1400px] scroll-mt-32 px-5 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <h2 className="max-w-[16ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
            Life beyond the front door.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-ink-70">
            A resident-only club, pool deck, courts and green courtyards, so the
            best part of the day can happen without leaving home.
          </p>
        </Reveal>
      </section>

      {/* location */}
      <section id="location" className="scroll-mt-32 border-t border-line">
        <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="flex items-center gap-2 text-[13px] text-ink-70">
                <MapPin size={16} weight="fill" className="text-accent" />
                {project.location}
              </p>
              <h2 className="mt-5 max-w-[18ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
                Where the city is heading.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ink-70">
                Set among Hyderabad&rsquo;s fastest-growing western corridor,
                with the Financial District, schools and the airport all within
                an easy reach.
              </p>
            </Reveal>
            <Reveal index={1} className="lg:col-span-6">
              <ul className="border-t border-line">
                {[
                  { place: "Financial District", time: "10 min" },
                  { place: "Outer Ring Road", time: "5 min" },
                  { place: "Gachibowli", time: "15 min" },
                  { place: "International Airport", time: "35 min" },
                  { place: "Leading schools & hospitals", time: "Nearby" },
                ].map((row) => (
                  <li
                    key={row.place}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-5"
                  >
                    <span className="text-[15px] text-ink lg:text-base">
                      {row.place}
                    </span>
                    <span className="caps whitespace-nowrap text-[12px] font-medium text-accent">
                      {row.time}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* full-bleed map */}
        <div className="border-t border-line">
          <iframe
            title={`Map — ${project.name}, ${project.location}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${project.name}, ${project.location}`,
            )}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[60dvh] w-full border-0 grayscale-[0.15]"
          />
        </div>
      </section>

    </>
  );
}
