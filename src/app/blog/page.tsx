import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on Hyderabad real estate, Kokapet's growth corridor and life at AVR Developers.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Stories from AVR."
        intro="We're building this out — notes on Hyderabad real estate, the Kokapet corridor and life inside AVR homes will live here."
      />

      <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-70">
            First posts are on the way. In the meantime,{" "}
            <a
              href={`mailto:${site.email}`}
              className="link-underline font-medium text-ink"
            >
              write to us
            </a>{" "}
            if there&rsquo;s something about Evania or AVR you&rsquo;d like us
            to cover.
          </p>
        </Reveal>
      </section>
    </>
  );
}
