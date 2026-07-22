import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join AVR Developers. Discover a professional environment where every day brings new opportunities and collaboration thrives.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Join our team."
        intro="Discover a professional environment where every day brings new opportunities and collaboration thrives. Be part of a team that values progress and drives innovation. Build the future with AVR Developers."
      />

      {/* apply */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-70">
            We don&rsquo;t publish a fixed list of openings &mdash; write to
            us with a short note about yourself and we&rsquo;ll get back to
            you.{" "}
            <Link
              href="/contact"
              className="link-underline font-medium text-ink"
            >
              Fill out the form
            </Link>{" "}
            or{" "}
            <a
              href={`mailto:${site.email}`}
              className="link-underline font-medium text-ink"
            >
              write to us
            </a>{" "}
            directly.
          </p>
        </Reveal>
      </section>

      {/* why AVR */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="caps mb-4 text-[12px] font-medium text-accent">
              Why AVR
            </p>
            <h2 className="max-w-[22ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
              A small team, real ownership.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Work that ships",
                b: "Projects you can walk through, not slides that never leave a deck. Your work stands on the ground.",
              },
              {
                t: "A seat at the table",
                b: "We're small enough that your judgement shapes the outcome, whatever your title says.",
              },
              {
                t: "Craft over churn",
                b: "We'd rather do fewer things properly. There's time here to get the details right.",
              },
              {
                t: "Learn across the whole",
                b: "See a project end to end, from land and design to sales and handover, not just your slice.",
              },
              {
                t: "Grow with us",
                b: "As the portfolio grows, the people who built it grow into leading it.",
              },
              {
                t: "Looked after",
                b: "Fair pay, health cover and a calm, respectful place to spend your days.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} index={i % 3}>
                <div className="border-t border-line pt-6">
                  <h3 className="font-serif text-xl text-ink">{item.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-70">
                    {item.b}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* how hiring works */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <h2 className="max-w-[18ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
            How hiring works.
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "You write in",
              b: "A short note and your work. No forms, no cover-letter theatre.",
            },
            {
              t: "A first conversation",
              b: "A relaxed call to understand what you're after and share what we're building.",
            },
            {
              t: "A closer look",
              b: "A practical chat, on site where it makes sense, with the people you'd work beside.",
            },
            {
              t: "An honest offer",
              b: "Clear terms, quickly. If it's a fit, we move without dragging it out.",
            },
          ].map((step, i) => (
            <Reveal key={step.t} index={i} as="li">
              <div className="border-t border-line pt-6">
                <span className="font-serif text-2xl font-light text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-xl text-ink">{step.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-70">
                  {step.b}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
