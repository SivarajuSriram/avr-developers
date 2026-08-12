"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DownloadSimple, House } from "@phosphor-icons/react";
import { CoverImage } from "@/components/ui/cover-image";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/site";

/** Reads ?interest= (set by ContactForm on redirect) to personalise the
 * message and, when that project has a brochure on file, offer a manual
 * re-download alongside the automatic one the form already triggered. */
export function ThankYouContent() {
  const params = useSearchParams();
  const project = projects.find((p) => p.name === params.get("interest"));

  const body = project
    ? `Your interest in ${project.name} has been recorded. Our relationship manager will be in touch shortly to curate your private viewing experience.`
    : "Your enquiry has been recorded. A member of the AVR team will be in touch within one business day.";

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-24 text-center">
      <div className="absolute inset-0">
        <CoverImage
          src="/contact/contact-us-hero.webp"
          mobileSrc="/contact/contact-us-hero-mobile.webp"
          alt=""
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-ink-90/80" />
      </div>

      <div className="relative flex max-w-[720px] flex-col items-center">
        <Reveal>
          <span className="relative block h-12 w-[168px]">
            <Image
              src="/logo-light.png"
              alt="AVR Developers"
              fill
              sizes="168px"
              className="object-contain"
            />
          </span>
        </Reveal>

        <Reveal index={1}>
          <h1 className="caps mt-8 font-serif text-5xl font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Thank You
          </h1>
        </Reveal>

        <Reveal index={2}>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-white/75 lg:text-base">
            {body}
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {project?.brochure && (
              <a
                href={project.brochure}
                download
                className="inline-flex items-center gap-3 rounded-sm bg-accent px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-accent-dark"
              >
                <DownloadSimple size={16} weight="bold" />
                Download Brochure
              </a>
            )}
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-sm border border-white/30 px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-white/10"
            >
              <House size={16} weight="bold" />
              Back to Home
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
