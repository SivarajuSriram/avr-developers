import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";

const faqs = [
  {
    q: "Where is Evania located?",
    a: "Evania sits in Kokapet, at the heart of Hyderabad's western corridor, minutes from the Financial District and the Outer Ring Road.",
  },
  {
    q: "What configurations are on offer?",
    a: "Evania offers light-filled 3.5 and 4 BHK corner residences. Our sister project Aurelia adds sky villas and penthouses in Narsingi.",
  },
  {
    q: "Are your projects RERA-registered?",
    a: "Yes. Every AVR project is RERA-registered, and we share the registration number and sanctioned plans with you upfront.",
  },
  {
    q: "How do I arrange a site visit?",
    a: "Tell us a little about what you're looking for and we'll set up a private, unhurried walk-through at a time that suits you.",
  },
];

export function Faq() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="caps mb-4 text-[12px] font-medium text-accent">
                Questions
              </p>
              <h2 className="max-w-[14ch] font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] lg:text-5xl">
                The things people ask first.
              </h2>
              <Link
                href="/contact"
                className="link-underline group mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-ink"
              >
                Still have a question?
                <ArrowRight
                  size={15}
                  weight="bold"
                  className="text-accent transition-transform duration-300 lg:group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

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
      </div>
    </section>
  );
}
