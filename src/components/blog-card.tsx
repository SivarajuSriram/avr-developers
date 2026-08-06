import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CoverImage } from "@/components/ui/cover-image";
import type { BlogPost } from "@/lib/blog-posts";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative">
        <CoverImage
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
  );
}
