import type { CSSProperties } from "react";
import Image from "next/image";

/**
 * Art-directed `next/image` in `fill` mode: swaps in a separate mobile-res
 * render below `lg`, instead of just serving a scaled-down desktop crop.
 * Renders a single image when no `mobileSrc` is given — same as a plain
 * `<Image fill>`. Both variants are always in the DOM; the hidden one is
 * `display:none` at that breakpoint, which browsers skip fetching entirely.
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
      <Image
        src={mobileSrc}
        alt={alt}
        fill
        priority={priority}
        loading={loading}
        sizes={mobileSizes}
        quality={quality}
        className={`lg:hidden ${className}`}
        style={style}
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={loading}
        sizes={sizes}
        quality={quality}
        className={`hidden lg:block ${className}`}
        style={style}
      />
    </>
  );
}
