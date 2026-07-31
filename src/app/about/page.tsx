import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/page-header";
import { AboutStory } from "@/components/sections/about-story";
// import { AboutTrackRecord } from "@/components/sections/about-track-record";
import { AboutImageBand } from "@/components/sections/about-image-band";
import { AboutHowWeBuild } from "@/components/sections/about-how-we-build";
import { AboutLeadership } from "@/components/sections/about-leadership";

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
        title="Built on a long relationship with place."
        intro="Before AVR Developers, the AVR family spent decades stewarding prime real estate across Hyderabad. That patience shapes how we build today."
        image={{
          src: "/evania/rooftop.webp",
          alt: "Aerial view of an AVR Developers project, set among mature greenery",
          position: "center 40%",
        }}
        aside={
          <div className="rounded-md border border-white/15 bg-white/10 p-8 backdrop-blur-md lg:ml-auto lg:max-w-sm">
            <p className="font-serif text-2xl font-light leading-snug text-white">
              A relationship with this city that predates our first
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
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        }
      />
      <AboutStory />
      {/* <AboutTrackRecord /> */}
      <AboutImageBand />
      <AboutHowWeBuild />
      <AboutLeadership />
    </>
  );
}
