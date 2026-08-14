"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ResponsiveImage } from "@/components/ui/responsive-image";

const SLIDES = [
  {
    src: "/avira/Avira-Home-Banner-1.webp",
    mobileSrc: "/avira/avira-Home-Banner-mobile-1.webp",
    alt: "Avira by AVR Developers, luxury residences in Kokapet, Hyderabad",
  },
  {
    src: "/evania/Evania-Home-Banner-1.webp",
    mobileSrc: "/evania/evania-hero-mobile-1.webp",
    alt: "Evania by AVR Developers, luxury residences in Kokapet, Hyderabad",
  },
];

const INTERVAL = 3000;

/** Cross-fades the hero banner between the two flagship projects' elevation
 * renders. Both slides stay mounted (crossfade needs the outgoing frame on
 * screen while the incoming one fades in); only the first is `priority` so
 * it doesn't compete with the real LCP image for bandwidth. Reduced-motion
 * visitors get a static first frame instead of the loop. */
export function HeroBackground() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <>
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <ResponsiveImage
            src={slide.src}
            mobileSrc={slide.mobileSrc}
            alt={slide.alt}
            priority={i === 0}
            sizes="100vw"
            quality={70}
            className="object-cover"
          />
        </div>
      ))}
    </>
  );
}
