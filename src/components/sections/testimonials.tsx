"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Reveal } from "@/components/ui/reveal";

type Quote = { body: string; name: string; role: string };

const quotes: Quote[] = [
  {
    body: "We looked at nearly a dozen projects before Evania. It was the only one where the light and the open space felt designed for us, not added on a brochure.",
    name: "Kavya Rao",
    role: "Homeowner, Evania",
  },
  {
    body: "The team actually answered the hard questions on approvals and timelines. That honesty is why we booked.",
    name: "Aditya Verma",
    role: "Bought at Avira",
  },
  {
    body: "Six months in and the courtyard is where my kids spend every evening. It changed how we live.",
    name: "Meera Krishnan",
    role: "Homeowner, Evania",
  },
  {
    body: "Site visits, floor plans, handover — every stage was on the date they gave us at booking. No surprises.",
    name: "Rohan Malhotra",
    role: "Homeowner, Evania",
  },
  {
    body: "The finish quality held up to what the sample flat promised. That alone put them above the others we shortlisted.",
    name: "Priya Nair",
    role: "Bought at Avira",
  },
  {
    body: "We wanted a home our parents could visit and feel comfortable in too. The layout just works for three generations.",
    name: "Sanjay Iyer",
    role: "Homeowner, Evania",
  },
];

function Attribution({ name, role }: { name: string; role: string }) {
  return (
    <figcaption className="mt-6 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-40">
      <span className="h-px w-8 bg-line-strong" aria-hidden />
      <span>
        <span className="text-ink">{name}</span>
        <span className="mx-1.5 normal-case text-line-strong">/</span>
        {role}
      </span>
    </figcaption>
  );
}

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [
    AutoScroll({ speed: 0.6, startDelay: 0, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  return (
    <section className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1400px] py-24 lg:py-32">
        <div className="px-5 lg:px-10">
          <Reveal>
            <p className="caps text-[12.5px] font-medium tracking-[0.14em] text-ink-40">
              Testimonials
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-4 font-serif text-2xl font-light leading-[1.1] tracking-[-0.01em] sm:text-3xl lg:whitespace-nowrap lg:text-4xl">
              Words from the people who live here.
            </h2>
          </Reveal>
        </div>

        <div
          ref={emblaRef}
          className="mt-14 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <div className="flex gap-6 px-5 lg:px-10">
            {quotes.map((q) => (
              <div
                key={q.name}
                className="flex w-[85%] shrink-0 flex-col justify-between rounded-lg border border-line bg-surface p-8 sm:w-[60%] lg:w-[32%] lg:p-10"
              >
                <blockquote className="font-serif text-xl font-light leading-relaxed text-ink sm:text-[1.4rem]">
                  &ldquo;{q.body}&rdquo;
                </blockquote>
                <Attribution name={q.name} role={q.role} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
