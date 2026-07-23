import { EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export function ContactInfoForm() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
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
                {site.address.line1}
                <br />
                {site.address.locality}, {site.address.region} {site.address.postalCode}
              </p>
            </Detail>
          </dl>
        </Reveal>

        <Reveal index={1} className="lg:col-span-8">
          <ContactForm />
        </Reveal>
      </div>
    </section>
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
