import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { HardHat, Megaphone, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { JOB_LISTINGS } from "@/lib/contact-interest";

/** Short, generic blurb + icon per role — keep in sync with JOB_LISTINGS (src/lib/contact-interest.tsx). */
const JOB_DETAILS: Record<(typeof JOB_LISTINGS)[number], { icon: LucideIcon; body: string }> = {
  "MEP Manager": {
    icon: Zap,
    body: "Plans and runs the mechanical, electrical, and plumbing work across our residential projects, from first drawings to final handover.",
  },
  "Project Manager (Civil)": {
    icon: HardHat,
    body: "Runs civil construction on our sites: schedules, contractors, and quality, start to finish.",
  },
  "Digital Marketing Manager": {
    icon: Megaphone,
    body: "Runs AVR Developers' digital marketing: campaigns and content that turn into site visits.",
  },
};

/**
 * Open roles, sourced from the same JOB_LISTINGS list the careers form's
 * dropdown uses, so this section can never drift out of sync with what's
 * actually selectable when someone applies below.
 */
export function OpenPositions() {
  return (
    <section className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="caps text-[12px] font-medium text-accent">
            Open Positions
          </p>
          <h2 className="mx-auto mt-4 max-w-[26ch] font-serif text-3xl font-light leading-[1.08] tracking-[-0.01em] md:text-5xl">
            We&rsquo;re hiring.
          </h2>
          <p className="mx-auto mt-6 max-w-[60ch] text-[15px] leading-relaxed text-ink-70">
            Three roles are open right now, across engineering, construction,
            and marketing. We&rsquo;re based in Hyderabad. Apply below and
            tell us which one you&rsquo;re going for.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {JOB_LISTINGS.map((role, i) => {
            const { icon: Icon, body } = JOB_DETAILS[role];
            return (
              <Reveal key={role} index={i + 1}>
                <div className="flex h-full flex-col rounded-md border border-line bg-surface p-8 transition-colors duration-300 lg:hover:border-accent">
                  <Icon
                    size={34}
                    strokeWidth={1.4}
                    className="text-accent"
                    aria-hidden
                  />
                  <h3 className="mt-6 font-serif text-xl text-ink sm:text-2xl">
                    {role}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-55">
                    {body}
                  </p>
                  <a
                    href="#contact"
                    className="group/apply mt-8 inline-flex items-center gap-2 self-start text-[13px] font-medium uppercase tracking-[0.1em] text-ink"
                  >
                    Apply now
                    <ArrowRight
                      size={15}
                      weight="bold"
                      className="text-accent transition-transform duration-300 lg:group-hover/apply:translate-x-1"
                    />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
