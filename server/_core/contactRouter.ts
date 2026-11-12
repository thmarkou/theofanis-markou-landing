import { TRPCError } from "@trpc/server";
import { contactMessageSchema } from "@shared/schemas";
import { insertContactMessage } from "../db";
import { formatContactInboundBody } from "./contactMessageText";
import { getUserAgent } from "./httpCompat";
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
    const { sendContactOwnerEmail } = await import("./contactEmail");
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
      const userAgent = getUserAgent(ctx.req);
      const inbound = {
        name: input.name,
        email: input.email,
        company: input.company,
        locale: input.locale,
        message: input.message,
      };

      // Prefer SMTP first so a dead DATABASE_URL cannot block delivery.
      const [notified, emailed, stored] = await Promise.all([
        safelyNotifyOwner(inbound),
        safelySendOwnerEmail(inbound),
        (async () => {
          try {
            return await insertContactMessage({
              name: input.name,
              email: input.email,
              company: input.company ?? null,
              message: input.message,
              locale: input.locale,
              userAgent: userAgent ? userAgent.slice(0, 512) : null,
            });
          } catch (error) {
            console.error("[Contact] Database insert failed:", error);
            return null;
          }
        })(),
      ]);

      const persisted = stored !== null;

      // Do not show a fake success: visitors must not think you received the
      // inquiry when neither email nor DB persistence worked.
      if (!emailed && !persisted) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Contact delivery failed. Check SMTP configuration (and DATABASE_URL if used).",
        });
      }

      return {
        success: true,
        id: stored?.id ?? null,
        notified,
        emailed,
        persisted,
      } as const;
    }),
});
