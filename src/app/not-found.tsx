import type { Metadata } from "next";
import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/responsive-image";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 text-center text-white">
      <ResponsiveImage
        src="/Home-page-hero.webp"
        mobileSrc="/home-page-hero-mobile.webp"
        alt=""
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/60" />

      <div className="relative">
        <p className="font-serif text-4xl font-light text-white/50 sm:text-5xl">
          404
        </p>
        <h1 className="mt-3 font-serif text-5xl font-light uppercase leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
          Page not found
        </h1>
        <p className="caps mx-auto mt-7 max-w-[46ch] text-[12px] font-medium text-white/70 sm:text-[13px]">
          Something is broken, please refresh the page or return to home page
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center rounded-full bg-accent px-9 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-accent-dark"
        >
          Go to home page
        </Link>
      </div>
    </section>
  );
}
