var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/_core/env.ts
import { z } from "zod";
var emptyToUndefined, optionalTrimmedString, optionalUrl, baseSchema, productionStricter, parsed, env, ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    emptyToUndefined = (v) => {
      if (v === void 0 || v === null) return void 0;
      if (typeof v === "string" && v.trim() === "") return void 0;
      return v;
    };
    optionalTrimmedString = z.preprocess((v) => {
      const u = emptyToUndefined(v);
      if (u === void 0) return void 0;
      if (typeof u !== "string") return void 0;
      const t2 = u.trim();
      return t2 === "" ? void 0 : t2;
    }, z.string().min(1).optional());
    optionalUrl = z.preprocess((v) => {
      const u = emptyToUndefined(v);
      if (u === void 0 || typeof u !== "string") return void 0;
      try {
        return new URL(u.trim()).toString();
      } catch {
        console.warn("[env] Omitted invalid URL env value.");
        return void 0;
      }
    }, z.string().url().optional());
    baseSchema = z.object({
      NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
      PORT: z.preprocess((v) => {
        const cleaned = emptyToUndefined(v);
        const n = cleaned === void 0 ? 3e3 : Number(cleaned);
        return Number.isFinite(n) && n > 0 ? n : 3e3;
      }, z.number().int().positive()),
      JWT_SECRET: z.preprocess(
        (v) => typeof v === "string" ? v.trim() : v,
        z.string().min(32, "JWT_SECRET must be at least 32 characters for HMAC security")
      ),
      VITE_APP_ID: optionalTrimmedString,
      OAUTH_SERVER_URL: optionalUrl,
      DATABASE_URL: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
      BUILT_IN_FORGE_API_URL: optionalUrl,
      BUILT_IN_FORGE_API_KEY: optionalTrimmedString,
      OWNER_OPEN_ID: optionalTrimmedString,
      SMTP_HOST: z.preprocess((v) => {
        const u = emptyToUndefined(v);
        if (typeof u !== "string") return void 0;
        const t2 = u.trim();
        return t2 === "" ? void 0 : t2;
      }, z.string().optional()),
      SMTP_PORT: z.preprocess((v) => {
        const cleaned = emptyToUndefined(v);
        if (cleaned === void 0) return 587;
        const n = Number(cleaned);
        return Number.isFinite(n) && n > 0 ? n : 587;
      }, z.number().int().positive()),
      SMTP_USER: optionalTrimmedString,
      SMTP_PASS: optionalTrimmedString,
      CONTACT_TO_EMAIL: z.preprocess((v) => {
        const u = emptyToUndefined(v);
        if (typeof u !== "string") return void 0;
        const t2 = u.trim();
        return t2 === "" ? void 0 : t2;
      }, z.string().email().optional())
    });
    productionStricter = baseSchema.superRefine((env2, ctx) => {
      if (env2.NODE_ENV !== "production") return;
      const required = ["DATABASE_URL"];
      for (const key of required) {
        if (!env2[key]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [key],
            message: `${key} is required when NODE_ENV=production`
          });
        }
      }
    });
    parsed = productionStricter.safeParse(process.env);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`).join("\n");
      console.error(`[env] Invalid environment configuration:
