/**
 * Test bootstrap.
 *
 * Ensures required environment variables are populated before any module in
 * the test tree imports `server/_core/env.ts`. Without this, the Zod-backed
 * env validator would throw at import time and no tests could load.
 */
process.env.NODE_ENV ??= "test";
process.env.JWT_SECRET ??=
  "test-only-secret-at-least-32-characters-long-xxxxxxxxx";
