import "dotenv/config";
import { createApiApp } from "../server/_core/app";

/**
 * Vercel serverless entry for `/api`.
 *
 * Subpaths (`/api/trpc`, `/api/oauth/...`) are routed here via `vercel.json`
 * rewrites. Optional catch-all filenames like `[[...path]].ts` are a Next.js
 * convention and are not reliable for plain Vite deployments on Vercel.
 */
const app = createApiApp();

export default app;
