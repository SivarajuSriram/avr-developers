"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import PhoneInput from "react-phone-input-2";
import { INTEREST_OPTIONS } from "@/lib/contact-interest";
import { formatIstTimestamp } from "@/lib/format-ist-timestamp";
import { projects } from "@/lib/site";

type Status = "idle" | "submitting" | "error";
type Errors = Partial<Record<"name" | "email" | "phone" | "interest", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reusable enquiry form. Self-contained light card (works on any background).
 * Client-side validation; redirects to /thank-you on success.
 * Phone uses react-phone-input-2 (searchable, scrollable country list; the
 * country code is locked so it can't be deleted by accident).
 *
 * On submit the enquiry goes out two ways in parallel: /api/contact (SMTP
 * email via Nodemailer, server-side) and a Pabbly Connect webhook (for
 * CRM/Sheet/WhatsApp automations) via `NEXT_PUBLIC_PABBLY_WEBHOOK_URL`. The
 * SMTP_* vars are currently placeholder values (see .env.local); drop in a
 * real SMTP account when ready. Either integration failing doesn't block the
 * other, the brochure download, or the redirect. A lead should never get
 * stuck because one is down.
 * When "Interested in" names a specific project with a brochure on file, that
 * project's PDF downloads automatically before the redirect.
 *
 * `bare` drops the outer border/bg/padding so the form can sit inside a card
 * the parent already provides (e.g. the contact page's overlapping hero card).
 *
 * `interestOptions`/`interestLabel` let a caller repurpose the dropdown for a
 * non-project context (e.g. the careers page picking a job listing instead
 * of a project) without duplicating the rest of the form. `webhookUrl`
 * likewise lets a caller point at a different Pabbly workflow (e.g. careers
 * applications routing separately from project leads); falls back to the
 * site-wide default. `interestPlaceholder`, when set, starts the dropdown
 * unselected (showing that text) instead of defaulting to the first option,
 * and requires an explicit pick before submit.
 */
export function ContactForm({
  bare = false,
  interestOptions = INTEREST_OPTIONS,
  interestLabel = "Interested in",
  interestPlaceholder,
  webhookUrl = process.env.NEXT_PUBLIC_PABBLY_WEBHOOK_URL,
}: {
  bare?: boolean;
  interestOptions?: readonly string[];
  interestLabel?: string;
  interestPlaceholder?: string;
  webhookUrl?: string;
} = {}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("91");
  const [countryCode, setCountryCode] = useState("in");
  const [interest, setInterest] = useState<string>(interestPlaceholder ? "" : interestOptions[0]);
  const [interestOpen, setInterestOpen] = useState(false);
  const interestRef = useRef<HTMLDivElement>(null);
  const phoneFieldRef = useRef<HTMLDivElement>(null);

  // Loaded lazily so this stylesheet doesn't get hoisted into the
  // render-blocking <head> of every page the form appears on (most of them,
  // via the footer) — see the same fix on leaflet.css in location-map-canvas.tsx.
  useEffect(() => {
    import("react-phone-input-2/lib/style.css");
  }, []);

  useEffect(() => {
    const dropdown = phoneFieldRef.current?.querySelector(".flag-dropdown");
    if (!dropdown) return;
    // react-phone-input-2 auto-scrolls the country list to the selected
    // country on open. Whatever row ends up straddling the top edge at that
    // scroll offset gets clipped incorrectly by Chrome, leaving a sliver of
    // its flag visible above the list. Resetting the scroll to the top
    // avoids landing on that broken offset (confirmed scrollTop 0 never
    // glitches; any other offset can).
    const observer = new MutationObserver(() => {
      if (!dropdown.classList.contains("open")) return;
      requestAnimationFrame(() => {
        const list = phoneFieldRef.current?.querySelector<HTMLUListElement>(".country-list");
        if (list) list.scrollTop = 0;
      });
    });
    observer.observe(dropdown, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!interestOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (!interestRef.current?.contains(e.target as Node)) setInterestOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setInterestOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [interestOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please tell us your name.";
    if (!email) next.email = "An email address is required.";
    else if (!EMAIL_RE.test(email)) next.email = "That email doesn't look right.";
    if (!phone || phone.replace(/\D/g, "").length < 5)
      next.phone = "A phone number is required.";
    if (interestPlaceholder && !interest)
      next.interest = `Please select ${interestLabel.toLowerCase()}.`;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    try {
      const message = String(data.get("message") ?? "").trim();
      const payload = {
        name,
        email,
        phone: `+${dialCode}${phone}`,
        interest,
        position: interest, // For careers Pabbly connect
        message,
        timestamp: formatIstTimestamp(),
        source: webhookUrl === process.env.NEXT_PUBLIC_PABBLY_WEBHOOK_URL_CAREERS ? "careers" : "contact"
      };

      // Wrapped in async IIFEs so a bad placeholder value (e.g. an invalid
      // webhook URL) rejects instead of throwing synchronously and skipping
      // straight to the outer catch before the other integration runs.
      await Promise.allSettled([
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        fetch(webhookUrl!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      ]);

      const brochure = projects.find((p) => p.name === interest)?.brochure;
      if (brochure) {
        const link = document.createElement("a");
        link.href = brochure;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      router.push(`/thank-you?interest=${encodeURIComponent(interest)}`);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`text-ink ${bare ? "" : "rounded-md border border-line bg-surface p-6 sm:p-8"}`}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" error={errors.name}>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputCls} placeholder="Full name" />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} placeholder="Email address" />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone}>
          <div
            className={`field-draw-border flex w-full min-w-0 items-center rounded-sm border bg-canvas text-ink transition-colors overflow-visible ${errors.phone ? "border-accent" : "border-line-strong"}`}
          >
            <div
              ref={phoneFieldRef}
              className="relative flex items-center bg-canvas border-r border-line-strong overflow-visible shrink-0"
            >
              
              <div className="flex items-center gap-1.5 px-2 py-3 pointer-events-none">
                 <div className="flex items-center gap-1">
                   <div className="react-tel-input pointer-events-none" style={{ width: '16px', height: '11px', flexShrink: 0, transform: 'scale(1.1)', transformOrigin: 'left center', position: 'relative' }}>
                     <div className={`flag ${countryCode}`} style={{ position: 'absolute', inset: 0, margin: 0 }} />
                   </div>
                   <span className="text-[15px] font-medium text-ink">+{dialCode}</span>
                 </div>
                 <CaretDown size={14} className="text-ink-55 shrink-0" />
              </div>

              <div className="absolute inset-0 z-10 cursor-pointer">
                <PhoneInput
                  country="in"
                  onChange={(value, country) => {
                    if (country && "dialCode" in country) setDialCode(country.dialCode);
                    if (country && "countryCode" in country) setCountryCode(country.countryCode as string);
                  }}
                  enableSearch
                  disableSearchIcon
                  countryCodeEditable={false}
                  containerClass="invisible-phone-input"
                />
              </div>
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="Phone number"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 outline-none text-[15px]"
            />
          </div>
        </Field>
        <Field label={interestLabel} htmlFor="interest-trigger" error={errors.interest}>
          <div ref={interestRef} className="relative">
            <input type="hidden" name="interest" value={interest} />
            <button
              id="interest-trigger"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={interestOpen}
              onClick={() => setInterestOpen((o) => !o)}
              className={`${selectCls} flex items-center justify-between text-left ${
                !interest ? "text-ink-40" : ""
              }`}
            >
              <span>{interest || interestPlaceholder}</span>
              <CaretDown
                size={14}
                className={`text-ink-55 shrink-0 transition-transform ${interestOpen ? "rotate-180" : ""}`}
              />
            </button>
            {interestOpen && (
              <ul
                role="listbox"
                className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-sm border border-line-strong bg-canvas shadow-lg"
              >
                {interestOptions.map((opt) => (
                  <li key={opt} role="option" aria-selected={opt === interest}>
                    <button
                      type="button"
                      onClick={() => {
                        setInterest(opt);
                        setInterestOpen(false);
                      }}
                      className={`block w-full px-3 py-2 text-left text-[13px] transition-colors lg:hover:bg-line/50 sm:px-4 sm:py-2.5 sm:text-[15px] ${opt === interest ? "text-accent" : "text-ink"}`}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Field>
        <Field
          label="Message"
          htmlFor="message"
          hint="Optional"
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`${inputCls} resize-none`}
            placeholder="Tell us a bit more..."
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 text-[13px] text-accent">
          Something went wrong sending your enquiry. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-6 inline-flex items-center gap-3 rounded-sm bg-accent px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-accent-dark disabled:opacity-70"
      >
        {status === "submitting" ? "Submitting..." : "Submit"}
        {status !== "submitting" && (
          <ArrowRight size={16} weight="bold" className="transition-transform duration-300 lg:group-hover:translate-x-1" />
        )}
      </button>

      <p className="mt-5 max-w-[60ch] text-[12px] leading-relaxed text-ink-40">
        By submitting I authorise AVR Developers to contact me via call, SMS or
        WhatsApp. This overrides NDNC registration.
      </p>
    </form>
  );
}

const inputCls =
  "field-draw-border w-full rounded-sm border border-line-strong bg-canvas px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-40";

const selectCls =
  "field-draw-border w-full rounded-sm border border-line-strong bg-canvas px-3 py-2 text-[13px] text-ink outline-none transition-colors sm:px-4 sm:py-3 sm:text-[15px]";

function Field({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label htmlFor={htmlFor} className="flex items-center justify-between text-[12px] font-medium text-ink-70">
        <span>{label}</span>
        {hint && <span className="text-ink-40">{hint}</span>}
      </label>
      {children}
      {error && <span className="text-[12px] text-accent">{error}</span>}
    </div>
  );
}
