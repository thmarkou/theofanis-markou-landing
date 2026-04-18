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

      let stored: Awaited<ReturnType<typeof insertContactMessage>> = null;
      try {
        stored = await insertContactMessage({
          name: input.name,
          email: input.email,
          company: input.company ?? null,
          message: input.message,
          locale: input.locale,
          userAgent: userAgent ? userAgent.slice(0, 512) : null,
        });
      } catch (error) {
        console.error("[Contact] Database insert failed:", error);
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

      return {
        success: true,
        id: stored?.id ?? null,
        notified,
        emailed,
        persisted: stored !== null,
      } as const;
    }),
});
