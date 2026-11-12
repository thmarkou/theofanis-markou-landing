import nodemailer from "nodemailer";
import { ENV } from "./env";
import { formatContactInboundBody } from "./contactMessageText";

const SUBJECT_PREFIX = "[Landing contact]";

export type ContactEmailResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed" };

function resolveSmtpHost(): string {
  if (ENV.smtpHost.trim()) return ENV.smtpHost.trim();
  const user = ENV.smtpUser.trim().toLowerCase();
  if (user.endsWith("@gmail.com") || user.endsWith("@googlemail.com")) {
    return "smtp.gmail.com";
  }
  return "";
}

/**
 * Sends the contact submission to the owner inbox via SMTP (e.g. Gmail).
 * Never throws — callers decide whether missing SMTP / send failure is fatal.
 */
export async function sendContactOwnerEmail(params: {
  name: string;
  email: string;
  company: string | undefined;
  locale: string;
  message: string;
}): Promise<ContactEmailResult> {
  // Gmail displays app passwords as four groups; SMTP auth expects 16 chars, no spaces.
  const pass = ENV.smtpPass.replace(/\s+/g, "");
  const user = ENV.smtpUser.trim();
  const host = resolveSmtpHost();
  const toRaw = ENV.contactToEmail.trim();
  const to = toRaw || user;

  if (!host || !user || !pass || !to) {
    console.warn(
      "[Contact] SMTP not configured (need SMTP_USER, SMTP_PASS, and SMTP_HOST or a Gmail SMTP_USER).",
      {
        hasHost: Boolean(host),
        hasUser: Boolean(user),
        hasPass: Boolean(pass),
        hasTo: Boolean(to),
      }
    );
    return { ok: false, reason: "not_configured" };
  }

  const text = formatContactInboundBody(params);

  const transporter = nodemailer.createTransport({
    host,
    port: ENV.smtpPort,
    secure: ENV.smtpPort === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: { name: "Website contact form", address: user },
      replyTo: params.email,
      to,
      subject: `${SUBJECT_PREFIX} ${params.name}`,
      text,
    });
    return { ok: true };
  } catch (error) {
    console.warn("[Contact] SMTP send failed:", error);
    return { ok: false, reason: "send_failed" };
  }
}
