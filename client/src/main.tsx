import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from "@shared/const";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink, TRPCClientError } from "@trpc/client";
import { trpcFetch } from "@/lib/trpcFetch";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import { bootstrapAnalyticsFromStorage } from "./lib/analyticsBootstrap";
import { ensureGtagConsentDefault } from "./lib/gtag";
import "./index.css";

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;
  if (error.message !== UNAUTHED_ERR_MSG) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: "/api/trpc",
      transformer: superjson,
      /**
       * POST for queries too: matches server `allowMethodOverride: true` and
       * avoids GET + edge quirks with long query strings on rewrites.
       */
      methodOverride: "POST",
      fetch: trpcFetch,
    }),
  ],
});

/** Consent Mode defaults before any Google tag; GA/Umami only if storage says so. */
ensureGtagConsentDefault();
bootstrapAnalyticsFromStorage();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found in index.html");
}

createRoot(rootElement).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
