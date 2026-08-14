import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { JOB_LISTINGS } from "@/lib/contact-interest";
import { site } from "@/lib/site";

/** Careers-only enquiry form: same ContactForm as everywhere else, but the
 * "interested in" dropdown offers open job listings instead of projects.
 * Rendered directly on /careers instead of the shared footer form, which
 * FooterContact suppresses on this route (see footer-contact.tsx).
 *
 * Same dark navy background and copy treatment as FooterContact uses on
 * every other page (it's normally nested inside the footer's own bg-ink-90
 * wrapper); since this section sits on its own above the actual footer here,
 * it carries that background itself, with its own border-b as the seam. */
export function CareersContact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-ink-90 text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 border-b border-white/10 px-5 pt-12 pb-10 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10 lg:pt-16 lg:pb-12">
        <Reveal>
          <p className="caps mb-4 text-[12px] font-medium text-accent">Careers</p>
          <h2 className="font-serif text-2xl font-light leading-[1.05] text-white lg:text-4xl">
            Build the Future
            <br />
            with AVR Developers
          </h2>
          <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-white/60">
            Tell us which role you&rsquo;re interested in, and our team will
            be in touch.
          </p>
          <dl className="mt-10 flex flex-col gap-4 text-[14px]">
            <div className="flex gap-4">
              <dt className="w-14 shrink-0 text-white/40">Email</dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-white/85 lg:hover:text-white"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            {site.phones.map((phone) => (
              <div key={phone} className="flex gap-4">
                <dt className="w-14 shrink-0 text-white/40">Phone</dt>
                <dd>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="link-underline text-white/85 lg:hover:text-white"
                  >
                    {phone}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal index={1}>
          <ContactForm
            interestOptions={JOB_LISTINGS}
            interestLabel="Position Applying For"
            interestPlaceholder="Select"
            webhookUrl={process.env.NEXT_PUBLIC_PABBLY_WEBHOOK_URL_CAREERS}
          />
        </Reveal>
      </div>
    </section>
  );
}
