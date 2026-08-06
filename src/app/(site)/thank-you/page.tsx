import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-[640px] flex-col items-center justify-center px-5 py-24 text-center lg:px-10">
      <CheckCircle size={48} weight="fill" className="text-accent" />
      <h1 className="mt-6 font-serif text-4xl font-light leading-[1.1] tracking-[-0.01em] lg:text-5xl">
        Thank you.
      </h1>
      <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ink-70 lg:text-base">
        Your enquiry is in. A member of the AVR team will be in touch within
        one business day.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-3 rounded-sm bg-accent px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors lg:hover:bg-accent-dark"
      >
        Back to home
        <ArrowRight
          size={16}
          weight="bold"
          className="transition-transform duration-300 lg:group-hover:translate-x-1"
        />
      </Link>
    </section>
  );
}
