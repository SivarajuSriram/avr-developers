"use client";

import Link from "next/link";
import { useState } from "react";
import { CoverImage } from "../ui/cover-image";
import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { Reveal } from "../ui/reveal";
import { projects } from "@/lib/site";

export function ProjectsFeature() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* statement */}
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-[3.75rem]">
              A World Where
              <br />
              Possibilities Are
              <br />
              <span className="italic text-accent">Limitless.</span>
            </h2>
          </Reveal>

          {/* desktop-only: hovered project's detail fades in below the intro */}
          <div
            className="hidden lg:grid lg:transition-[grid-template-rows] lg:duration-500 lg:ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ gridTemplateRows: hovered ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              {projects.map(
                (project) =>
                  hovered === project.slug && (
                    <div
                      key={project.slug}
                      className={`max-w-[42ch] pt-8 transition-opacity duration-300 ${
                        hovered ? "opacity-100 delay-150" : "opacity-0"
                      }`}
                    >
                      <p className="mt-4 text-[15px] leading-relaxed text-ink-70">
                        {project.blurb}
                      </p>
                      <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                        {project.highlights.slice(0, 4).map((item) => (
                          <li
                            key={item.label}
                            className="flex items-center gap-3 text-[14px]"
                          >
                            <Check
                              size={15}
                              weight="bold"
                              className="shrink-0 text-accent"
                            />
                            {item.value ? `${item.value} ${item.label}` : item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        {/* offset project cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:gap-6">
          {projects.map((project, i) => (
            <Reveal key={project.slug} index={i}>
              <Link
                href={`/${project.slug}`}
                className="group relative block"
                aria-label={`${project.name}, ${project.configuration}`}
                onMouseEnter={() => setHovered(project.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative">
                  <CoverImage
                    src={project.image}
                    alt={`${project.name} by AVR Developers`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="relative aspect-[4/5] overflow-hidden rounded-sm"
                    imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 z-10 pointer-events-none rounded-sm bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100" />
                  <span className="caps absolute left-4 top-4 z-20 rounded-xs bg-canvas/90 px-2.5 py-1 text-[10px] font-medium text-ink backdrop-blur-sm">
                    {project.status}
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-normal tracking-[0.02em] transition-colors lg:group-hover:text-accent lg:text-[1.75rem]">
                      {project.name}
                    </h3>
                  </div>
                  <span className="mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-accent bg-accent text-white transition-colors duration-300 lg:border-line-strong lg:bg-transparent lg:text-ink lg:group-hover:border-accent lg:group-hover:bg-accent lg:group-hover:text-white">
                    <ArrowUpRight size={17} weight="bold" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
