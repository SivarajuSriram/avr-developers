import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PrivacyPolicyContent } from "@/components/sections/privacy-policy-content";

export const metadata: Metadata = {
  title: "Privacy Policy | AVR Developers",
  description:
    "How AVR Developers collects, uses, and protects the information you share through our enquiry forms for Evania, Avira, and Careers.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro="What we collect when you enquire about a home with us, how it's used, and the choices you have over it."
        divider={false}
      />
      <PrivacyPolicyContent />
    </>
  );
}
