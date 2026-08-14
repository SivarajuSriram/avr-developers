import Link from "next/link";
import { FooterContact } from "@/components/footer-contact";
import { FooterFaq } from "@/components/footer-faq";
import { FooterLogo } from "@/components/footer-logo";
import { SocialIcons } from "@/components/social-icons";
import { nav, projects, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink-90 text-white/80">
      <div className="mx-auto max-w-[1400px] px-5 pb-4 lg:px-10 lg:pb-5">
        {/* contact (hidden on /contact, form already lives there) */}
        <FooterContact />

        {/* homepage FAQ, right after the contact form */}
        <FooterFaq />

        {/* columns */}
        <div className="grid gap-x-8 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.9fr_1fr] lg:gap-x-6">
          <div>
            <FooterLogo />
            <p className="mt-5 max-w-[38ch] text-[14px] leading-relaxed text-white/60">
              Crafting future-ready spaces where thoughtful design, lasting value, and modern lifestyles come together.
            </p>
          </div>

          <FooterCol title="Projects">
            {projects.map((p) => (
              <FooterLink key={p.slug} href={`/${p.slug}`}>
                {p.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            {[...nav.left.slice(2), ...nav.right].map((item) => (
              <FooterLink key={item.label} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Get in touch">
            <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
            {site.phones.map((phone) => (
              <FooterLink key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>
                {phone}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        {/* legal + socials */}
        <div
          id="footer-socials"
          className="flex flex-col gap-4 border-t border-white/10 pt-5 text-[12px] text-white/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All rights
            reserved.
          </p>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="caps mb-5 text-[11px] font-medium text-white/40">{title}</h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="link-underline text-[14px] text-white/75 transition-colors lg:hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
