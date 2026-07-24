"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/lib/site";

const LocationMapCanvas = dynamic(
  () => import("@/components/location-map-canvas").then((m) => m.LocationMapCanvas),
  { ssr: false },
);

const DEFAULT_CONNECTIVITY: NonNullable<Project["connectivity"]> = [
  { place: "Financial District", time: "10 min" },
  { place: "Outer Ring Road", time: "5 min" },
  { place: "Gachibowli", time: "15 min" },
  { place: "International Airport", time: "35 min" },
  { place: "Leading schools & hospitals", time: "Nearby" },
];

/* same category order as the original component: COMMERCIAL, HEALTHCARE, CONNECTIVITY, EDUCATION, RECREATION & LIFESTYLE */
const CATEGORY_ORDER = ["Commercial", "Healthcare", "Connectivity", "Education", "Recreation & Lifestyle"] as const;

export function LocationSection({ project }: { project: Project }) {
  const rows = project.connectivity ?? DEFAULT_CONNECTIVITY;
  const mapPoints =
    project.coordinates && rows.every((r) => r.lat != null && r.lng != null)
      ? rows.map((r) => ({ place: r.place, time: r.time, lat: r.lat!, lng: r.lng!, category: r.category, image: r.image }))
      : null;

  /* group rows by category (fixed display order), each row keeping its
     original index into `rows` so hover state still lines up with mapPoints */
  const grouped = rows.every((r) => r.category)
    ? CATEGORY_ORDER.map((category) => ({
        category,
        rows: rows.map((row, i) => ({ ...row, i })).filter((row) => row.category === category),
      })).filter((g) => g.rows.length)
    : [{ category: null, rows: rows.map((row, i) => ({ ...row, i })) }];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mountMap, setMountMap] = useState(false);
  const mapWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapPoints || mountMap) return;
    const el = mapWrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMountMap(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mountMap]);

  return (
    <section id="location" className="location-section scroll-mt-32 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="caps mb-4 text-[13px] font-medium text-accent">Proximity</p>
          <h2 className="location-title max-w-[24ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
            Where the city is heading.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-10">
          {/* left: category-grouped landmark list — hidden on mobile in favor of the map carousel */}
          <Reveal index={1} className="landmarks-list-container lg:col-span-4">
            <div className="distance-grid-new">
              {grouped.map((group) => (
                <div key={group.category ?? "all"} className="distance-box-new">
                  {group.category && <h3>{group.category}</h3>}
                  <ul>
                    {group.rows.map((row) => (
                      <li
                        key={row.place}
                        onMouseEnter={() => mapPoints && setActiveIndex(row.i)}
                        onMouseLeave={() => mapPoints && setActiveIndex(null)}
                        className={mapPoints && activeIndex === row.i ? "is-active" : undefined}
                      >
                        {row.place} &nbsp;&ndash;&nbsp; <AnimatedTime time={row.time} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          {/* right: interactive map (+ mobile image carousel, rendered inside the map component).
              min-w-0 is required: this grid column has no explicit track size on mobile (grid-cols-12
              is lg:-only), so without it the browser auto-sizes the column to the carousel's
              max-content width (a non-wrapping row of 70vw cards) instead of the viewport — blowing
              the whole page out into horizontal overflow. */}
          <Reveal index={2} className="min-w-0 lg:col-span-8">
            <div ref={mapWrapRef} id="map" className="relative h-[600px] w-full overflow-hidden rounded-md bg-canvas">
              {mapPoints ? (
                mountMap && (
                  <LocationMapCanvas
                    projectName={project.name}
                    projectImage={project.image}
                    center={project.coordinates!}
                    points={mapPoints}
                    activeIndex={activeIndex}
                  />
                )
              ) : (
                <iframe
                  title={`Map — ${project.name}, ${project.location}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${project.name}, ${project.location}`,
                  )}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-full w-full border-0 grayscale-[0.15]"
                />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AnimatedTime({ time }: { time: string }) {
  const match = time.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (target === null || !inView || reduce) return;
    const controls = animate(0, target, {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduce]);

  const shown = target === null ? time : `${reduce ? target : display}${match![2]}`;

  return <span ref={ref}>{shown}</span>;
}
