import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LockSimpleOpen } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";

type FloorPlan = { config: string; image?: string };

export function FloorPlans({
  name,
  heading,
  plans,
}: {
  name: string;
  heading?: string;
  plans: FloorPlan[];
}) {
  return (
    <section id="floor-plans" className="scroll-mt-32 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <Reveal className="max-w-[70ch]">
          <p className="caps mb-4 text-[12px] font-medium text-accent">
            Layouts
          </p>
          <h2 className="font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
            {heading ?? "A Blueprint for Inspired Living."}
          </h2>
        </Reveal>

        <div
          className={
            plans.length === 1
              ? "mx-auto mt-16 max-w-md"
              : "mt-16 grid gap-6 sm:grid-cols-2"
          }
        >
          {plans.map((plan, i) => (
            <Reveal key={plan.config} index={i}>
              <FloorPlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloorPlanCard({ plan }: { plan: FloorPlan }) {
  return (
    <Link
      href="/contact"
      className="group block overflow-hidden rounded-sm border border-line bg-surface transition-colors lg:hover:border-line-strong"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={plan.image ?? `https://picsum.photos/seed/${plan.config}/900/700`}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="scale-110 object-cover blur-lg"
        />
        <div className="absolute inset-0 bg-ink/10" />
        <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur-sm">
          <LockSimpleOpen size={16} weight="bold" />
        </span>
      </div>
      <div className="flex items-center justify-between px-8 py-6">
        <h3 className="font-serif text-3xl font-light text-ink">{plan.config}</h3>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors lg:group-hover:border-accent lg:group-hover:bg-accent lg:group-hover:text-white">
          <ArrowRight size={18} weight="bold" />
        </span>
      </div>
    </Link>
  );
}
