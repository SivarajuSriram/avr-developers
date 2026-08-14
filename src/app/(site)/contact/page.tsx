import type { Metadata } from "next";
import { ContactTour } from "@/components/sections/contact-tour";
import { ContactFaq } from "@/components/sections/contact-faq";

export const metadata: Metadata = {
  title: "Contact AVR Developers | Luxury Apartments in Kokapet",
  description:
    "Get in touch with AVR Developers for luxury apartments in Kokapet. Schedule a site visit, request details, or connect with our team today!",
  alternates: { canonical: "/contact" },
  keywords:["contact AVR Developers","luxury apartments enquiry Kokapet","book site visit Kokapet apartments","AVR Developers Kokapet"],
};

export default function ContactPage() {
  return (
    <>
      <ContactTour />
      <ContactFaq />
    </>
  );
}
