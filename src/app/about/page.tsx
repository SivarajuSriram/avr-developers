import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AboutStory } from "@/components/sections/about-story";
import { AboutTrackRecord } from "@/components/sections/about-track-record";
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
      />
      <AboutStory />
      <AboutTrackRecord />
      <AboutImageBand />
      <AboutHowWeBuild />
      <AboutLeadership />
    </>
  );
}
