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
}): Promise<{ ok: boolean; reason?: "not_configured" | "send_failed" }> {
  try {
    const { sendContactOwnerEmail } = await import("./contactEmail");
    return await sendContactOwnerEmail(params);
  } catch (error) {
    console.warn("[Contact] Owner email skipped:", error);
    return { ok: false, reason: "send_failed" };
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
      const [notified, emailResult, stored] = await Promise.all([
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

      const emailed = emailResult.ok;
      const persisted = stored !== null;

      // Do not show a fake success: visitors must not think you received the
      // inquiry when neither email nor DB persistence worked.
      if (!emailed && !persisted) {
        const message =
          emailResult.reason === "not_configured"
            ? "Contact email is not configured on the server (missing SMTP_USER / SMTP_PASS on Vercel)."
            : "Contact email could not be sent. Check the Gmail App Password and SMTP settings on Vercel, then Redeploy.";
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message,
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
