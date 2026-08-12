"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/ui/reveal";

type Quote = {
  body: string;
  name: string;
  role: string;
  img: string;
};

const quotes: Quote[] = [
  {
    body: "We looked at nearly a dozen projects before Evania. It was the only one where the light and the open space felt designed for us, not added on a brochure.",
    name: "Kavya Rao",
    role: "Homeowner, Evania",
    img: "/testimonials/person-1.webp",
  },
  {
    body: "The team actually answered the hard questions on approvals and timelines. That honesty is why we booked.",
    name: "Aditya Verma",
    role: "Bought at Avira",
    img: "/testimonials/person-2.webp",
  },
  {
    body: "Six months in and the courtyard is where my kids spend every evening. It changed how we live.",
    name: "Meera Krishnan",
    role: "Homeowner, Evania",
    img: "/testimonials/person-3.webp",
  },
  {
    body: "Site visits, floor plans, handover — every stage was on the date they gave us at booking. No surprises.",
    name: "Rohan Malhotra",
    role: "Homeowner, Evania",
    img: "/testimonials/person-4.webp",
  },
  {
    body: "The finish quality held up to what the sample flat promised. That alone put them above the others we shortlisted.",
    name: "Priya Nair",
    role: "Bought at Avira",
    img: "/testimonials/person-5.webp",
  },
  {
    body: "We wanted a home our parents could visit and feel comfortable in too. The layout just works for three generations.",
    name: "Sanjay Iyer",
    role: "Homeowner, Evania",
    img: "/testimonials/person-6.webp",
  },
];

function Attribution({ name, role }: { name: string; role: string }) {
  return (
    <figcaption className="mt-1 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-ink-40">
      <span className="h-px w-6 bg-line-strong" aria-hidden />
      <span>
        <span className="text-ink">{name}</span>
        <span className="mx-1.5 normal-case text-line-strong">/</span>
        {role}
      </span>
    </figcaption>
  );
}

/* Card markup shared by both the desktop (embla) and mobile (button) carousels —
   only the outer sizing classes differ between the two call sites. */
function TestimonialCard({
  quote,
  className,
  imgHeightClassName,
  imgSizes,
  clampBody = true,
}: {
  quote: Quote;
  className: string;
  imgHeightClassName: string;
  imgSizes: string;
  /* desktop cards are a fixed height in a fixed-width scroller, so a 5-line
     clamp is safe there. The mobile card's text column is narrow enough that
     several of the longer quotes need 6+ lines — clamping there cut them off
     mid-sentence, so the mobile call site turns this off. */
  clampBody?: boolean;
}) {
  return (
    <div className={className}>
      <div className="overflow-hidden px-4 pt-5">
        <div className={`relative ${imgHeightClassName}`}>
          <Image
            src={quote.img}
            alt={quote.name}
            fill
            loading="lazy"
            sizes={imgSizes}
            className="object-contain object-bottom"
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-2.5 py-6 pl-1 pr-6">
        <span className="font-serif text-3xl leading-none text-accent/25">&ldquo;</span>
        <blockquote
          className={`font-sans text-[1.05rem] font-light leading-snug text-ink ${clampBody ? "line-clamp-5" : ""}`}
        >
          &ldquo;{quote.body}&rdquo;
        </blockquote>
        <Attribution name={quote.name} role={quote.role} />
      </div>
    </div>
  );
}

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [
    AutoScroll({ speed: 0.6, startDelay: 0, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);
  /* separate embla instance for the mobile prev/next carousel — loop:true clones the
     end slides so scrollNext()/scrollPrev() wrap seamlessly instead of the old manual
     translateX(-index*100%) approach, which animated straight from the last slide's
     offset back to 0% and visibly slid backwards through every card in between. */
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!mobileEmblaApi) return;
    const onSelect = () => setIndex(mobileEmblaApi.selectedScrollSnap());
    onSelect();
    mobileEmblaApi.on("select", onSelect);
    return () => {
      mobileEmblaApi.off("select", onSelect);
    };
  }, [mobileEmblaApi]);

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

        {/* mobile/tablet: single card + prev/next buttons, no drag/auto-scroll */}
        <div className="mt-10 px-5 lg:hidden">
          <div className="mx-auto max-w-[440px] overflow-hidden" ref={mobileEmblaRef}>
            <div className="flex">
              {quotes.map((q) => (
                <div key={q.name} className="w-full shrink-0">
                  <TestimonialCard
                    quote={q}
                    imgSizes="170px"
                    imgHeightClassName="h-[280px]"
                    clampBody={false}
                    className="grid min-h-[300px] grid-cols-[170px_1fr] items-center overflow-hidden rounded-lg border border-line bg-surface"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => mobileEmblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
              className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft size={16} weight="bold" />
            </button>
            <span className="text-[12px] tabular-nums text-ink-40">
              {index + 1} / {quotes.length}
            </span>
            <button
              type="button"
              onClick={() => mobileEmblaApi?.scrollNext()}
              aria-label="Next testimonial"
              className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* desktop: continuous auto-scrolling drag carousel */}
        <div
          ref={emblaRef}
          className="mt-14 hidden overflow-hidden lg:block"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 2%, black 98%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 2%, black 98%, transparent)",
          }}
        >
          <div className="flex -ml-4 pl-6 pr-10">
            {quotes.map((q) => (
              <div key={q.name} className="w-[48%] shrink-0 pl-4">
                <TestimonialCard
                  quote={q}
                  imgSizes="190px"
                  imgHeightClassName="h-[260px]"
                  className="grid h-[280px] grid-cols-[190px_1fr] items-center overflow-hidden rounded-lg border border-line bg-surface"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
