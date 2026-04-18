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
 * Single function entry + vercel.json rewrite `/api/:path*` → `/api?__vp=:path*`.
 * Non-Next projects do not treat `api/trpc/[trpc].js` as a dynamic route (404).
 */
fs.writeFileSync(
  path.join(root, "api/index.js"),
  'export { default } from "./.vercel-handler.js";\n',
);
