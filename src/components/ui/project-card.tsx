import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/lib/site";

export function ProjectCard({
  project,
  index = 0,
  linked = true,
}: {
  project: Project;
  index?: number;
  linked?: boolean;
}) {
  const body = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <Image
          src={project.image}
          alt={`${project.name} by AVR Developers`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:scale-[1.05]"
        />
        <span className="caps absolute left-4 top-4 rounded-xs bg-canvas/90 px-2.5 py-1 text-[10px] font-medium text-ink backdrop-blur-sm">
          {project.status}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-normal tracking-[0.02em] transition-colors lg:group-hover:text-accent lg:text-[1.75rem]">
            {project.name}
          </h3>
          <p className="mt-1 text-[13px] text-ink-55">
            {project.configuration} <span className="mx-1 text-rose">·</span>{" "}
            {project.location}
          </p>
        </div>
        {linked && (
          <span className="mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition-colors duration-300 lg:group-hover:border-accent lg:group-hover:bg-accent lg:group-hover:text-white">
            <ArrowUpRight size={17} weight="bold" />
          </span>
        )}
      </div>
    </>
  );

  return (
    <Reveal index={index}>
      {linked ? (
        <Link
          href={`/${project.slug}`}
          className="group block"
          aria-label={`${project.name}, ${project.configuration} in ${project.location}`}
        >
          {body}
        </Link>
      ) : (
        <div className="group block">{body}</div>
      )}
    </Reveal>
  );
}
