import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { ProjectsFeature } from "@/components/sections/projects-feature";
import { defaultFaqs } from "@/lib/faqs";

const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials),
);

/* mirrors the FAQ rendered in the footer on this page (footer-faq.tsx),
   so the schema never drifts from what's actually visible. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: defaultFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <ProjectsFeature />
      <Testimonials />
    </>
  );
}
