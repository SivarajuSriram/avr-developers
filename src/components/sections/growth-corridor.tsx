import { TrendUp, MapPinLine, Train, Buildings } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";

/* Illustrative growth-corridor figures — replace with confirmed data before launch. */
const drivers = [
  {
    icon: TrendUp,
    stat: "48%",
    label: "Price appreciation in Kokapet",
    detail: "Across 2021–25, among the fastest of any Hyderabad micro-market.",
  },
  {
    icon: MapPinLine,
    stat: "12 min",
    label: "To the Financial District",
    detail: "Direct access via the Outer Ring Road, no city-centre detour.",
  },
  {
    icon: Train,
    stat: "2027",
    label: "Metro connectivity, planned",
    detail: "A proposed extension bringing rail transit to the corridor's doorstep.",
  },
  {
    icon: Buildings,
    stat: "3",
    label: "New business parks announced",
    detail: "Fresh IT and business-park development within a 5 km radius.",
  },
];

export function GrowthCorridor() {
  return (
    <section className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* intro */}
          <div className="lg:col-span-5 lg:pt-2">
            <Reveal>
              <span className="caps text-[11px] font-medium text-accent">
                Why Invest Here
              </span>
              <h2 className="mt-4 max-w-[18ch] font-serif text-4xl font-light leading-[1.08] tracking-[-0.01em] lg:text-5xl">
                Kokapet is Hyderabad&rsquo;s fastest-growing address.
              </h2>
            </Reveal>
            <Reveal index={1}>
              <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ink-70">
                A decade of IT expansion along the Financial District has
                turned Kokapet and Narsingi into the city&rsquo;s next growth
                corridor, backed by new connectivity, business parks and
                social infrastructure arriving every year.
              </p>
              <p className="mt-6 text-[12px] text-ink-40">
                *Figures are illustrative and will be confirmed before launch.
              </p>
            </Reveal>
          </div>

          {/* growth drivers */}
          <div className="lg:col-span-7">
            <ul className="flex flex-col border-t border-line">
              {drivers.map((d, i) => (
                <Reveal key={d.label} index={i} as="li">
                  <div className="flex items-start gap-6 border-b border-line py-8">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong text-accent">
                      <d.icon size={19} weight="bold" />
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <p className="font-serif text-3xl font-light leading-none text-ink">
                          {d.stat}
                        </p>
                        <p className="text-[15px] font-medium text-ink">
                          {d.label}
                        </p>
                      </div>
                      <p className="mt-2 max-w-[48ch] text-[13.5px] leading-relaxed text-ink-55">
                        {d.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
