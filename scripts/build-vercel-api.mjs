import * as esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outfile = path.join(root, "api/index.js");
const legacyHandler = path.join(root, "api/.vercel-handler.js");

if (fs.existsSync(legacyHandler)) {
  fs.unlinkSync(legacyHandler);
}

await esbuild.build({
  absWorkingDir: root,
  entryPoints: [path.join(root, "api-src/entry.ts")],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  packages: "external",
  outfile,
  alias: {
    "@shared": path.join(root, "shared"),
  },
  logLevel: "info",
});
