import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { BlogNotice } from "@/components/sections/blog-notice";

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
      <BlogNotice />
    </>
  );
}
