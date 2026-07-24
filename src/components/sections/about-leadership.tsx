import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function AboutLeadership() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px]">
              <Image
                src="/about/arya-reddy.jpg"
                alt="Arya Reddy, AVR Developers"
                fill
                sizes="(min-width: 1024px) 380px, 70vw"
                className="object-contain"
              />
            </div>
          </Reveal>
          <Reveal index={1} className="lg:col-span-7">
            <p className="caps text-[12px] font-medium text-accent">
              Leadership
            </p>
            <p className="mt-6 font-serif text-2xl font-light leading-[1.4] text-ink sm:text-[1.7rem]">
              &ldquo;Building on a family legacy of 25+ years in Hyderabad
              real estate.&rdquo;
            </p>
            <p className="mt-4 text-[13px] font-medium text-ink">
              Arya Reddy{" "}
              <span className="font-normal text-ink-55">
                &mdash; AVR Developers
              </span>
            </p>
            <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-ink-70">
              Arya holds a degree in Civil and Environmental Engineering
              from Pennsylvania State University. He began his career with
              Soletanche Bachy, working on defense infrastructure, before
              returning to lead AVR&rsquo;s construction ventures &mdash;
              building on his family&rsquo;s quarter-century in Hyderabad
              real estate.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
