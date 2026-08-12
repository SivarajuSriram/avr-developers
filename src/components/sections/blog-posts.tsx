import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";
import { CoverImage } from "@/components/ui/cover-image";
import { BlogCard } from "@/components/blog-card";
import { blogPosts } from "@/lib/blog-posts";

export function BlogPosts() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pb-14 lg:px-10 lg:pb-20">
        <Reveal>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="relative">
              <CoverImage
                src={featured.image}
                alt={featured.title}
                sizes="100vw"
                className="aspect-[4/3] rounded-sm lg:aspect-[16/9]"
                imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:scale-[1.03]"
              />
              <span className="caps absolute left-4 top-4 z-10 rounded-xs bg-canvas/90 px-2.5 py-1 text-[10px] font-medium text-ink backdrop-blur-sm">
                {featured.category}
              </span>
            </div>
            <div className="mt-6">
              <p className="caps text-[12px] font-medium text-ink-40">
                Published on {featured.date}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-light leading-[1.15] text-ink transition-colors lg:whitespace-nowrap lg:group-hover:text-accent lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-ink-70 lg:max-w-none lg:whitespace-nowrap">
                {featured.excerpt}
              </p>
              <span className="link-underline mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-ink">
                Read the full story
                <ArrowRight
                  size={15}
                  weight="bold"
                  className="transition-transform duration-300 lg:group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {rest.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10 lg:py-20">
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} index={i % 3}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
