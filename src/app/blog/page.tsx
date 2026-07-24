import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/page-header";
import { BlogPosts } from "@/components/sections/blog-posts";

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
        intro="Notes on Hyderabad real estate, the Kokapet corridor and life inside AVR homes."
        divider={false}
        aside={
          <div className="rounded-md border border-line bg-surface p-8 lg:ml-auto lg:max-w-sm">
            <p className="max-w-[26ch] text-[13px] leading-relaxed text-ink-55">
              Got something about Evania or AVR you&rsquo;d like us to
              cover?
            </p>
            <Link
              href="/contact"
              className="link-underline group mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-ink"
            >
              Write to us
              <ArrowRight
                size={15}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        }
      />
      <BlogPosts />
    </>
  );
}
