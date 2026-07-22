import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join AVR Developers. We're a small team building future-ready homes in Hyderabad and always meeting people who care about the craft.",
  alternates: { canonical: "/careers" },
};

const roles = [
  { title: "Site Engineer", type: "Full-time", place: "Kokapet, Hyderabad" },
  { title: "Sales Associate", type: "Full-time", place: "Hyderabad" },
  { title: "Architectural Intern", type: "Internship", place: "Hyderabad" },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build things that outlast you."
        intro="We're a small team that cares about the details most people never notice. If that sounds like you, we'd like to talk."
      />

      {/* open roles */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <h2 className="font-serif text-2xl font-normal text-ink-70">
          Open roles
        </h2>
        <ul className="mt-8 border-t border-line">
          {roles.map((role, i) => (
            <Reveal key={role.title} index={i} as="li">
              <Link
                href={`/contact?role=${encodeURIComponent(role.title)}`}
                className="group flex flex-col gap-2 border-b border-line py-7 transition-colors lg:hover:bg-surface sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-serif text-xl text-ink lg:group-hover:text-accent lg:text-2xl">
                  {role.title}
                </span>
                <span className="flex items-center gap-4 text-[13px] text-ink-55">
                  {role.type}
                  <span className="text-line-strong">/</span>
                  {role.place}
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="text-ink-40 transition-colors lg:group-hover:text-accent"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal index={roles.length}>
          <p className="mt-12 max-w-[52ch] text-[15px] leading-relaxed text-ink-70">
            Don&rsquo;t see your role?{" "}
            <a
              href={`mailto:${site.email}`}
              className="link-underline font-medium text-ink"
            >
              Write to us
            </a>{" "}
            anyway. We keep good people in mind for what&rsquo;s next.
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
