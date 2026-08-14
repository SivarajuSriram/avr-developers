import { Faq, type FaqItem } from "@/components/sections/faq";

const faqs: FaqItem[] = [
  {
    q: "Where are your site offices?",
    a: "Our site offices are conveniently located to offer you easy access to project information, guided walkthroughs, and personalised assistance. Please get in touch with our team to know the nearest site office and schedule a visit.",
  },
  {
    q: "Which configurations are available?",
    a: "Our projects offer a range of thoughtfully designed residences in 3 BHK, 3.5 BHK, and 4 BHK configurations, catering to diverse lifestyle needs while ensuring spacious layouts, contemporary design, and superior comfort.",
  },
  {
    q: "Are the projects RERA-registered?",
    a: "Yes. Every AVR project is RERA-registered, and we share the registration number and sanctioned plans upfront.",
  },
  {
    q: "Can I visit on a weekend?",
    a: "Absolutely. Weekends are our busiest, so booking ahead means we can keep the walk-through private and unhurried.",
  },
  {
    q: "What projects does AVR currently offer?",
    a: "AVR currently offers two premium residential projects: AVR EVANIA and AVR AVIRA. Each project caters to different lifestyle aspirations while maintaining AVR's commitment to quality and customer satisfaction.",
  },
];

export function ContactFaq() {
  return (
    <Faq
      eyebrow="Good to know"
      heading="Common questions."
      faqs={faqs}
      cta={null}
    />
  );
}
