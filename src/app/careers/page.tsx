import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CareersApply } from "@/components/sections/careers-apply";
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
        intro="Discover a professional environment where every day brings new opportunities and collaboration thrives. Be part of a team that values progress and drives innovation. Build the future with AVR Developers."
      />
      <CareersApply />
      <CareersWhyAvr />
      <CareersHowHiringWorks />
    </>
  );
}
