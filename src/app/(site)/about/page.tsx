import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/page-header";
import { Philosophy } from "@/components/sections/philosophy";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { AboutLeadership } from "@/components/sections/about-leadership";
import { withBreaks } from "@/lib/with-breaks";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AVR Developers builds future-ready homes in Hyderabad, founded on a family legacy of managing prime real estate.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={withBreaks("Excellence in Every|Square Foot")}
        titleClassName="max-w-none font-serif text-4xl font-light leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]"
        intro="We believe great developments are built on strong foundations: quality, integrity, and customer trust. At AVR Developers, we deliver spaces designed to enrich lifestyles and create lasting value for generations."
        image={{
          src: "/about/About-hero.webp",
          /* drop the mobile-res render at this path once available */
          mobileSrc: undefined,
          alt: "Aerial view of an AVR Developers project, set among mature greenery",
          position: "center 40%",
        }}
        aside={
          <div className="rounded-md border border-white/15 bg-white/10 p-8 backdrop-blur-md lg:ml-auto lg:max-w-sm">
            <p className="font-serif text-2xl font-light leading-snug text-white">
              A relationship with Hyderabad that predates our first
              blueprint.
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-3 rounded-sm bg-accent px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-accent-dark"
            >
              Get in Touch
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 lg:group-hover:translate-x-1"
              />
            </Link>
          </div>
        }
      />
      <WhyChooseUs />
      <Philosophy />
      <AboutLeadership />
    </>
  );
}
