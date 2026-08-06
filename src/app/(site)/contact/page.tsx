import type { Metadata } from "next";
import { ContactTour } from "@/components/sections/contact-tour";
import { ContactFaq } from "@/components/sections/contact-faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AVR Developers to book a private walk-through of Evania or Avira in Hyderabad.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ContactTour />
      <ContactFaq />
    </>
  );
}
