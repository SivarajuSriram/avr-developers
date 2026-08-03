import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { blogPosts } from "@/lib/blog-posts";

export function BlogPosts() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <Reveal>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="relative">
              <ParallaxImage
                src={featured.image}
                alt={featured.title}
                sizes="100vw"
                className="aspect-[16/9] rounded-sm lg:aspect-[21/9]"
                imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:scale-[1.03]"
              />
              <span className="caps absolute left-4 top-4 z-10 rounded-xs bg-canvas/90 px-2.5 py-1 text-[10px] font-medium text-ink backdrop-blur-sm">
                {featured.category}
              </span>
            </div>
            <div className="mt-8">
              <h2 className="font-serif text-3xl font-light leading-[1.15] text-ink transition-colors lg:whitespace-nowrap lg:group-hover:text-accent lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-ink-70">
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

      <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} index={i % 3}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative">
                  <ParallaxImage
                    src={post.image}
                    alt={post.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="aspect-[4/3] rounded-sm"
                    imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:scale-[1.05]"
                  />
                  <span className="caps absolute left-4 top-4 z-10 rounded-xs bg-canvas/90 px-2.5 py-1 text-[10px] font-medium text-ink backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-xl font-light leading-snug text-ink transition-colors lg:group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-55">
                  {post.excerpt}
                </p>
                <span className="link-underline mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                  Read more
                  <ArrowRight
                    size={13}
                    weight="bold"
                    className="transition-transform duration-300 lg:group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 lg:px-10 lg:pb-32">
        <Reveal>
          <p className="max-w-[52ch] border-t border-line pt-10 text-[15px] leading-relaxed text-ink-70">
            More stories are on the way.{" "}
            <Link href="/contact" className="link-underline font-medium text-ink">
              Write to us
            </Link>{" "}
            if there&rsquo;s something about Evania or AVR you&rsquo;d like
            us to cover next.
          </p>
        </Reveal>
      </section>
    </>
  );
}
