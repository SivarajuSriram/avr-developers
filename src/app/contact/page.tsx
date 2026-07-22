import type { Metadata } from "next";
import { EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AVR Developers to book a private walk-through of Evania or Aurelia in Hyderabad.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        intro="Tell us what you're looking for and we'll arrange a private walk-through, at a time that suits you."
      />

      <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* details */}
          <Reveal className="lg:col-span-4">
            <dl className="flex flex-col gap-8">
              <Detail icon={<EnvelopeSimple size={20} weight="regular" />} label="Email">
                <a href={`mailto:${site.email}`} className="link-underline text-ink">
                  {site.email}
                </a>
              </Detail>
              <Detail icon={<Phone size={20} weight="regular" />} label="Phone">
                <div className="flex flex-col gap-1">
                  {site.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="link-underline text-ink">
                      {phone}
                    </a>
                  ))}
                </div>
              </Detail>
              <Detail icon={<MapPin size={20} weight="regular" />} label="Site office">
                <p className="text-ink">
                  Evania, Kokapet
                  <br />
                  Hyderabad, Telangana
                </p>
              </Detail>
            </dl>
          </Reveal>

          {/* form */}
          <Reveal index={1} className="lg:col-span-8">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* what to expect */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <h2 className="max-w-[20ch] font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
              What a visit looks like.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {[
              {
                t: "We reach out",
                b: "A quick call within a working day to understand what you're looking for and set a time.",
              },
              {
                t: "A private walk-through",
                b: "An unhurried tour of the site, the model residence and the plans, no crowd, no pressure.",
              },
              {
                t: "Straight answers",
                b: "Pricing, approvals and timelines laid out clearly, so you can decide in your own time.",
              },
            ].map((step, i) => (
              <Reveal key={step.t} index={i} as="li">
                <div className="border-t border-line pt-6">
                  <span className="font-serif text-2xl font-light text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-ink">{step.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-70">
                    {step.b}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="caps mb-4 text-[12px] font-medium text-accent">
              Good to know
            </p>
            <h2 className="font-serif text-4xl font-light leading-[1.08] lg:text-5xl">
              Common questions.
            </h2>
          </Reveal>
          <div className="lg:col-span-8">
            <dl className="border-t border-line">
              {[
                {
                  q: "Where are your site offices?",
                  a: "Our primary experience centre is at Evania, Kokapet. We'll share exact directions and a parking note when we confirm your visit.",
                },
                {
                  q: "Which configurations are available?",
                  a: "Evania offers 3.5 and 4 BHK residences; Aurelia offers sky villas and penthouses. We'll walk you through live availability on your visit.",
                },
                {
                  q: "Are the projects RERA-registered?",
                  a: "Yes. Every AVR project is RERA-registered, and we share the registration number and sanctioned plans upfront.",
                },
                {
                  q: "Can I visit on a weekend?",
                  a: "Absolutely. Weekends are our busiest, so booking ahead means we can keep the walk-through private and unhurried.",
                },
                {
                  q: "Do you help with home loans?",
                  a: "We work with leading banks and can connect you with the right people to make financing straightforward.",
                },
              ].map((item, i) => (
                <Reveal key={item.q} index={i}>
                  <div className="grid gap-3 border-b border-line py-8 lg:grid-cols-12 lg:gap-8">
                    <dt className="font-serif text-xl text-ink lg:col-span-5">
                      {item.q}
                    </dt>
                    <dd className="max-w-[52ch] text-[15px] leading-relaxed text-ink-70 lg:col-span-7">
                      {item.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 text-accent">{icon}</span>
      <div>
        <dt className="caps mb-1.5 text-[11px] font-medium text-ink-40">
          {label}
        </dt>
        <dd className="text-[15px] leading-relaxed">{children}</dd>
      </div>
    </div>
  );
}
