import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";
import { formatIstTimestamp } from "@/lib/format-ist-timestamp";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  timestamp: string;
};

/**
 * Emails the enquiry via SMTP (Nodemailer). Server-side only, so the SMTP_*
 * credentials never reach the client bundle. Values in .env.local are
 * placeholders; swap in a real SMTP account (Gmail app password, SES,
 * Postmark, etc.) and drop the keys in when ready.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<ContactPayload> | null;
  const name = body?.name?.trim();
  const email = body?.email?.trim();
  const phone = body?.phone?.trim();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const interest = body?.interest?.trim() || "General enquiry";
  const message = body?.message?.trim();
  const timestamp = body?.timestamp?.trim() || formatIstTimestamp();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_PORT === "465",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const propfloApiUrl = process.env.PROPFLO_API_URL;
  let propfloUuid = process.env.PROPFLO_UUID || "";
  
  if (interest === "Evania" && process.env.PROPFLO_UUID_EVANIA) {
    propfloUuid = process.env.PROPFLO_UUID_EVANIA;
  } else if (interest === "Avira" && process.env.PROPFLO_UUID_AVIRA) {
    propfloUuid = process.env.PROPFLO_UUID_AVIRA;
  }

  const propfloPromise = propfloApiUrl
    ? fetch(propfloApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          secretkey: process.env.PROPFLO_SECRET_KEY || "",
          uuid: propfloUuid,
        },
        body: JSON.stringify({
          phoneNumber: phone,
          sourceTypeId: process.env.PROPFLO_SOURCE_TYPE_ID || "",
          sourceId: process.env.PROPFLO_SOURCE_ID || "",
          firstName: name,
          email: email,
          countryCode: "+91",
          campaignName: interest,
          description: message || "",
        }),
      }).catch((err) => console.error("PropFlo CRM error:", err))
    : Promise.resolve();

  const emailPromise = transporter.sendMail({
    from: process.env.SMTP_FROM || `"AVR Developers Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO_EMAIL || site.email,
    replyTo: email,
    subject: `New enquiry from ${name}: ${interest}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Interested in: ${interest}`,
      `Message: ${message || "(none)"}`,
      `Submitted: ${timestamp}`,
    ].join("\n"),
  }).catch((err) => console.error("Nodemailer error:", err));

  await Promise.allSettled([propfloPromise, emailPromise]);

  return NextResponse.json({ ok: true });
}
