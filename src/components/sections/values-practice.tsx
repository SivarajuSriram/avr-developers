import { Reveal } from "@/components/ui/reveal";

const items = [
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
];

/* marginalia columns — the "In practice" proof points read like footnotes
   under the mosaic, not another card grid */
export function ValuesPractice() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="caps mb-10 text-[12px] font-medium text-accent">
            In practice
          </p>
        </Reveal>
        <div className="columns-1 gap-10 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <Reveal
              key={item.t}
              index={i % 3}
              className="mb-8 break-inside-avoid border-t border-line pt-4"
            >
              <h4 className="font-serif text-lg text-ink">{item.t}</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-70">
                {item.b}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
