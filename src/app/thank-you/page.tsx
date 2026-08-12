import type { Metadata } from "next";
import { Suspense } from "react";
import { ThankYouContent } from "@/components/thank-you-content";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
