import type { CSSProperties } from "react";
import Image from "next/image";

/**
 * Art-directed `next/image` in `fill` mode: swaps in a separate mobile-res
 * render below `lg`, instead of just serving a scaled-down desktop crop.
 * Renders a single image when no `mobileSrc` is given — same as a plain
 * `<Image fill>`.
 *
 * Both variants are always in the DOM, but `display:none` on the hidden one
 * does NOT stop the browser from fetching it: when `priority` is set, Next
 * emits an unconditional `<link rel=preload>` per `<Image>`, so naively
 * passing `priority` to both would preload BOTH crops on every device,
 * fighting the real LCP image for bandwidth. To avoid that, `priority` mode
 * renders its own `media`-scoped preload links (only the matching breakpoint
 * fetches) and serves those two images `unoptimized`, so the preloaded URL
 * is byte-for-byte the one the `<img>` tag requests — running them through
 * the `/_next/image` optimizer would preload a different URL than what
 * actually renders, defeating the preload. Source files should already be
 * pre-sized/compressed for their breakpoint.
 */
export function ResponsiveImage({
  src,
  mobileSrc,
  alt,
  sizes = "100vw",
  mobileSizes = "100vw",
  priority,
  loading,
  quality,
  className = "",
  style,
}: {
  src: string;
  mobileSrc?: string;
  alt: string;
  sizes?: string;
  mobileSizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  quality?: number;
  className?: string;
  style?: CSSProperties;
}) {
  if (!mobileSrc) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={loading}
        sizes={sizes}
        quality={quality}
        className={className}
        style={style}
      />
    );
  }

  return (
    <>
      {priority && (
        <>
          <link
            rel="preload"
            as="image"
            href={mobileSrc}
            media="(max-width: 1023px)"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            href={src}
            media="(min-width: 1024px)"
            fetchPriority="high"
          />
        </>
      )}
      <Image
        src={mobileSrc}
        alt={alt}
        fill
        unoptimized={priority}
        loading={priority ? "eager" : loading}
        sizes={mobileSizes}
        quality={quality}
        className={`lg:hidden ${className}`}
        style={style}
      />
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={priority}
        loading={priority ? "eager" : loading}
        sizes={sizes}
        quality={quality}
        className={`hidden lg:block ${className}`}
        style={style}
      />
    </>
  );
}
