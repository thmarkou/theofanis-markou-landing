import nodemailer from "nodemailer";
import { ENV } from "./env";
import { formatContactInboundBody } from "./contactMessageText";

const SUBJECT_PREFIX = "[Landing contact]";

function resolveSmtpHost(): string {
  if (ENV.smtpHost.trim()) return ENV.smtpHost.trim();
  if (ENV.smtpUser.includes("@gmail.")) return "smtp.gmail.com";
  return "";
}

/**
 * Sends the contact submission to the owner inbox via SMTP (e.g. Gmail).
 * Returns false when SMTP is not configured or send fails (non-throwing).
 */
export async function sendContactOwnerEmail(params: {
  name: string;
  email: string;
  company: string | undefined;
  locale: string;
  message: string;
}): Promise<boolean> {
  const pass = ENV.smtpPass;
  const user = ENV.smtpUser.trim();
  const host = resolveSmtpHost();
  const toRaw = ENV.contactToEmail.trim();
  const to = toRaw || user;

  if (!host || !user || !pass || !to) {
    return false;
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
    return true;
  } catch (error) {
    console.warn("[Contact] SMTP send failed:", error);
    return false;
  }
}
