import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project-page";
import { projects } from "@/lib/site";

const project = projects.find((p) => p.slug === "aurelia");

export const metadata: Metadata = {
  title: "Aurelia — Sky Villas & Penthouses in Narsingi",
  description:
    "Aurelia by AVR Developers: double-height sky villas and penthouses in Narsingi, Hyderabad, with private decks and skyline views.",
  alternates: { canonical: "/aurelia" },
};

export default function Page() {
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
