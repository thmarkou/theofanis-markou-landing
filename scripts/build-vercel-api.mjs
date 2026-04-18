import * as esbuild from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

await esbuild.build({
  absWorkingDir: root,
  entryPoints: [path.join(root, "api-src/entry.ts")],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  packages: "external",
  outfile: path.join(root, "api/index.js"),
  alias: {
    "@shared": path.join(root, "shared"),
  },
  logLevel: "info",
});
