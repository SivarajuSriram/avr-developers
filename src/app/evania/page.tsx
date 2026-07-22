import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project-page";
import { projects } from "@/lib/site";

const project = projects.find((p) => p.slug === "evania");

export const metadata: Metadata = {
  title: "Evania — Luxury 3.5 & 4 BHK in Kokapet",
  description:
    "Evania by AVR Developers: luxury 3.5 & 4 BHK residences in Kokapet, Hyderabad. Gated community with Club Evania, courtyards and a pool deck. RERA P02400009394.",
  alternates: { canonical: "/evania" },
};

export default function Page() {
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
