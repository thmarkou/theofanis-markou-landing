import { z } from "zod";

/**
 * Environment validation.
 *
 * Vercel often injects empty strings for unset vars — treat those as missing
 * so optional URLs / ports do not fail the whole schema (which would crash
 * the serverless entry and make tRPC clients see non-JSON error pages).
 */

const emptyToUndefined = (v: unknown): unknown => {
  if (v === undefined || v === null) return undefined;
  if (typeof v === "string" && v.trim() === "") return undefined;
  return v;
};

const optionalTrimmedString = z.preprocess((v: unknown) => {
  const u = emptyToUndefined(v);
  if (u === undefined) return undefined;
  if (typeof u !== "string") return undefined;
  const t = u.trim();
  return t === "" ? undefined : t;
}, z.string().min(1).optional());

/** Accepts missing / blank; invalid URLs become undefined so the app still boots. */
const optionalUrl = z.preprocess((v: unknown) => {
  const u = emptyToUndefined(v);
  if (u === undefined || typeof u !== "string") return undefined;
  try {
    return new URL(u.trim()).toString();
  } catch {
    console.warn("[env] Omitted invalid URL env value.");
    return undefined;
  }
}, z.string().url().optional());

const baseSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.preprocess((v: unknown) => {
    const cleaned = emptyToUndefined(v);
    const n = cleaned === undefined ? 3000 : Number(cleaned);
    return Number.isFinite(n) && n > 0 ? n : 3000;
  }, z.number().int().positive()),

  JWT_SECRET: z.preprocess(
    (v: unknown) => (typeof v === "string" ? v.trim() : v),
    z
      .string()
      .min(32, "JWT_SECRET must be at least 32 characters for HMAC security")
  ),

  VITE_APP_ID: optionalTrimmedString,
  OAUTH_SERVER_URL: optionalUrl,

  DATABASE_URL: z.preprocess(emptyToUndefined, z.string().min(1).optional()),

  BUILT_IN_FORGE_API_URL: optionalUrl,
  BUILT_IN_FORGE_API_KEY: optionalTrimmedString,

  OWNER_OPEN_ID: optionalTrimmedString,

  SMTP_HOST: z.preprocess((v: unknown) => {
    const u = emptyToUndefined(v);
    if (typeof u !== "string") return undefined;
    const t = u.trim();
    return t === "" ? undefined : t;
  }, z.string().optional()),

  SMTP_PORT: z.preprocess((v: unknown) => {
    const cleaned = emptyToUndefined(v);
    if (cleaned === undefined) return 587;
    const n = Number(cleaned);
    return Number.isFinite(n) && n > 0 ? n : 587;
  }, z.number().int().positive()),

  SMTP_USER: optionalTrimmedString,
  SMTP_PASS: optionalTrimmedString,

  CONTACT_TO_EMAIL: z.preprocess((v: unknown) => {
    const u = emptyToUndefined(v);
    if (typeof u !== "string") return undefined;
    const t = u.trim();
    return t === "" ? undefined : t;
  }, z.string().email().optional()),
});

const productionStricter = baseSchema.superRefine((env, ctx) => {
  if (env.NODE_ENV !== "production") return;

  const required = ["DATABASE_URL"] as const;
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
