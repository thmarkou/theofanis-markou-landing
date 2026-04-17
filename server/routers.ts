import { COOKIE_NAME } from "@shared/const";
import { contactRouter } from "./_core/contactRouter";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  // Socket.io routes (if added later) must be registered in server/_core/index.ts.
  // All tRPC paths live under /api/trpc so the gateway routes them correctly.
  system: systemRouter,
  contact: contactRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
