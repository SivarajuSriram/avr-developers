import { Reveal } from "@/components/ui/reveal";

type Quote = { body: string; name: string; role: string };

const featured: Quote = {
  body: "We looked at nearly a dozen projects before Evania. It was the only one where the light and the open space felt designed for us, not added on a brochure.",
  name: "Kavya Rao",
  role: "Homeowner, Evania",
};

const supporting: Quote[] = [
  {
    body: "The team actually answered the hard questions on approvals and timelines. That honesty is why we booked.",
    name: "Aditya Verma",
    role: "Bought at Aurelia",
  },
  {
    body: "Six months in and the courtyard is where my kids spend every evening. It changed how we live.",
    name: "Meera Krishnan",
    role: "Homeowner, Evania",
  },
];

function Attribution({ name, role }: { name: string; role: string }) {
  return (
    <figcaption className="mt-6 flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink/5 font-serif text-[13px] text-ink">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </span>
      <span className="text-[13px] text-ink-70">
        <span className="font-medium text-ink">{name}</span>
        <span className="mx-1.5 text-line-strong">/</span>
        {role}
      </span>
    </figcaption>
  );
}

export function Testimonials() {
  return (
    <section className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
        <Reveal>
          <h2 className="max-w-[14ch] font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] sm:text-4xl lg:max-w-none">
            Words from the people who live here.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* featured */}
          <Reveal className="lg:col-span-7">
            <figure>
              <blockquote className="font-serif text-2xl font-light italic leading-[1.35] text-ink sm:text-[1.9rem]">
                &ldquo;{featured.body}&rdquo;
              </blockquote>
              <Attribution name={featured.name} role={featured.role} />
            </figure>
          </Reveal>

          {/* supporting */}
          <div className="flex flex-col gap-10 lg:col-span-5 lg:border-l lg:border-line lg:pl-16">
            {supporting.map((q, i) => (
              <Reveal key={q.name} index={i + 1}>
                <figure className={i === 1 ? "border-t border-line pt-10" : ""}>
                  <blockquote className="text-[15px] leading-relaxed text-ink-70">
                    &ldquo;{q.body}&rdquo;
                  </blockquote>
                  <Attribution name={q.name} role={q.role} />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
