import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project-page";
import { projects } from "@/lib/site";

const project = projects.find((p) => p.slug === "avira");

export const metadata: Metadata = {
  title: "Avira — Ultra-luxury 3 & 3.5 BHK in Kokapet",
  description:
    "Avira by AVR Developers: ultra-luxury 3 & 3.5 BHK residences in Kokapet, Hyderabad. 172 units across 2 towers with a full clubhouse and pool deck. RERA P02400011038.",
  alternates: { canonical: "/avira" },
};

export default function Page() {
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