${issues}`);
      throw new Error("Environment validation failed. See logs above.");
    }
    env = parsed.data;
    ENV = {
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
      contactToEmail: env.CONTACT_TO_EMAIL ?? ""
    };
  }
});

// server/_core/contactMessageText.ts
function formatContactInboundBody(params) {
  const { name, email, company, locale, message } = params;
  const lines = [
    `From: ${name} <${email}>`,
    company ? `Organization: ${company}` : null,
    `Locale: ${locale}`,
    "",
    message
  ].filter((line) => line !== null);
  return lines.join("\n");
}
var init_contactMessageText = __esm({
  "server/_core/contactMessageText.ts"() {
    "use strict";
  }
});

// server/_core/contactEmail.ts
var contactEmail_exports = {};
__export(contactEmail_exports, {
  sendContactOwnerEmail: () => sendContactOwnerEmail
});
import nodemailer from "nodemailer";
function resolveSmtpHost() {
  if (ENV.smtpHost.trim()) return ENV.smtpHost.trim();
  if (ENV.smtpUser.includes("@gmail.")) return "smtp.gmail.com";
  return "";
}
async function sendContactOwnerEmail(params) {
  const pass = ENV.smtpPass.replace(/\s+/g, "");
  const user = ENV.smtpUser.trim();
  const host = resolveSmtpHost();
  const toRaw = ENV.contactToEmail.trim();
  const to = toRaw || user;
  if (!host || !user || !pass || !to) {
    return false;
  }
  const text2 = formatContactInboundBody(params);
  const transporter = nodemailer.createTransport({
    host,
    port: ENV.smtpPort,
    secure: ENV.smtpPort === 465,
    auth: { user, pass }
  });
  try {
    await transporter.sendMail({
      from: { name: "Website contact form", address: user },
      replyTo: params.email,
      to,
      subject: `${SUBJECT_PREFIX} ${params.name}`,
      text: text2
    });
    return true;
  } catch (error) {
    console.warn("[Contact] SMTP send failed:", error);
    return false;
  }
}
var SUBJECT_PREFIX;
var init_contactEmail = __esm({
  "server/_core/contactEmail.ts"() {
    "use strict";
    init_env();
    init_contactMessageText();
    SUBJECT_PREFIX = "[Landing contact]";
  }
});

// api-src/entry.ts
import "dotenv/config";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";

// server/db.ts
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar
} from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var contactMessages = mysqlTable(
  "contact_messages",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    company: varchar("company", { length: 200 }),
    message: text("message").notNull(),
    locale: mysqlEnum("locale", ["en", "de"]).notNull(),
    userAgent: varchar("userAgent", { length: 512 }),
    status: mysqlEnum("status", ["new", "read", "archived"]).default("new").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull()
  },
  (table) => ({
    emailIdx: index("contact_messages_email_idx").on(table.email),
    createdAtIdx: index("contact_messages_created_at_idx").on(table.createdAt)
  })
);

// server/db.ts
init_env();
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function insertContactMessage(message) {
  const db = await getDb();
  if (!db) {
    console.warn(
      "[Database] Cannot persist contact message: database not available"
    );
    return null;
  }
  const [result] = await db.insert(contactMessages).values(message).$returningId();
  if (!result) return null;
  const rows = await db.select().from(contactMessages).where(eq(contactMessages.id, result.id)).limit(1);
  return rows[0] ?? null;
}

// server/_core/sdk.ts
init_env();

// server/_core/httpCompat.ts
function isWebRequest(req) {
  return typeof Request !== "undefined" && req instanceof Request;
}
function getCookieHeader(req) {
  if (isWebRequest(req)) {
    return req.headers.get("cookie") ?? void 0;
  }
  return req.headers.cookie;
}
function getUserAgent(req) {
  if (isWebRequest(req)) {
    return req.headers.get("user-agent");
  }
  const v = req.headers["user-agent"];
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0] ?? null;
  return null;
}

// server/_core/sdk.ts
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed2 = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed2));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(getCookieHeader(req));
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/context.ts
async function createFetchContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch {
    user = null;
  }
  return {
    req: opts.req,
    res: null,
    resHeaders: opts.resHeaders,
    user
  };
}

// server/_core/cookies.ts
function isSecureExpressRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function isSecureWebRequest(req) {
  const u = new URL(req.url);
  if (u.protocol === "https:") return true;
  const forwarded = req.headers.get("x-forwarded-proto");
  if (!forwarded) return false;
  return forwarded.split(",").some((p) => p.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  const secure = isSecureExpressRequest(req);
  return {
    httpOnly: true,
    path: "/",
    sameSite: secure ? "none" : "lax",
    secure
  };
}
function getSessionCookieOptionsUnified(req) {
  const secure = typeof Request !== "undefined" && req instanceof Request ? isSecureWebRequest(req) : isSecureExpressRequest(req);
  return {
    httpOnly: true,
    path: "/",
    sameSite: secure ? "none" : "lax",
    secure
  };
}
function buildSetCookieHeader(name, value, opts, maxAgeSec, expires) {
  const segments = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `Path=${opts.path ?? "/"}`
  ];
  if (opts.httpOnly) segments.push("HttpOnly");
  if (opts.secure) segments.push("Secure");
  segments.push(`SameSite=${opts.sameSite === "none" ? "None" : "Lax"}`);
  if (opts.domain) segments.push(`Domain=${opts.domain}`);
  if (maxAgeSec !== void 0) segments.push(`Max-Age=${maxAgeSec}`);
  if (expires) segments.push(`Expires=${expires.toUTCString()}`);
  return segments.join("; ");
}
function appendSetSessionCookie(headers, name, value, req, maxAgeMs) {
  const opts = getSessionCookieOptionsUnified(req);
  headers.append(
    "Set-Cookie",
    buildSetCookieHeader(name, value, opts, Math.floor(maxAgeMs / 1e3))
  );
}
function appendClearSessionCookie(headers, name, req) {
  const opts = getSessionCookieOptionsUnified(req);
  headers.append(
    "Set-Cookie",
    buildSetCookieHeader(name, "", opts, 0, /* @__PURE__ */ new Date(0))
  );
}

// server/_core/oauth.ts
async function handleOAuthCallbackRequest(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code") ?? void 0;
  const state = url.searchParams.get("state") ?? void 0;
  if (!code || !state) {
    return Response.json(
      { error: "code and state are required" },
      { status: 400 }
    );
  }
  try {
    const tokenResponse = await sdk.exchangeCodeForToken(code, state);
    const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
    if (!userInfo.openId) {
      return Response.json({ error: "openId missing from user info" }, { status: 400 });
    }
    await upsertUser({
      openId: userInfo.openId,
      name: userInfo.name || null,
      email: userInfo.email ?? null,
      loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
      lastSignedIn: /* @__PURE__ */ new Date()
    });
    const sessionToken = await sdk.createSessionToken(userInfo.openId, {
      name: userInfo.name || "",
      expiresInMs: ONE_YEAR_MS
    });
    const headers = new Headers({ Location: "/" });
    appendSetSessionCookie(
      headers,
      COOKIE_NAME,
      sessionToken,
      request,
      ONE_YEAR_MS
    );
    return new Response(null, { status: 302, headers });
  } catch (error) {
    console.error("[OAuth] Callback failed", error);
    return Response.json({ error: "OAuth callback failed" }, { status: 500 });
  }
}

// shared/schemas.ts
import { z as z2 } from "zod";
var SUPPORTED_LOCALES = ["en", "de"];
var contactMessageSchema = z2.object({
  name: z2.string().trim().min(2, "Name must be at least 2 characters").max(120, "Name must be at most 120 characters"),
  email: z2.string().trim().toLowerCase().email("Please provide a valid email address").max(320, "Email is too long"),
  company: z2.string().trim().max(200, "Organization name is too long").optional().or(z2.literal("").transform(() => void 0)),
  message: z2.string().trim().min(20, "Message must be at least 20 characters").max(5e3, "Message must be at most 5000 characters"),
  locale: z2.enum(SUPPORTED_LOCALES).default("en")
});

// server/_core/contactRouter.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
init_contactMessageText();

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/contactRouter.ts
var NOTIFICATION_TITLE_PREFIX = "New advisory inquiry";
async function safelyNotifyOwner(params) {
  try {
    return await notifyOwner({
      title: `${NOTIFICATION_TITLE_PREFIX} \u2014 ${params.name}`,
      content: formatContactInboundBody(params)
    });
  } catch (error) {
    console.warn("[Contact] Owner notification skipped:", error);
    return false;
  }
}
async function safelySendOwnerEmail(params) {
  try {
    const { sendContactOwnerEmail: sendContactOwnerEmail2 } = await Promise.resolve().then(() => (init_contactEmail(), contactEmail_exports));
    return await sendContactOwnerEmail2(params);
  } catch (error) {
    console.warn("[Contact] Owner email skipped:", error);
    return false;
  }
}
var contactRouter = router({
  submit: publicProcedure.input(contactMessageSchema).mutation(async ({ input, ctx }) => {
    const userAgent = getUserAgent(ctx.req);
    const stored = await insertContactMessage({
      name: input.name,
      email: input.email,
      company: input.company ?? null,
      message: input.message,
      locale: input.locale,
      userAgent: userAgent ? userAgent.slice(0, 512) : null
    });
    if (!stored) {
      throw new TRPCError3({
        code: "SERVICE_UNAVAILABLE",
        message: "Contact message could not be stored. Please try again."
      });
    }
    const [notified, emailed] = await Promise.all([
      safelyNotifyOwner({
        name: input.name,
        email: input.email,
        company: input.company,
        locale: input.locale,
        message: input.message
      }),
      safelySendOwnerEmail({
        name: input.name,
        email: input.email,
        company: input.company,
        locale: input.locale,
        message: input.message
      })
    ]);
    return { success: true, id: stored.id, notified, emailed };
  })
});

// server/_core/systemRouter.ts
import { z as z3 } from "zod";
var systemRouter = router({
  health: publicProcedure.input(
    z3.object({
      timestamp: z3.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z3.object({
      title: z3.string().min(1, "title is required"),
      content: z3.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
var appRouter = router({
  // Socket.io routes (if added later) must be registered in server/_core/index.ts.
  // All tRPC paths live under /api/trpc so the gateway routes them correctly.
  system: systemRouter,
  contact: contactRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      if (ctx.resHeaders) {
        appendClearSessionCookie(ctx.resHeaders, COOKIE_NAME, ctx.req);
      } else {
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      }
      return {
        success: true
      };
    })
  })
});

// api-src/entry.ts
function withUppercaseMethod(request) {
  const upper = request.method.toUpperCase();
  if (upper === request.method) {
    return request;
  }
  const init = {
    method: upper,
    headers: request.headers,
    signal: request.signal,
    redirect: request.redirect,
    referrer: request.referrer,
    referrerPolicy: request.referrerPolicy,
    integrity: request.integrity,
    keepalive: request.keepalive,
    cache: request.cache,
    credentials: request.credentials,
    mode: request.mode
  };
  if (upper !== "GET" && upper !== "HEAD") {
    init.body = request.body;
    Object.assign(init, { duplex: "half" });
  }
  return new Request(request.url, init);
}
function normalizeFunctionEntryPathname(request) {
  const url = new URL(request.url);
  const p = url.pathname.replace(/\/$/, "") || "/";
  if (p !== "/api/index.js" && !p.endsWith("/api/index.js")) {
    return request;
  }
  const next = new URL(request.url);
  next.pathname = "/api";
  return new Request(next.toString(), request);
}
function normalizeCollapsingApiUrl(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const collapsed = path === "/api" || path === "/api/";
  if (!collapsed) {
    return request;
  }
  const raw = request.headers.get("x-invoke-path") ?? request.headers.get("x-vercel-invoke-path") ?? request.headers.get("x-forwarded-uri") ?? "";
  if (!raw.includes("api")) {
    return request;
  }
  try {
    const nextPath = raw.startsWith("http") ? new URL(raw) : new URL(raw, url.origin);
    const next = new URL(`${nextPath.pathname}${nextPath.search}`, url.origin);
    return new Request(next.toString(), request);
  } catch {
    return request;
  }
}
function rewriteBareApiPath(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "") || "/";
  if (path !== "/api") {
    return request;
  }
  const isOAuth = request.method.toUpperCase() === "GET" && (url.searchParams.has("code") || url.searchParams.has("state"));
  const next = new URL(request.url);
  next.pathname = isOAuth ? "/api/oauth/callback" : "/api/trpc";
  return new Request(next.toString(), request);
}
async function handleApi(request) {
  const req = rewriteBareApiPath(
    normalizeCollapsingApiUrl(
      normalizeFunctionEntryPathname(withUppercaseMethod(request))
    )
  );
  const url = new URL(req.url);
  const method = req.method.toUpperCase();
  if (method === "OPTIONS" && (url.pathname.startsWith("/api/trpc") || url.pathname === "/api/oauth/callback")) {
    return new Response(null, {
      status: 204,
      headers: { Allow: "GET, POST, HEAD, OPTIONS" }
    });
  }
  if (url.pathname === "/api/oauth/callback" && method === "GET") {
    return handleOAuthCallbackRequest(req);
  }
  if (url.pathname.startsWith("/api/trpc")) {
    return fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext: createFetchContext,
      /**
       * Required when the client uses `methodOverride: "POST"` (queries as
       * POST). Without this, tRPC returns METHOD_NOT_SUPPORTED (HTTP 405).
       */
      allowMethodOverride: true
    });
  }
  return new Response("Not Found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
var entry_default = { fetch: handleApi };
var GET = handleApi;
var POST = handleApi;
var HEAD = handleApi;
var OPTIONS = handleApi;
var PUT = handleApi;
var PATCH = handleApi;
var DELETE = handleApi;
export {
  DELETE,
  GET,
  HEAD,
  OPTIONS,
  PATCH,
  POST,
  PUT,
  entry_default as default
};
