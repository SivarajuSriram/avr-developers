import { Reveal } from "@/components/ui/reveal";

export function AboutLeadership() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <p className="caps text-[12px] font-medium text-accent">
            Leadership
          </p>
          <p className="mt-6 font-serif text-xl font-light leading-[1.4] text-ink sm:text-[1.7rem]">
            Building on a family legacy of 25+ years in Hyderabad real estate.
          </p>
          <p className="mt-4 text-[13px] font-medium text-ink">
            Arya Reddy{" "}
            <span className="font-normal text-ink-55">
              - AVR Developers
            </span>
          </p>
          <p className="mx-auto mt-6 max-w-[52ch] text-[15px] leading-relaxed text-ink-70">
            Arya holds a degree in Civil and Environmental Engineering
            from Pennsylvania State University. He began his career with
            Soletanche Bachy, working on defense infrastructure, before
            returning to lead AVR&rsquo;s construction ventures,
            building on his family&rsquo;s quarter-century in Hyderabad
            real estate.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
