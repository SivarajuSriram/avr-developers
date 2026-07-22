import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Our Values",
  description:
    "The principles behind every AVR Developers home: considered design, green as standard, honest dealing and building to last.",
  alternates: { canonical: "/values" },
};

const values = [
  {
    title: "Work Ethics",
    body: "Our work ethics are non-negotiable and our on-time deliverables are sacrosanct. If we have made a promise, we will deliver.",
  },
  {
    title: "Uncompromising Integrity",
    body: "We are about uncompromising integrity and transparency. There is no fine print in our documentation and nothing to be read between the lines.",
  },
  {
    title: "Professionalism",
    body: "We hold professionalism and efficiency in high esteem. Every domain of creating the perfect address is handled by masters in their craft, spanning engineers, designers, architects, landscape artists, leisure management companies and more.",
  },
  {
    title: "Undeniable Edge",
    body: "Our ability to listen, respond and take action just the way our clientele wants us to gives us an undeniable edge.",
  },
  {
    title: "Attention to Detail",
    body: "Attention to detail is our thing. Nothing escapes our eye when it comes to space planning, aesthetics, the direction of sunlight and breeze, or the classic placement of sit-outs.",
  },
];

export default function ValuesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Values"
        title="What we won't compromise on."
        intro="A short list, held to on every project. These are the promises we would want if we were the ones buying a home."
      />

      {/* pull quote */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="max-w-[26ch] font-serif text-3xl font-light leading-[1.2] text-ink lg:text-[2.6rem]">
              Values are only worth anything at the moments they cost you
              something.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <ol className="[counter-reset:val]">
          {values.map((v, i) => (
            <Reveal key={v.title} index={i} as="li">
              <div className="grid gap-4 border-b border-line py-10 lg:grid-cols-12 lg:gap-10">
                <div className="flex items-baseline gap-5 lg:col-span-5">
                  <span className="font-serif text-lg font-light text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-2xl font-normal text-ink lg:text-3xl">
                    {v.title}
                  </h2>
                </div>
                <p className="max-w-[48ch] text-[15px] leading-relaxed text-ink-70 lg:col-span-7">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* how it shows up */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="caps mb-4 text-[12px] font-medium text-accent">
              In practice
            </p>
            <h2 className="max-w-[22ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
              What these promises look like on site.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "No hidden green",
                b: "Every landscaped metre in the brochure is a metre you can walk, not a render.",
              },
              {
                t: "Real approvals",
                b: "RERA numbers and sanction plans are shared upfront, before you commit anything.",
              },
              {
                t: "Fixed handover dates",
                b: "The date we quote is the date we plan against, tracked and reported openly.",
              },
              {
                t: "Materials you can check",
                b: "Specifications are written down and matched at handover, line by line.",
              },
              {
                t: "One point of contact",
                b: "A single person who knows your home stays with you from booking to keys.",
              },
              {
                t: "Long after the keys",
                b: "Snags, warranties and questions are ours to answer well beyond possession.",
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
    </>
  );
}
