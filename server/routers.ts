import { COOKIE_NAME } from "@shared/const";
import type { Request as ExpressRequest } from "express";
import { contactRouter } from "./_core/contactRouter";
import {
  appendClearSessionCookie,
  getSessionCookieOptions,
} from "./_core/cookies";
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
      if (ctx.resHeaders) {
        appendClearSessionCookie(ctx.resHeaders, COOKIE_NAME, ctx.req);
      } else {
        const cookieOptions = getSessionCookieOptions(ctx.req as ExpressRequest);
        ctx.res!.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      }
      return {
        success: true,
      } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
