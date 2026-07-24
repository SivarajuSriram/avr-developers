import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";

/**
 * Consistent editorial header for interior pages. Renders the page's single
 * h1. Sits on the canvas (the site header is solid on these pages), with top
 * padding that clears the fixed header.
 *
 * `image` and `aside` are optional, mutually exclusive right-column fills —
 * pages that pass neither keep the original plain text-only layout.
 * `image` gives the moody full-bleed photo + ink scrim treatment used by the
 * homepage hero/philosophy sections. `aside` drops arbitrary light-background
 * content (e.g. the contact form) into a right column next to the text,
 * without the dark treatment. `cta` renders a single primary button below
 * the intro, styled to match the homepage hero.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  aside,
  cta,
  divider = true,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: { src: string; alt: string; position?: string };
  aside?: ReactNode;
  cta?: { label: string; href: string };
  divider?: boolean;
}) {
  // When there's a photo backdrop and no custom aside, the CTA fills the
  // empty right column as a glass card instead of sitting below the intro.
  const ctaInRightColumn = Boolean(cta && image && !aside);
  const rightColumn =
    aside ??
    (ctaInRightColumn ? (
      <div className="rounded-md border border-white/15 bg-white/10 p-8 backdrop-blur-md lg:ml-auto lg:max-w-sm">
        <p className="font-serif text-2xl font-light leading-snug text-white">
          Ready to see it for yourself?
        </p>
        <Link
          href={cta!.href}
          className="group mt-6 inline-flex items-center gap-3 rounded-sm bg-accent px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-accent-dark"
        >
          {cta!.label}
          <ArrowRight
            size={16}
            weight="bold"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    ) : null);

  return (
    <header
      className={`relative overflow-hidden ${divider ? "border-b border-line" : ""} ${image ? "text-white" : ""}`}
    >
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: image.position ?? "center" }}
          />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-ink/30" />
        </>
      )}
      <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
        <div
          className={
            rightColumn
              ? "grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16"
              : undefined
          }
        >
          <div>
            {eyebrow && (
              <Reveal>
                <p
                  className={`caps mb-5 text-[12px] font-medium ${image ? "text-white/80" : "text-accent"}`}
                >
                  {eyebrow}
                </p>
              </Reveal>
            )}
            <Reveal index={eyebrow ? 1 : 0}>
              <h1 className="max-w-[18ch] font-serif text-5xl font-light leading-[1.02] tracking-[-0.01em] lg:text-7xl">
                {title}
              </h1>
            </Reveal>
            {intro && (
              <Reveal index={eyebrow ? 2 : 1}>
                <p
                  className={`mt-8 max-w-[54ch] text-[15px] leading-relaxed lg:text-base ${image ? "text-white/75" : "text-ink-70"}`}
                >
                  {intro}
                </p>
              </Reveal>
            )}
            {cta && !ctaInRightColumn && (
              <Reveal index={eyebrow ? 3 : 2}>
                <Link
                  href={cta.href}
                  className="group mt-10 inline-flex items-center gap-3 rounded-sm bg-accent px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-accent-dark"
                >
                  {cta.label}
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            )}
          </div>
          {rightColumn && <div>{rightColumn}</div>}
        </div>
      </div>
    </header>
  );
}
