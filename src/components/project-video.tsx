"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function ProjectVideo({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
      <Reveal>
        <div ref={containerRef} className="relative aspect-video overflow-hidden rounded-sm bg-ink">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${title}`}
              className="group absolute inset-0 h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/30 transition-colors duration-300 lg:group-hover:bg-ink/40" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-ink transition-transform duration-300 lg:group-hover:scale-110">
                  <Play size={26} fill="currentColor" strokeWidth={0} className="ml-1" />
                </span>
              </span>
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
