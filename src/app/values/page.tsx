import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ValuesMosaic } from "@/components/sections/values-mosaic";
import { ValuesPractice } from "@/components/sections/values-practice";

export const metadata: Metadata = {
  title: "Our Values",
  description:
    "The principles behind every AVR Developers home: considered design, green as standard, honest dealing and building to last.",
  alternates: { canonical: "/values" },
};

export default function ValuesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Values"
        title="What we won't compromise on."
        intro="A short list, held to on every project. These are the promises we would want if we were the ones buying a home."
        image={{
          src: "/evania/facade.webp",
          alt: "Balcony view at an AVR Developers project, dusk",
          position: "center 75%",
        }}
        cta={{ label: "Get in Touch", href: "/contact" }}
      />
      <ValuesMosaic />
      <ValuesPractice />
    </>
  );
}
