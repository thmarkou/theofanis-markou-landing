import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

/**
 * Vite configuration for the executive landing page.
 *
 * - React + Tailwind v4 + path aliases mirroring `tsconfig.json`.
 * - Manual vendor chunks split the heaviest dependencies off the main bundle
 *   so first paint downloads only what the hero + header need; the rest
 *   (framer-motion, radix primitives, form libs) loads in parallel.
 * - `rollup-plugin-visualizer` writes `dist/bundle-stats.html` when the
 *   `ANALYZE` env var is set, so bundle inspection is opt-in and never runs
 *   on CI deploys.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...(process.env.ANALYZE
      ? [
          visualizer({
            filename: path.resolve(
              import.meta.dirname,
              "dist",
              "bundle-stats.html"
            ),
            template: "treemap",
            gzipSize: true,
            brotliSize: true,
            open: false,
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        /**
         * Hand-rolled chunk splitting.
         *
         * Goal: keep the initial bundle (everything parsed before first paint)
         * below 500 KB gzipped and let browsers parallelize the rest.
         *
         * Grouping rationale:
         * - `react`       : React itself + ReactDOM + scheduler — needed first.
         * - `router`      : wouter — tiny, bundled with React.
         * - `motion`      : framer-motion is ~120 KB gzipped on its own.
         * - `radix`       : every `@radix-ui/*` package used by shadcn UI.
         * - `forms`       : react-hook-form + zod + @hookform/resolvers.
         * - `trpc`        : tRPC client + tanstack query + superjson.
         * - `icons`       : lucide-react — tree-shakes per-icon but splitting
         *                   keeps the still-sizable icon set out of the main bundle.
         * - `sonner`      : toast notifications, only used by the contact form.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          if (id.includes("/react-dom/") || id.includes("/react/") || id.includes("/scheduler/")) {
            return "react";
          }
          if (id.includes("/wouter/")) return "router";
          if (id.includes("/framer-motion/") || id.includes("/motion-dom/") || id.includes("/motion-utils/")) {
            return "motion";
          }
          if (id.includes("/@radix-ui/")) return "radix";
          if (
            id.includes("/react-hook-form/") ||
            id.includes("/@hookform/") ||
            id.includes("/zod/")
          ) {
            return "forms";
          }
          if (
            id.includes("/@trpc/") ||
            id.includes("/@tanstack/react-query") ||
            id.includes("/superjson/")
          ) {
            return "trpc";
          }
          if (id.includes("/lucide-react/")) return "icons";
          if (id.includes("/sonner/")) return "sonner";

          return undefined;
        },
      },
    },
  },
  server: {
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
