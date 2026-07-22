"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Subtle scroll parallax on a framed image. Rewritten on top of motion's
 * useScroll/useTransform — the inner picture drifts a small, fixed amount as the
 * frame passes through the viewport. No GSAP/ScrollTrigger, so there are no
 * refresh jumps; motion smooths the scroll value natively. Disabled under
 * prefers-reduced-motion. `strength` is the drift in % of the frame height.
 */
export function ParallaxImage({
  src,
  alt,
  sizes = "(max-width: 1024px) 100vw, 60vw",
  className = "",
  imageClassName = "",
  priority = false,
  strength = 6,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  strength?: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`],
  );

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      {/* oversized so the drift never exposes an edge */}
      <motion.div
        style={{ 
          y: reduce ? 0 : y, 
          top: "-15%", 
          bottom: "-15%", 
          left: "-10%", 
          right: "-10%" 
        }}
        className="absolute will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      </motion.div>
    </div>
  );
}
