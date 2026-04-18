import { contactMessageSchema } from "@shared/schemas";
import { TRPCError } from "@trpc/server";
import { insertContactMessage } from "../db";
import { sendContactOwnerEmail } from "./contactEmail";
import { formatContactInboundBody } from "./contactMessageText";
import { notifyOwner } from "./notification";
import { publicProcedure, router } from "./trpc";

const NOTIFICATION_TITLE_PREFIX = "New advisory inquiry";

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
      content: formatContactInboundBody(params),
    });
  } catch (error) {
    // Notification failures must not fail the user-visible submission:
    // the DB record is the authoritative store. We only log and continue.
    console.warn("[Contact] Owner notification skipped:", error);
    return false;
  }
}

async function safelySendOwnerEmail(params: {
  name: string;
  email: string;
  locale: string;
  company: string | undefined;
  message: string;
}): Promise<boolean> {
  try {
    return await sendContactOwnerEmail(params);
  } catch (error) {
    console.warn("[Contact] Owner email skipped:", error);
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

      const [notified, emailed] = await Promise.all([
        safelyNotifyOwner({
          name: input.name,
          email: input.email,
          company: input.company,
          locale: input.locale,
          message: input.message,
        }),
        safelySendOwnerEmail({
          name: input.name,
          email: input.email,
          company: input.company,
          locale: input.locale,
          message: input.message,
        }),
      ]);

      return { success: true, id: stored.id, notified, emailed } as const;
    }),
});
