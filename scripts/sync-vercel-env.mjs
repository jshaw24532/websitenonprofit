/**
 * Sync environment variables from .env.local to Vercel (production + preview).
 * Usage: node scripts/sync-vercel-env.mjs
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { spawnSync } from "child_process";

const envPath = resolve(process.cwd(), ".env.local");
if (!existsSync(envPath)) {
  console.error(".env.local not found");
  process.exit(1);
}

const vars = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  vars[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
}

// Production site URL (override localhost)
vars.NEXT_PUBLIC_SITE_URL = "https://on3rdoutreach.org";

const vercelJs = resolve(process.cwd(), "node_modules/vercel/dist/vc.js");

const keys = Object.keys(vars);
const environments = ["production", "preview"];
let ok = 0;
let fail = 0;

for (const env of environments) {
  console.log(`\n=== ${env} ===`);
  for (const key of keys) {
    const result = spawnSync(
      process.execPath,
      [vercelJs, "env", "add", key, env, "--value", vars[key], "--yes", "--force"],
      { cwd: process.cwd(), encoding: "utf8" }
    );
    if (result.status === 0) {
      console.log(`  ✓ ${key}`);
      ok++;
    } else {
      console.error(`  ✗ ${key}: ${(result.stderr || result.stdout || "").trim()}`);
      fail++;
    }
  }
}

console.log(`\nDone: ${ok} set, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
