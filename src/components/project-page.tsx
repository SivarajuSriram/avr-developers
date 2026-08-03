import Image from "next/image";
import { ProjectGallery } from "@/components/project-gallery";
import { Amenities } from "@/components/amenities";
import { ProjectVideo } from "@/components/project-video";
import { Clubhouse } from "@/components/clubhouse";
import { FloorPlans } from "@/components/floor-plans";
import { LocationSection } from "@/components/location-section";
import { Reveal } from "@/components/ui/reveal";
import { site, type Project } from "@/lib/site";
import { withBreaks, paragraphs } from "@/lib/with-breaks";

export function ProjectPage({ project }: { project: Project }) {
  const residenceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: `${project.name} by ${site.name}`,
    description: project.blurb,
    url: `${site.url}/${project.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
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
          src={project.heroImage ?? project.image.replace("/1200/1500", "/2400/1500")}
          alt={`${project.name} by AVR Developers`}
          fill
          priority
          sizes="100vw"
          quality={72}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/40" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 pt-28 lg:px-10 lg:pb-24">
          <h1 className="font-serif text-6xl font-light leading-none tracking-[-0.03em] lg:text-8xl">
            {withBreaks(project.headline ?? project.name)}
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
              {withBreaks(project.aboutHeading ?? "Homes For The New-age|Living Stories")}
            </h2>
            <div
              className={
                project.aboutImageContain
                  ? "relative mt-10 aspect-[5/14] max-w-[280px]"
                  : "relative mt-10 aspect-[16/10] overflow-hidden rounded-sm"
              }
            >
              <Image
                src={project.aboutImage ?? project.image}
                alt={`${project.name} by AVR Developers`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className={project.aboutImageContain ? "object-contain object-bottom" : "object-cover"}
              />
            </div>
          </Reveal>
          <Reveal index={1} className="lg:col-span-5 lg:pt-3">
            {paragraphs(project.about ?? project.blurb).map((para, i) => (
              <p
                key={i}
                className={`text-[15px] leading-relaxed text-ink-70 ${i > 0 ? "mt-4" : ""}`}
              >
                {para}
              </p>
            ))}
            {project.rera && (
              <p className="mt-6 text-[12px] text-ink-40">RERA: {project.rera}</p>
            )}
          </Reveal>
        </div>
      </section>

      {/* site plan */}
      <section id="site-plan" className="scroll-mt-32 px-5 lg:px-10">
        <div className="relative mx-auto aspect-[250/217] max-w-[1330px]">
          <Image
            src={project.sitePlanImage ?? project.image.replace("/1200/1500", "/2000/1100")}
            alt={`${project.name} master site plan`}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </section>

      {/* amenities (animated icons) */}
      <Amenities heading={project.amenitiesHeading} items={project.amenityItems} />

      {/* video walkthrough */}
      {project.videoId && (
        <ProjectVideo videoId={project.videoId} title={project.videoTitle ?? project.name} />
      )}

      {/* clubhouse */}
      {project.clubhouseSpaces?.length ? (
        <Clubhouse
          spaces={project.clubhouseSpaces}
          projectName={project.name}
          eyebrow={project.clubEyebrow}
          heading={project.clubHeading}
          body={project.clubBody}
        />
      ) : (
        <section id="club" className="mx-auto max-w-[1400px] scroll-mt-32 px-5 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <h2 className="max-w-[16ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
              {project.noClubhouseHeading ?? "Life beyond the front door."}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-ink-70">
              {project.noClubhouseBody ??
                "A resident-only club, pool deck, courts and green courtyards, so the best part of the day can happen without leaving home."}
            </p>
          </Reveal>
        </section>
      )}

      {/* floor plans (gated) */}
      {project.floorPlans?.length ? (
        <FloorPlans name={project.name} heading={project.floorPlansHeading} plans={project.floorPlans} />
      ) : null}

      {/* gallery (full-bleed carousel) */}
      <div id="gallery" className="scroll-mt-32 border-t border-line">
        <div className="mx-auto max-w-[1400px] px-5 pt-20 lg:px-10 lg:pt-28">
          <Reveal>
            <p className="caps mb-4 text-[12px] font-medium text-accent">
              Gallery
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="font-serif text-4xl font-light leading-[1.08] lg:whitespace-nowrap lg:text-5xl">
              {project.galleryHeading ?? `The ${project.name} Experience`}
            </h2>
          </Reveal>
        </div>
        <div className="mt-14">
          <ProjectGallery slug={project.slug} name={project.name} gallery={project.gallery} />
        </div>
      </div>

      {/* location */}
      <LocationSection project={project} />
    </>
  );
}
