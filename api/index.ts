import "dotenv/config";
import { createApiApp } from "../server/_core/app";

/**
 * Vercel serverless entry. Keep this synchronous: wrapping the app in extra
 * Express layers broke tRPC+SuperJSON responses ("Unable to transform response").
 */
const app = createApiApp();

export default app;
