import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Careers at AVR Developers in Real Estate | AVR Developers",
  description:
    "Build your career with AVR Developers with a dynamic team, exciting opportunities and a culture built on learning and progress.",
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
    </>
  );
}
