import superjson from "superjson";

/**
 * tRPC's HTTP links always call `response.json()`. Vercel (or any proxy) can
 * occasionally return an empty body; that throws before tRPC can surface a
 * proper error. We normalize empty bodies into a deserialize‑able TRPC error
 * payload (same superjson shape the server uses for `error`).
 */
export function trpcFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return globalThis
    .fetch(input, { ...init, credentials: "include" })
    .then(async res => {
      const text = await res.text();
      if (text.trim() !== "") {
        return new Response(text, {
          status: res.status,
          statusText: res.statusText,
          headers: res.headers,
        });
      }

      const message = `Empty API response (HTTP ${res.status}). If this is production, open Vercel → Functions → Logs for /api.`;

      const errShape = {
        message,
        code: -32_603,
        data: {
          code: "INTERNAL_SERVER_ERROR" as const,
          httpStatus: res.status,
        },
      };

      const body = JSON.stringify({
        error: superjson.serialize(errShape),
      });

      return new Response(body, {
        status: 200,
        headers: new Headers({
          "content-type": "application/json",
        }),
      });
    });
}
