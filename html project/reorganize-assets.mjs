/**
 * Reorganize html project: move all assets to assets/ with proper naming.
 * Run from html project folder: node reorganize-assets.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;

const JS_NAME_MAP = {
  "webpack-c92b2de2a07aa647.js": "webpack-runtime.js",
  "4bd1b696-c023c6e3521b1417.js": "vendor-react.js",
  "255-2aa030c9ba2867e3.js": "vendor-next.js",
  "framework-2c534e0e662575a2.js": "framework.js",
  "main-app-cdc17ce6779b95c2.js": "main-app.js",
  "main-20d0cc4fe4d4d514.js": "main.js",
  "polyfills-42372ed130431b0a.js": "polyfills.js",
  "619-ba102abea3e3d0e4.js": "chunk-icons.js",
  "975-1b34a3a36e6be6d8.js": "chunk-image.js",
  "646.f342b7cffc01feb0.js": "chunk-lazy-646.js",
  "139.7a5a8e93a21948c1.js": "chunk-lazy-139.js",
  "layout-21898b5daec31fed.js": "layout.js",
  "page-31b0075b4efb4b75.js": "page-shared.js",
  "page-39cde923ea2d6cfe.js": "page-content.js",
  "page-5eba5167aea7acfd.js": "page-donate-finder.js",
  "page-de950f04a83cd570.js": "page-donate-redirect.js",
  "page-497584e1ddea4106.js": "page-org-hub.js",
  "page-2f16e25bfbc0afd0.js": "page-donate-cash.js",
  "page-c2a38b16eea85a3a.js": "page-donate-crypto.js",
  "page-90708ede5614ca7a.js": "page-donate-stock.js",
  "page-9ef6e9c41f90fe4b.js": "page-donate-daf.js",
  "page-dac0b842c411026b.js": "page-contact.js",
  "page-e832353046674199.js": "page-government-contact.js",
  "page-794f45148c12cd85.js": "page-not-found.js",
  "_app-82835f42865034fa.js": "pages-app.js",
  "_error-013f4188946cdd04.js": "pages-error.js",
  "_ssgManifest.js": "ssg-manifest.js",
  "_buildManifest.js": "build-manifest.js",
};

const CSS_NAME = "main.css";
const OLD_CSS = "218221952895dbe3.css";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function rm(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function walkFiles(dir, filter, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(p, filter, results);
    else if (!filter || filter(p)) results.push(p);
  }
  return results;
}

function jsNameFromPath(filePath) {
  const base = path.basename(filePath);
  if (JS_NAME_MAP[base]) return JS_NAME_MAP[base];

  const rel = filePath.replace(/\\/g, "/");
  if (rel.includes("/app/")) {
    const part = rel.split("/app/")[1].replace(/\/page-[^/]+\.js$/, "").replace(/\//g, "-");
    const hash = base.match(/page-([^.]+)/)?.[1]?.slice(0, 8) || base.replace(".js", "");
    return `page-${part || "app"}-${hash}.js`.replace(/--+/g, "-");
  }
  return base.replace(/^[0-9]+-/, "chunk-").replace(/\.js$/, ".js");
}

function buildPathMap() {
  const map = new Map();

  map.set(`/_next/static/css/${OLD_CSS}`, `/assets/css/${CSS_NAME}`);
  map.set(`/_next/static/css/${OLD_CSS}`.replace(/\//g, "\\"), `/assets/css/${CSS_NAME}`);

  const chunksDir = path.join(root, "_next", "static", "chunks");
  walkFiles(chunksDir, (p) => p.endsWith(".js")).forEach((file) => {
    const base = path.basename(file);
    const newName = JS_NAME_MAP[base] || jsNameFromPath(file);
    const relFromChunks = file.replace(chunksDir, "").replace(/\\/g, "/");
    const fullOld = `/_next/static/chunks${relFromChunks}`;

    map.set(fullOld, `/assets/js/${newName}`);
    map.set(`/_next/static/chunks/${base}`, `/assets/js/${newName}`);
  });

  const manifestDir = path.join(root, "_next", "static");
  for (const entry of fs.readdirSync(manifestDir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name !== "chunks" && entry.name !== "css" && entry.name !== "media") {
      for (const f of fs.readdirSync(path.join(manifestDir, entry.name))) {
        if (f.endsWith(".js")) {
          const newName = JS_NAME_MAP[f] || f.replace(/^_/, "");
          map.set(`/_next/static/${entry.name}/${f}`, `/assets/js/${newName}`);
        }
      }
    }
  }

  walkFiles(path.join(root, "images"), () => true).forEach((file) => {
    const base = path.basename(file);
    map.set(`/images/${base}`, `/assets/images/${base}`);
  });

  walkFiles(path.join(root, "videos"), () => true).forEach((file) => {
    const base = path.basename(file);
    map.set(`/videos/${base}`, `/assets/videos/${base}`);
    if (base === "hero-city-temp.mp4") {
      map.set(`/videos/hero-city.mp4`, `/assets/videos/hero-city.mp4`);
    }
  });

  map.set("/videos/hero-city.mp4", "/assets/videos/hero-city.mp4");
  map.set("/images/hero-city.jpg", "/assets/images/hero-city.svg");
  map.set("/images/community-outreach.jpg", "/assets/images/community-outreach.svg");
  map.set("/images/team-collaboration.jpg", "/assets/images/team-collaboration.svg");
  map.set("/images/enterprise-tech.jpg", "/assets/images/enterprise-tech.svg");
  map.set("/images/city-street.jpg", "/assets/images/city-street.svg");

  const nextRouteChunks = [
    ["/_next/donate/%5BorgSlug%5D/page-497584e1ddea4106.js", "page-org-hub.js"],
    ["/_next/donate/%5BorgSlug%5D/cash/page-2f16e25bfbc0afd0.js", "page-donate-cash.js"],
    ["/_next/donate/%5BorgSlug%5D/crypto/page-c2a38b16eea85a3a.js", "page-donate-crypto.js"],
    ["/_next/donate/%5BorgSlug%5D/stock/page-90708ede5614ca7a.js", "page-donate-stock.js"],
    ["/_next/donate/%5BorgSlug%5D/daf/page-9ef6e9c41f90fe4b.js", "page-donate-daf.js"],
  ];
  for (const [oldPath, newFile] of nextRouteChunks) {
    map.set(oldPath, `/assets/js/${newFile}`);
  }

  return map;
}

function safeReplace(content, oldPath, newPath) {
  if (oldPath.startsWith("/images/") || oldPath.startsWith("/videos/")) {
    return content.replace(
      new RegExp(`(?<!/assets)${oldPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g"),
      newPath
    );
  }
  return content.split(oldPath).join(newPath);
}

function applyReplacements(content, pathMap) {
  let result = content;

  const sorted = [...pathMap.entries()].sort((a, b) => b[0].length - a[0].length);

  for (const [oldPath, newPath] of sorted) {
    result = safeReplace(result, oldPath, newPath);
  }

  result = result.replace(/\/_next\/static\/media\//g, "/assets/fonts/");
  result = result.replace(/r\.p="\/_next\/"/g, 'r.p="/assets/js/"');
  result = result.replace(/\.p="\/_next\/"/g, '.p="/assets/js/"');

  for (const [oldName, newName] of Object.entries(JS_NAME_MAP)) {
    result = result.replaceAll(`static/chunks/app/${oldName}`, newName);
    result = result.replaceAll(`static/chunks/pages/${oldName}`, newName);
    result = result.replaceAll(`static/chunks/${oldName}`, newName);
  }

  for (const [oldPath, newPath] of sorted) {
    if (oldPath.includes("/static/chunks/")) {
      const chunkFile = path.posix.basename(newPath);
      const chunkOld = oldPath.split("/static/chunks/")[1];
      if (chunkOld) {
        result = result.replaceAll(`static/chunks/${chunkOld}`, chunkFile);
      }
    }
  }

  result = result.replace(/static\/chunks\/app\//g, "");
  result = result.replace(/static\/chunks\/pages\//g, "");
  result = result.replace(/static\/chunks\//g, "");

  return result;
}

function moveAssets(pathMap) {
  const assetsDir = path.join(root, "assets");
  ensureDir(path.join(assetsDir, "css"));
  ensureDir(path.join(assetsDir, "js"));
  ensureDir(path.join(assetsDir, "images"));
  ensureDir(path.join(assetsDir, "videos"));
  ensureDir(path.join(assetsDir, "fonts"));

  const cssSrc = path.join(root, "_next", "static", "css", OLD_CSS);
  if (fs.existsSync(cssSrc)) {
    copyFile(cssSrc, path.join(assetsDir, "css", CSS_NAME));
  }

  const chunksDir = path.join(root, "_next", "static", "chunks");
  walkFiles(chunksDir, (p) => p.endsWith(".js")).forEach((file) => {
    const base = path.basename(file);
    const newName = JS_NAME_MAP[base] || jsNameFromPath(file);
    copyFile(file, path.join(assetsDir, "js", newName));
  });

  const manifestDir = path.join(root, "_next", "static");
  for (const entry of fs.readdirSync(manifestDir, { withFileTypes: true })) {
    if (entry.isDirectory() && !["chunks", "css", "media"].includes(entry.name)) {
      for (const f of fs.readdirSync(path.join(manifestDir, entry.name))) {
        if (f.endsWith(".js")) {
          const newName = JS_NAME_MAP[f] || f.replace(/^_/, "");
          copyFile(path.join(manifestDir, entry.name, f), path.join(assetsDir, "js", newName));
        }
      }
    }
  }

  const mediaDir = path.join(root, "_next", "static", "media");
  if (fs.existsSync(mediaDir)) {
    for (const f of fs.readdirSync(mediaDir)) {
      copyFile(path.join(mediaDir, f), path.join(assetsDir, "fonts", f));
    }
  }

  if (fs.existsSync(path.join(root, "images"))) {
    for (const f of fs.readdirSync(path.join(root, "images"))) {
      copyFile(path.join(root, "images", f), path.join(assetsDir, "images", f));
    }
  }

  if (fs.existsSync(path.join(root, "videos"))) {
    for (const f of fs.readdirSync(path.join(root, "videos"))) {
      copyFile(path.join(root, "videos", f), path.join(assetsDir, "videos", f));
    }
  }

  const heroTemp = path.join(assetsDir, "videos", "hero-city-temp.mp4");
  const heroDest = path.join(assetsDir, "videos", "hero-city.mp4");
  if (fs.existsSync(heroTemp) && !fs.existsSync(heroDest)) {
    fs.copyFileSync(heroTemp, heroDest);
  }
}

function updateAllFiles(pathMap) {
  const files = walkFiles(root, (p) => {
    const rel = p.replace(root, "");
    if (rel.includes(`${path.sep}assets${path.sep}`)) return false;
    if (rel.includes(`${path.sep}_next${path.sep}`)) return false;
    return (
      p.endsWith(".html") ||
      p.endsWith(".js") ||
      p.endsWith(".css") ||
      p.endsWith(".txt")
    );
  });

  for (const file of files) {
    let content = fs.readFileSync(file, "utf8");
    const updated = applyReplacements(content, pathMap);
    if (updated !== content) fs.writeFileSync(file, updated);
  }

  walkFiles(path.join(root, "assets"), (p) => p.endsWith(".js") || p.endsWith(".css")).forEach((file) => {
    let content = fs.readFileSync(file, "utf8");
    const updated = applyReplacements(content, pathMap);
    if (updated !== content) fs.writeFileSync(file, updated);
  });
}

function cleanup() {
  rm(path.join(root, "_next"));
  rm(path.join(root, "images"));
  rm(path.join(root, "videos"));

  walkFiles(root, (p) => p.endsWith(".txt")).forEach((f) => fs.unlinkSync(f));
}

function writeReadme() {
  const readme = `# On 3rd Outreach — Static HTML Site

Complete static HTML clone with organized \`assets/\` folder structure.

## Folder structure

\`\`\`
assets/
  css/main.css          — Site stylesheet
  js/                   — JavaScript bundles (layout, pages, vendors)
  images/               — Images and icons
  videos/               — Hero video
  fonts/                — Web fonts (if present)
\`\`\`

## Open locally

\`\`\`powershell
cd "html project"
npx serve .
\`\`\`

## Reorganize assets (after manual edits)

\`\`\`powershell
node reorganize-assets.mjs
\`\`\`

Last reorganized: ${new Date().toISOString().split("T")[0]}
`;
  fs.writeFileSync(path.join(root, "README.md"), readme);
}

console.log("Building path map...");
const pathMap = buildPathMap();

console.log("Moving files to assets/...");
moveAssets(pathMap);

console.log("Updating references in HTML, CSS, and JS...");
updateAllFiles(pathMap);

console.log("Cleaning up old folders...");
cleanup();

  writeReadme();

  console.log("Running media path fix...");
  execSync("node fix-media-paths.mjs", { cwd: root, stdio: "inherit" });

  const jsCount = fs.readdirSync(path.join(root, "assets", "js")).length;
console.log(`Done! assets/css/main.css + ${jsCount} JS files in assets/js/`);
