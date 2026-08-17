import Link from "next/link";
import { site } from "@/lib/site";

type Section = {
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    title: "Introduction & scope",
    body: (
      <p>
        This policy explains what {site.legalName} collects when you visit{" "}
        {site.url.replace("https://", "")} or submit an enquiry for Evania or
        Avira, how that information is used and shared, and the choices you
        have over it. It applies to this website and every enquiry form on
        it, including the homepage, project pages, and the Careers page.
      </p>
    ),
  },
  {
    title: "Information we collect",
    body: (
      <>
        <p>When you submit an enquiry, we collect:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Your full name</li>
          <li>Your email address</li>
          <li>Your phone number, including country code</li>
          <li>
            The project or role you selected under &ldquo;Interested
            in&rdquo;
          </li>
          <li>Any message you choose to add</li>
        </ul>
        <p>
          We don&rsquo;t collect payment details, government ID, or any
          other sensitive information through this site.
        </p>
      </>
    ),
  },
  {
    title: "How we collect it",
    body: (
      <p>
        Most of it comes directly from you, through the enquiry form on the
        homepage, a project page, the Contact page, or the Careers page.
      </p>
    ),
  },
  {
    title: "How we use it",
    body: (
      <>
        <p>We use the details you submit to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Respond to your enquiry and answer your questions</li>
          <li>Schedule and coordinate site visits</li>
          <li>
            Send you the brochure for the project you selected, which
            downloads automatically once you submit the form
          </li>
          <li>Review job applications submitted through the Careers page</li>
        </ul>
      </>
    ),
  },
  {
    title: "Your consent to be contacted",
    body: (
      <p>
        When you submit an enquiry, you&rsquo;re giving {site.legalName}{" "}
        permission to call, SMS, or WhatsApp you back about it, even if your
        number is registered under India&rsquo;s National Do Not Call
        (NDNC) list. We only use this to respond to the enquiry you sent us,
        not for unrelated marketing.
      </p>
    ),
  },
  {
    title: "Who we share it with",
    body: (
      <>
        <p>Your enquiry is shared with:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Our internal sales team, by email, so they can follow up with
            you
          </li>
          <li>
            Pabbly Connect, the automation tool we use to log enquiries into
            our CRM and route WhatsApp/call follow-ups
          </li>
        </ul>
        <p>
          We don&rsquo;t sell your information to third parties, and we
          don&rsquo;t share it beyond what&rsquo;s needed to respond to
          your enquiry.
        </p>
      </>
    ),
  },
  {
    title: "Data retention",
    body: (
      <p>
        We keep enquiry and application details for as long as needed to
        respond to you and follow up on your interest, and for a reasonable
        period after in case you get back in touch. You can ask us to
        delete your details at any time; see{" "}
        <Link href="#your-rights" className="text-accent underline underline-offset-2">
          Your rights
        </Link>{" "}
        below.
      </p>
    ),
  },
  {
    title: "Data security",
    body: (
      <p>
        We take reasonable, industry-standard precautions to protect the
        information you share with us. No online transmission is ever
        completely risk-free, but we work to keep your data as safe as
        possible.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <p>
        You can ask us to access, correct, or delete the information
        we hold about you at any time by emailing{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-accent underline underline-offset-2"
        >
          {site.email}
        </a>
        . We&rsquo;ll respond as soon as we reasonably can.
      </p>
    ),
  },
  {
    title: "Children's privacy",
    body: (
      <p>
        This site and its enquiry forms are intended for adults inquiring
        about property purchases or employment, and aren&rsquo;t directed
        at, or knowingly collecting information from, anyone under 18.
      </p>
    ),
  },
  {
    title: "Changes to this policy & how to reach us",
    body: (
      <>
        <p>
          If we make changes to this policy, we&rsquo;ll post the updated
          version here with a revised date at the top of the page.
        </p>
        <p>
          For any questions about this policy or your information, reach us
          at:
        </p>
        <p className="text-ink">
          {site.legalName}
          <br />
          {site.legalAddress.line1}, {site.legalAddress.locality}
          <br />
          {site.legalAddress.city}, {site.legalAddress.region}{" "}
          {site.legalAddress.postalCode}
          <br />
          <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2">
            {site.email}
          </a>
          <br />
          {site.phones.join(" · ")}
        </p>
      </>
    ),
  },
];

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function PrivacyPolicyContent() {
  return (
    <section className="mx-auto max-w-[1400px] border-t border-line px-5 pb-14 pt-6 lg:px-10 lg:pb-20 lg:pt-8">
      <p className="mb-5 text-[12px] text-ink-40 lg:mb-6">
        Last updated 17 August 2026
      </p>
      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* sticky numbered contents, desktop only */}
        <nav aria-label="Sections" className="hidden lg:block">
          <div className="sticky top-32">
            <p className="caps mb-5 text-[11px] font-medium text-ink-40">
              On this page
            </p>
            <ol className="flex flex-col gap-1">
              {sections.map((s, i) => {
                const id = slugify(s.title);
                return (
                  <li key={id}>
                    <Link
                      href={`#${id}`}
                      className="flex items-baseline gap-2.5 rounded-sm border-l-2 border-line py-1.5 pl-3 text-[13px] font-medium leading-snug text-ink-55 transition-colors hover:border-accent hover:text-ink"
                    >
                      <span className="font-serif text-[11px] tabular-nums text-ink-40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title.split(" & ")[0].split(", how")[0]}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>

        {/* numbered sections */}
        <div className="flex flex-col gap-8">
          {sections.map((s, i) => {
            const id = slugify(s.title);
            return (
              <div key={id} id={id} className="scroll-mt-32 max-w-[68ch]">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-lg tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-xl font-semibold tracking-[-0.005em] lg:text-2xl">
                    {s.title}
                  </h2>
                </div>
                <div className="mt-4 flex flex-col gap-3 text-[14.5px] leading-relaxed text-ink-70">
                  {s.body}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
