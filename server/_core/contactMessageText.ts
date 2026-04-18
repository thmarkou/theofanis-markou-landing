/**
 * Plain-text body for contact notifications (DB log, Forge, email).
 */
export function formatContactInboundBody(params: {
  name: string;
  email: string;
  company: string | undefined;
  locale: string;
  message: string;
}): string {
  const { name, email, company, locale, message } = params;
  const lines = [
    `From: ${name} <${email}>`,
    company ? `Organization: ${company}` : null,
    `Locale: ${locale}`,
    "",
    message,
  ].filter((line): line is string => line !== null);
  return lines.join("\n");
}
