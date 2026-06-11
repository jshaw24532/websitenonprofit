/**
 * Fix absolute paths for subdirectory deployment (e.g. /josephproject/).
 *
 * Usage:
 *   node configure-base-path.mjs /josephproject
 *   node configure-base-path.mjs /
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(root, "deploy.config.json");

function normalizeBase(input) {
  if (!input || input === "/") return "";
  let b = input.trim();
  if (!b.startsWith("/")) b = "/" + b;
  return b.replace(/\/$/, "");
}

function getBase() {
  const arg = process.argv[2];
  if (arg !== undefined) return normalizeBase(arg);
  if (fs.existsSync(configPath)) {
    const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return normalizeBase(cfg.basePath === "/" ? "" : cfg.basePath || "");
  }
  return normalizeBase("/josephproject");
}

function repairBrokenTags(content) {
  return content.replace(/\/josephproject\/>/g, "/>");
}

function stripBase(content, base) {
  if (!base) {
    content = repairBrokenTags(content);
    return content;
  }
  content = repairBrokenTags(content);
  const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  content = content.replaceAll(base + base, base);
  content = content.replace(new RegExp(escaped + "/assets/", "g"), "/assets/");
  content = content.replace(new RegExp(`([="'(])${escaped}/`, "g"), "$1/");
  return content;
}

function addBase(content, base) {
  content = repairBrokenTags(content);
  if (!base) return stripBase(content, "");

  content = stripBase(content, base);

  const slug = base.slice(1);
  const skipPrefix = slug ? `(?!${slug}/)` : "";

  // Only prefix real URL paths (must start with a path character after /)
  content = content.replace(
    new RegExp(`([="'(])/(?!/)(?=[a-zA-Z0-9_-])${skipPrefix}`, "g"),
    `$1${base}/`
  );

  content = content.replace(/url\(\/assets\//g, `url(${base}/assets/`);
  content = content.replace(/\.p="\/assets\//g, `.p="${base}/assets/`);

  return content;
}

function walk(d, files = []) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    if (f.name === "node_modules") continue;
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p, files);
    else if (/\.(html|js|css|json)$/.test(f.name)) files.push(p);
  }
  return files;
}

const base = getBase();
console.log(`Base path: ${base || "(site root)"}`);

fs.writeFileSync(configPath, JSON.stringify({ basePath: base || "/" }, null, 2));

const skipFiles = ["configure-base-path.mjs", "deploy.config.json"];
let count = 0;

for (const file of walk(root)) {
  if (skipFiles.some((s) => file.endsWith(s))) continue;
  if (file.endsWith("donate-data.json")) continue;

  const original = fs.readFileSync(file, "utf8");
  const updated = addBase(original, base);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    count++;
  }
}

console.log(`Updated ${count} files.`);

if (base) {
  console.log(`Live URL: https://demowebsiteslinks.com${base}/`);
  console.log(`CSS check: https://demowebsiteslinks.com${base}/assets/css/main.css`);
}
