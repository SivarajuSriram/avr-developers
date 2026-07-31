import { Hero } from "@/components/sections/hero";
import { ProjectsFeature } from "@/components/sections/projects-feature";
import { Philosophy } from "@/components/sections/philosophy";
import { Milestones } from "@/components/sections/milestones";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsFeature />
      <Philosophy />
      {/* <Milestones /> */}
      <Testimonials />
      <WhyChooseUs />
      <Faq />
    </>
  );
}
