"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

/** YouTube's own play badge: rounded red rect, white triangle. */
function YouTubePlayBadge() {
  return (
    <svg viewBox="0 0 68 48" className="h-16 w-[5.7rem] drop-shadow-[0_6px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 lg:group-hover:scale-110">
      <path
        d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
        fill="#f00"
      />
      <path d="M45 24 27 14v20" fill="#fff" />
    </svg>
  );
}

export function ProjectVideo({
  videoId,
  title,
  playButton = "circle",
}: {
  videoId: string;
  title: string;
  playButton?: "circle" | "youtube";
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="mx-auto max-w-[1400px] py-14 lg:px-10 lg:py-32">
      <Reveal>
        <div className="relative aspect-video overflow-hidden lg:rounded-sm bg-ink">
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
                alt={`${title} video thumbnail`}
                title={`${title} video thumbnail`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/30 transition-colors duration-300 lg:group-hover:bg-ink/40" />
              <span className="absolute inset-0 flex items-center justify-center">
                {playButton === "youtube" ? (
                  <YouTubePlayBadge />
                ) : (
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-ink transition-transform duration-300 lg:group-hover:scale-110">
                    <Play size={26} fill="currentColor" strokeWidth={0} className="ml-1" />
                  </span>
                )}
              </span>
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
