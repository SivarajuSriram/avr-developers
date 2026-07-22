"use client";

import { usePathname } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

/**
 * The footer's enquiry block. Hidden on /contact, which already carries the
 * primary form near the top of the page, so the form never appears twice.
 */
export function FooterContact() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <div
      id="contact"
      className="grid grid-cols-1 scroll-mt-24 gap-12 border-b border-white/10 pb-16 lg:grid-cols-2 lg:gap-20"
    >
      <div>
        <h2 className="max-w-[16ch] font-serif text-4xl font-light leading-[1.05] text-white lg:text-5xl">
          Let&rsquo;s find your next address.
        </h2>
        <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-white/60">
          Tell us what you&rsquo;re looking for and we&rsquo;ll arrange a private
          walk-through, at a time that suits you.
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
      </div>
      <ContactForm />
    </div>
  );
}
