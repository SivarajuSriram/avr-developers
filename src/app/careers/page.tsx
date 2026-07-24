import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/page-header";
import { CareersWhyAvr } from "@/components/sections/careers-why-avr";
import { CareersHowHiringWorks } from "@/components/sections/careers-how-hiring-works";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join AVR Developers. Discover a professional environment where every day brings new opportunities and collaboration thrives.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Join our team."
        intro="Be part of a small team that values progress, real ownership and building things that last. Discover what it's like to grow with AVR Developers."
        divider={false}
        aside={
          <div className="rounded-md border border-line bg-surface p-8 lg:ml-auto lg:max-w-sm">
            <p className="text-[13px] font-medium text-ink">How to apply</p>
            <p className="mt-2 max-w-[30ch] text-[13px] leading-relaxed text-ink-55">
              We don&rsquo;t publish a fixed list of openings. Send a short
              note about yourself and your work, and we&rsquo;ll get back to
              you.
            </p>
            <Link
              href="/contact"
              className="link-underline group mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-ink"
            >
              Fill out the form
              <ArrowRight
                size={15}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        }
      />
      <CareersWhyAvr />
      <CareersHowHiringWorks />
    </>
  );
}
