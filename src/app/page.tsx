import { Hero } from "@/components/sections/hero";
import { ProjectsFeature } from "@/components/sections/projects-feature";
import { Philosophy } from "@/components/sections/philosophy";
import { Milestones } from "@/components/sections/milestones";
import { LifestyleBento } from "@/components/sections/lifestyle-bento";
import { Testimonials } from "@/components/sections/testimonials";
import { GrowthCorridor } from "@/components/sections/growth-corridor";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsFeature />
      <Philosophy />
      <Milestones />
      <LifestyleBento />
      <Testimonials />
      <GrowthCorridor />
      <Faq />
    </>
  );
}
