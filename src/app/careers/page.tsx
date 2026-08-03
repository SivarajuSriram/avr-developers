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
        intro="Join a team where progress is celebrated, ownership is encouraged, and every contribution helps build something that lasts. Grow your career with AVR Developers."
        divider={false}
        centered
      />
      {/** <CareersWhyAvr />
      <CareersHowHiringWorks />*/}
    </>
  );
}
