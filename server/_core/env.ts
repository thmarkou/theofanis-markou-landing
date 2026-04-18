import { z } from "zod";

/**
 * Environment validation.
 *
 * Split into two schemas so the app starts cleanly in local dev even when
 * optional integrations (OAuth, Forge storage, ownership) are absent, while
 * still failing fast in production if anything essential is missing.
 */

const baseSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),

  // Always required at boot — without a signing secret JWTs would be worthless.
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters for HMAC security"),

  // OAuth integration. Required in production so we never boot a broken login
  // flow, optional in development so contributors can work offline.
  VITE_APP_ID: z.string().optional(),
  OAUTH_SERVER_URL: z.string().url().optional(),

  // Database. Same rationale as OAuth — required in prod, optional locally.
  DATABASE_URL: z.string().min(1).optional(),

  // Manus Forge proxy (used by storage.ts). Fully optional, only needed when
  // a feature actually calls storagePut / storageGet.
  BUILT_IN_FORGE_API_URL: z.string().url().optional(),
  BUILT_IN_FORGE_API_KEY: z.string().optional(),

  OWNER_OPEN_ID: z.string().optional(),

  // Gmail (or other SMTP) — optional; when set, contact form also emails the owner.
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  /** Inbox for contact notifications. Defaults to SMTP_USER if omitted. */
  CONTACT_TO_EMAIL: z.preprocess(
    v => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z.string().email().optional()
  ),
});

const productionStricter = baseSchema.superRefine((env, ctx) => {
  if (env.NODE_ENV !== "production") return;

  const required = ["VITE_APP_ID", "OAUTH_SERVER_URL", "DATABASE_URL"] as const;
  for (const key of required) {
    if (!env[key]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [key],
        message: `${key} is required when NODE_ENV=production`,
      });
    }
  }
});

const parsed = productionStricter.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map(issue => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
  // Use stderr + non-zero exit so orchestrators (pm2, Docker) flag the failure.
  console.error(`[env] Invalid environment configuration:\n${issues}`);
  throw new Error("Environment validation failed. See logs above.");
}

const env = parsed.data;

export const ENV = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  isProduction: env.NODE_ENV === "production",
  isDevelopment: env.NODE_ENV === "development",

  appId: env.VITE_APP_ID ?? "",
  cookieSecret: env.JWT_SECRET,
  databaseUrl: env.DATABASE_URL ?? "",
  oAuthServerUrl: env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: env.OWNER_OPEN_ID ?? "",
  forgeApiUrl: env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: env.BUILT_IN_FORGE_API_KEY ?? "",

  smtpHost: env.SMTP_HOST ?? "",
  smtpPort: env.SMTP_PORT,
  smtpUser: env.SMTP_USER ?? "",
  smtpPass: env.SMTP_PASS ?? "",
  contactToEmail: env.CONTACT_TO_EMAIL ?? "",
} as const;

export type Env = typeof ENV;
