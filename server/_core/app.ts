import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express, { type Express } from "express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { registerOAuthRoutes } from "./oauth";

/**
 * Builds the stateless Express application that exposes the OAuth callback
 * and the tRPC API.
 *
 * This factory is intentionally side-effect free and free of any concerns
 * that belong to a specific runtime (Vite HMR, static file serving, port
 * binding, process.listen). That separation lets the same app be reused by:
 *
 *   - the local dev server (`server/_core/index.ts`), which layers Vite
 *     middleware + HTTP listen on top.
 *   - the Vercel serverless entry (`api/index.ts`), which simply
 *     `export default`s the app so Vercel's Node runtime can invoke it.
 *
 * Keeping initialization cheap + synchronous is important for serverless
 * cold starts: the app is built once per warmed instance and then reused
 * across subsequent invocations.
 */
export function createApiApp(): Express {
  const app = express();

  // 1MB is generous for the contact form + any tRPC payloads we currently
  // accept. Raising this limit globally invites abuse, so uploads should
  // be gated with route-specific multipart handling if ever reintroduced.
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));

  registerOAuthRoutes(app);

  app.use(
    "/api/trpc",
    createExpressMiddleware({ router: appRouter, createContext })
  );

  return app;
}
