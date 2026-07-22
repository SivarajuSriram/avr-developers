"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, CaretDown } from "@phosphor-icons/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { projects } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "phone", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reusable enquiry form. Self-contained light card (works on any background).
 * Client-side validation with full idle/submitting/success/error states.
 * Phone uses react-phone-input-2 (searchable, scrollable country list; the
 * country code is locked so it can't be deleted by accident).
 * TODO: wire `submit` to a real endpoint (Next route handler / email service);
 * right now it simulates a successful send.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("91");
  const [countryCode, setCountryCode] = useState("in");

  async function handleSubmit(e: any) {
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

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    try {
      // Simulated send. Replace with a real POST to your endpoint.
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-md border border-line bg-surface p-8 text-ink">
        <CheckCircle size={32} weight="fill" className="text-accent" />
        <h3 className="font-serif text-2xl">Thank you.</h3>
        <p className="max-w-[42ch] text-[15px] leading-relaxed text-ink-70">
          Your enquiry is in. A member of the AVR team will be in touch within
          one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-md border border-line bg-surface p-6 text-ink sm:p-8"
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
            className={`flex w-full items-center rounded-sm border bg-canvas text-ink transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 overflow-visible ${errors.phone ? "border-accent" : "border-line-strong"}`}
          >
            <div className="relative flex items-center bg-canvas border-r border-line-strong overflow-visible shrink-0">
              
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
              className="flex-1 bg-transparent px-4 py-3 outline-none text-[15px]"
            />
          </div>
        </Field>
        <Field label="Interested in" htmlFor="project">
          <select id="project" name="project" required defaultValue={projects[0].name} className={inputCls}>
            {projects.map((p) => (
              <option key={p.slug}>{p.name}</option>
            ))}
            <option>General enquiry</option>
          </select>
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
        {status === "submitting" ? "Sending…" : "Send enquiry"}
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
  "w-full rounded-sm border border-line-strong bg-canvas px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-40 focus:border-accent focus:ring-2 focus:ring-accent/20";

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="flex items-center justify-between text-[12px] font-medium text-ink-70">
        <span>{label}</span>
        {hint && <span className="text-ink-40">{hint}</span>}
      </label>
      {children}
      {error && <span className="text-[12px] text-accent">{error}</span>}
    </div>
  );
}
