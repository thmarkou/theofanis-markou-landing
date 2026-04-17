import "dotenv/config";
import { createApiApp } from "../server/_core/app";

/**
 * Vercel serverless entry point. All requests to `/api/*` are routed here
 * by Vercel's filesystem-based function resolution.
 *
 * Why not `serverless-http`?
 *   `serverless-http` translates between Express and AWS Lambda / API
 *   Gateway event shapes. Vercel's Node.js runtime already passes standard
 *   `IncomingMessage` / `ServerResponse` objects — exactly what Express
 *   consumes — so any wrapper adds latency and an unnecessary translation
 *   layer. Exporting the Express app directly is the officially recommended
 *   pattern (see https://vercel.com/guides/using-express-with-vercel).
 *
 * The app is created once at module load; warm invocations reuse the same
 * instance, so tRPC router construction and middleware wiring happen at
 * cold start only.
 */
const app = createApiApp();

export default app;
