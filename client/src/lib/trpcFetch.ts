import superjson from "superjson";

function trpcErrorResponse(status: number, message: string): Response {
  const errShape = {
    message,
    code: -32_603,
    data: {
      code: "INTERNAL_SERVER_ERROR" as const,
      httpStatus: status,
    },
  };

  return new Response(
    JSON.stringify({ error: superjson.serialize(errShape) }),
    {
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
    }
  );
}

/**
 * tRPC's HTTP link always calls `response.json()`. Proxies often return HTML or
 * plain-text error pages (e.g. Vercel "The page could not be found"), which
 * makes `json()` throw. Empty bodies are handled the same way.
 */
function isNonJsonApiBody(text: string, res: Response): boolean {
  const trimmed = text.trim();
  if (trimmed.length === 0) return true;

  const ct = (res.headers.get("content-type") ?? "").toLowerCase();
  if (ct.includes("text/html")) return true;

  if (/^</.test(trimmed)) return true;

  // Common plain-text / minimal HTML shells from hosting CDNs
  if (/^(the page\b|error:\s|not found\b)/i.test(trimmed)) return true;

  try {
    JSON.parse(trimmed);
    return false;
  } catch {
    return true;
  }
}

export function trpcFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return globalThis
    .fetch(input, { ...init, credentials: "include" })
    .then(async res => {
      const text = await res.text();
      const trimmed = text.trim();

      if (trimmed === "") {
        return trpcErrorResponse(
          res.status,
          `Empty API response (HTTP ${res.status}). If this is production, open Vercel → Functions → Logs for /api.`
        );
      }

      if (isNonJsonApiBody(text, res)) {
        const hint = trimmed.slice(0, 120).replace(/\s+/g, " ");
        return trpcErrorResponse(
          res.status,
          `Non-JSON API response (HTTP ${res.status}). Likely an HTML or proxy error page, not tRPC. ${hint}`
        );
      }

      return new Response(text, {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
      });
    });
}
