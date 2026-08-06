import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

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
    </>
  );
}
