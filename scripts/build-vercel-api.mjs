import * as esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const handlerFile = path.join(root, "api/.vercel-handler.js");

await esbuild.build({
  absWorkingDir: root,
  entryPoints: [path.join(root, "api-src/entry.ts")],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  packages: "external",
  outfile: handlerFile,
  alias: {
    "@shared": path.join(root, "shared"),
  },
  logLevel: "info",
});

/**
 * One bundled handler + thin re-exports so Vercel routes preserve pathnames.
 * A single rewrite `/api/*` → `/api` strips `/trpc/auth.me` etc. and breaks tRPC.
 */
fs.writeFileSync(
  path.join(root, "api/index.js"),
  'export { default } from "./.vercel-handler.js";\n',
);

const trpcDir = path.join(root, "api/trpc");
fs.mkdirSync(trpcDir, { recursive: true });
fs.writeFileSync(
  path.join(trpcDir, "[trpc].js"),
  'export { default } from "../.vercel-handler.js";\n',
);

const oauthDir = path.join(root, "api/oauth");
fs.mkdirSync(oauthDir, { recursive: true });
fs.writeFileSync(
  path.join(oauthDir, "callback.js"),
  'export { default } from "../.vercel-handler.js";\n',
);
