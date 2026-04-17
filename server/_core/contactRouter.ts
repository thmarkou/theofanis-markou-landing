import { contactMessageSchema } from "@shared/schemas";
import { TRPCError } from "@trpc/server";
import { insertContactMessage } from "../db";
import { notifyOwner } from "./notification";
import { publicProcedure, router } from "./trpc";

const NOTIFICATION_TITLE_PREFIX = "New advisory inquiry";

/**
 * Formats a notification body with all submitted fields so the owner can read
 * the full message without needing to open the DB admin UI.
 */
function buildNotificationContent(params: {
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

async function safelyNotifyOwner(params: {
  name: string;
  email: string;
  locale: string;
  company: string | undefined;
  message: string;
}): Promise<boolean> {
  try {
    return await notifyOwner({
      title: `${NOTIFICATION_TITLE_PREFIX} — ${params.name}`,
      content: buildNotificationContent(params),
    });
  } catch (error) {
    // Notification failures must not fail the user-visible submission:
    // the DB record is the authoritative store. We only log and continue.
    console.warn("[Contact] Owner notification skipped:", error);
    return false;
  }
}

export const contactRouter = router({
  submit: publicProcedure
    .input(contactMessageSchema)
    .mutation(async ({ input, ctx }) => {
      const userAgent = ctx.req.headers["user-agent"] ?? null;

      const stored = await insertContactMessage({
        name: input.name,
        email: input.email,
        company: input.company ?? null,
        message: input.message,
        locale: input.locale,
        userAgent: typeof userAgent === "string" ? userAgent.slice(0, 512) : null,
      });

      // If the database is down we still refuse to silently drop the message:
      // callers must know we failed so they can retry or fall back to email.
      if (!stored) {
        throw new TRPCError({
          code: "SERVICE_UNAVAILABLE",
          message: "Contact message could not be stored. Please try again.",
        });
      }

      const notified = await safelyNotifyOwner({
        name: input.name,
        email: input.email,
        company: input.company,
        locale: input.locale,
        message: input.message,
      });

      return { success: true, id: stored.id, notified } as const;
    }),
});
