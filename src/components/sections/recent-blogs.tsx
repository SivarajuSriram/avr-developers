import { Reveal } from "@/components/ui/reveal";
import { BlogCard } from "@/components/blog-card";
import { blogPosts } from "@/lib/blog-posts";

export function RecentBlogs({ currentSlug }: { currentSlug: string }) {
  const posts = blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-14">
        <Reveal>
          <h2 className="font-serif text-3xl font-light leading-[1.08] lg:text-4xl">
            More from the Journal
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} index={i}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
