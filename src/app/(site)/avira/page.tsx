import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project-page";
import { projects } from "@/lib/site";

const project = projects.find((p) => p.slug === "avira");

export const metadata: Metadata = {
  title: "3 & 3.5 BHK Luxury Flats for Sale in Kokapet | Avira",
  description:
    "Discover premium living at Avira in Kokapet. Spacious 3 & 3.5 BHK luxury apartments near Financial District, Hyderabad. Schedule your site visit today!",
  alternates: { canonical: "/avira" },
  keywords:["3.5bhk flats for sale","3bhk apartments","apartments in kokapet"],
};

export default function Page() {
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
