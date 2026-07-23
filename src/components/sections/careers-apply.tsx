import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export function CareersApply() {
  return (
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
  );
}
