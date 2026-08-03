import { Faq, type FaqItem } from "@/components/sections/faq";

const faqs: FaqItem[] = [
  {
    q: "Where are your site offices?",
    a: "Our primary experience centre is at Evania, Kokapet. We'll share exact directions and a parking note when we confirm your visit.",
  },
  {
    q: "Which configurations are available?",
    a: "Evania offers 3.5 and 4 BHK residences; Avira offers sky villas and penthouses. We'll walk you through live availability on your visit.",
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
    q: "Do you help with home loans?",
    a: "We work with leading banks and can connect you with the right people to make financing straightforward.",
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
