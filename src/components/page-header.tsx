import { Reveal } from "@/components/ui/reveal";

/**
 * Consistent editorial header for interior pages. Renders the page's single
 * h1. Sits on the canvas (the site header is solid on these pages), with top
 * padding that clears the fixed header.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
        {eyebrow && (
          <Reveal>
            <p className="caps mb-5 text-[12px] font-medium text-accent">
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal index={eyebrow ? 1 : 0}>
          <h1 className="max-w-[18ch] font-serif text-5xl font-light leading-[1.02] tracking-[-0.01em] lg:text-7xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal index={eyebrow ? 2 : 1}>
            <p className="mt-8 max-w-[54ch] text-[15px] leading-relaxed text-ink-70 lg:text-base">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
