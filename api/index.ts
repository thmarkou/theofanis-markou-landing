import "dotenv/config";
import express from "express";

/**
 * Vercel serverless entry. Lazy-load the real Express app so import-time
 * failures can be returned as JSON (tRPC expects JSON, not plain-text errors).
 */
let cachedApp: express.Express | null = null;
let bootError: Error | null = null;

async function getInnerApp(): Promise<express.Express> {
  if (bootError) throw bootError;
  if (cachedApp) return cachedApp;
  try {
    const { createApiApp } = await import("../server/_core/app");
    cachedApp = createApiApp();
    return cachedApp;
  } catch (err) {
    bootError = err instanceof Error ? err : new Error(String(err));
    throw bootError;
  }
}

const wrapper = express();
wrapper.use((req, res, next) => {
  void getInnerApp()
    .then(inner => {
      inner(req, res, next);
    })
    .catch(err => {
      console.error("[api] Boot failure:", err);
      res.status(500).type("application/json").json({
        error: "SERVER_BOOT_FAILED",
        message: err instanceof Error ? err.message : String(err),
      });
    });
});

export default wrapper;
