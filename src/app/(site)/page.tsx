import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { ProjectsFeature } from "@/components/sections/projects-feature";

const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials),
);

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsFeature />
      <Testimonials />
    </>
  );
}
