import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type {
  Express,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import * as db from "../db";
import {
  appendSetSessionCookie,
  getSessionCookieOptions,
} from "./cookies";
import { sdk } from "./sdk";

function getQueryParam(req: ExpressRequest, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: ExpressRequest, res: ExpressResponse) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

/**
 * OAuth callback for Vercel’s native `fetch` handler (`api/index.ts`).
 */
export async function handleOAuthCallbackRequest(
  request: globalThis.Request
): Promise<globalThis.Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code") ?? undefined;
  const state = url.searchParams.get("state") ?? undefined;

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

    await db.upsertUser({
      openId: userInfo.openId,
      name: userInfo.name || null,
      email: userInfo.email ?? null,
      loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
      lastSignedIn: new Date(),
    });

    const sessionToken = await sdk.createSessionToken(userInfo.openId, {
      name: userInfo.name || "",
      expiresInMs: ONE_YEAR_MS,
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
