import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactInfoForm } from "@/components/sections/contact-info-form";
import { ContactWhatToExpect } from "@/components/sections/contact-what-to-expect";
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
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        intro="Tell us what you're looking for and we'll arrange a private walk-through, at a time that suits you."
      />
      <ContactInfoForm />
      <ContactWhatToExpect />
      <ContactFaq />
    </>
  );
}
