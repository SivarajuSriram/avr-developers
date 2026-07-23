import { Reveal } from "@/components/ui/reveal";

const faqs = [
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
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="caps mb-4 text-[12px] font-medium text-accent">
            Good to know
          </p>
          <h2 className="font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
            Common questions.
          </h2>
        </Reveal>
        <div className="lg:col-span-8">
          <dl className="border-t border-line">
            {faqs.map((item, i) => (
              <Reveal key={item.q} index={i}>
                <div className="grid gap-3 border-b border-line py-8 lg:grid-cols-12 lg:gap-8">
                  <dt className="font-serif text-xl text-ink lg:col-span-5">
                    {item.q}
                  </dt>
                  <dd className="max-w-[52ch] text-[15px] leading-relaxed text-ink-70 lg:col-span-7">
                    {item.a}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
