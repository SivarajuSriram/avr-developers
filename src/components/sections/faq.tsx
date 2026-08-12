"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
  {
    q: "Where are your projects located?",
    a: "AVR Developers’ projects are strategically located in Hyderabad’s most promising residential corridors, offering excellent connectivity to key business hubs, educational institutions, and lifestyle destinations. Our current developments include Evania and Avira, designed to deliver a premium living experience in well-connected locations.",
  },
  {
    q: "What configurations do you offer?",
    a: "Our projects offer a range of thoughtfully designed residences in 3 BHK, 3.5 BHK, and 4 BHK configurations, catering to diverse lifestyle needs while ensuring spacious layouts, contemporary design, and superior comfort.",
  },
  {
    q: "Are your projects RERA registered?",
    a: "Yes. AVR Developers’ projects are registered under Telangana RERA, ensuring transparency, regulatory compliance, and confidence for our customers throughout their home-buying journey.",
  },
  {
    q: "Do you help with Home Loans?",
    a: "We work with leading banks and can connect you with the right people to make financing straightforward.",
  },
  {
    q: "How do I arrange a site visit?",
    a: "Scheduling a site visit is simple. You can get in touch with our sales team, and our representatives will assist you with a convenient appointment, provide project details, and arrange a guided tour of the property.",
  },
];

const defaultCta = { label: "Still have a question?", href: "/contact" };

export function Faq({
  eyebrow = "FAQs",
  heading = "The things people ask first.",
  faqs = defaultFaqs,
  cta = defaultCta,
}: {
  eyebrow?: string;
  heading?: string;
  faqs?: FaqItem[];
  /** Pass null to hide the link entirely (e.g. when this section already lives on the contact page). */
  cta?: { label: string; href: string } | null;
} = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-white/10 bg-ink-90 text-white/80">
      <div className="w-full px-5 pb-2 pt-8 lg:px-10 lg:pb-6 lg:pt-10">
        <Reveal>
          <p className="caps mb-4 text-[12px] font-medium text-accent">
            {eyebrow}
          </p>
          <h2 className="font-serif text-3xl font-light leading-[1.05] tracking-[-0.01em] md:text-5xl md:whitespace-nowrap">
            {heading}
          </h2>
          {cta && (
            <Link
              href={cta.href}
              className="link-underline group mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-white"
            >
              {cta.label}
              <ArrowRight
                size={15}
                strokeWidth={2.5}
                className="text-accent transition-transform duration-300 lg:group-hover:translate-x-1"
              />
            </Link>
          )}
        </Reveal>

        <dl className="mt-10 border-t border-white/10">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} index={i}>
                <div className="border-b border-white/10">
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-8 py-6 text-left"
                    >
                      <span className="font-serif text-xl text-white">
                        {item.q}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? "" : "lg:group-hover:rotate-[360deg]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus size={16} strokeWidth={1.75} />
                        ) : (
                          <Plus size={16} strokeWidth={1.75} />
                        )}
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"
                    }`}
                  >
                    <p className="max-w-[70ch] overflow-hidden text-[15px] leading-relaxed text-white/60">
                      {item.a}
                    </p>
                  </dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
