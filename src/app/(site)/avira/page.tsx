import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project-page";
import { projects } from "@/lib/site";

const project = projects.find((p) => p.slug === "avira");

export const metadata: Metadata = {
  title: "Avira — Sky Villas & Penthouses in Narsingi",
  description:
    "Avira by AVR Developers: double-height sky villas and penthouses in Narsingi, Hyderabad, with private decks and skyline views.",
  alternates: { canonical: "/avira" },
};

export default function Page() {
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
