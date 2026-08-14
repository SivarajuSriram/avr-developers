import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project-page";
import { projects } from "@/lib/site";

const project = projects.find((p) => p.slug === "evania");

export const metadata: Metadata = {
  title: "Evania Kokapet Apartments | 3.5 & 4 BHK Flats for Sale",
  description:
    "Explore Evania by AVR ,featuring premium 3.5 & 4 BHK luxury apartments in Kokapet with spacious homes, modern amenities and luxury living.Book site visit!",
  alternates: { canonical: "/evania" },
  keywords:["EVANIA by AVR","EVANIA Kokapet","luxury apartments in Kokapet","3.5 BHK flats in Kokapet","4 BHK flats in Kokapet","flats for sale in Kokapet"],
};

export default function Page() {
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
