import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";
import { blogPosts } from "@/lib/blog-posts";

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
      <section className="relative flex min-h-[64dvh] flex-col justify-end overflow-hidden text-white">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/35" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 pt-28 lg:px-10 lg:pb-24">
          <p className="caps mb-5 text-[12px] font-medium text-white/80">
            {post.category}
          </p>
          <h1 className="max-w-[24ch] font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] lg:text-6xl">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[760px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <Link
            href="/blog"
            className="link-underline group inline-flex items-center gap-2 text-[13px] font-medium text-ink-55"
          >
            <ArrowLeft
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to all stories
          </Link>
        </Reveal>

        <div className="mt-10 flex flex-col gap-12">
          {post.sections.map((section, i) => (
            <Reveal key={section.heading} index={i}>
              <h2 className="font-serif text-2xl font-light leading-snug text-ink lg:text-3xl">
                {section.heading}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-70">
                {section.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal index={post.sections.length}>
          <p className="mt-14 border-t border-line pt-8 text-[13px] leading-relaxed text-ink-40">
            This is a placeholder post. Got something about Evania or AVR
            you&rsquo;d like us to cover instead?{" "}
            <Link href="/contact" className="link-underline text-ink-55">
              Write to us
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </>
  );
}
