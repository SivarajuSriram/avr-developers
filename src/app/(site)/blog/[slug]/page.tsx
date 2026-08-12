import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";
import { RecentBlogs } from "@/components/sections/recent-blogs";
import { blogPosts } from "@/lib/blog-posts";

/**
 * Body text supports inline markdown-style links — [label](url) — so authors
 * can link out (or to another page on the site) without the data model
 * needing a richer body type. https:// urls open in a new tab; anything else
 * (e.g. /evania) is treated as an internal link and navigates in place.
 */
function renderBody(text: string) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    const [, label, href] = match;
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        key={i}
        href={href}
        className="text-accent underline underline-offset-2 transition-colors lg:hover:text-accent-dark"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>
    );
  });
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <section id="hero" className="relative min-h-[100dvh] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <section className="mx-auto max-w-[900px] px-5 pb-10 pt-10 lg:max-w-[1200px] lg:px-10 lg:pb-14 lg:pt-14">
        <Reveal>
          <h1 className="max-w-[26ch] font-serif text-5xl font-light leading-[1.05] tracking-[-0.01em] text-ink lg:text-7xl">
            {post.title}
          </h1>
          <p className="mt-6 text-[13px] font-medium text-ink-55">
            Published on <span className="text-ink-70">{post.date}</span>
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-10">
          {post.sections.map((section, i) => (
            <Reveal key={i} index={i}>
              {section.heading && (
                <h2 className="font-serif text-2xl font-light leading-snug text-ink lg:text-3xl">
                  {section.heading}
                </h2>
              )}
              <p className={`whitespace-pre-line text-[15px] leading-relaxed text-ink-70 ${section.heading ? "mt-4" : ""}`}>
                {renderBody(section.body)}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link
            href="/blog"
            className="link-underline group inline-flex items-center gap-2 text-[13px] font-medium text-ink-55"
          >
            <ArrowLeft
              size={14}
              weight="bold"
              className="transition-transform duration-300 lg:group-hover:-translate-x-1"
            />
            Back to all stories
          </Link>
        </Reveal>
      </section>

      <RecentBlogs currentSlug={post.slug} />
    </>
  );
}
