/**
 * Use real JPG photos and MP4 video in the static HTML project.
 * Run: node fix-media-paths.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

const IMAGES = [
  "hero-city",
  "community-outreach",
  "team-collaboration",
  "enterprise-tech",
  "city-street",
];

function walk(d, files = []) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory() && f.name !== "node_modules") walk(p, files);
    else if (/\.(html|js|css)$/.test(f.name)) files.push(p);
  }
  return files;
}

function fixContent(content) {
  let r = content;

  while (r.includes("/assets/assets/")) {
    r = r.replaceAll("/assets/assets/", "/assets/");
  }

  for (const name of IMAGES) {
    r = r.replaceAll(`/assets/images/${name}.svg`, `/assets/images/${name}.jpg`);
    r = r.replaceAll(`/images/${name}.svg`, `/assets/images/${name}.jpg`);
    r = r.replaceAll(`/images/${name}.jpg`, `/assets/images/${name}.jpg`);
  }

  r = r.replaceAll("/videos/hero-city-temp.mp4", "/assets/videos/hero-city.mp4");
  r = r.replaceAll("/videos/hero-city.mp4", "/assets/videos/hero-city.mp4");
  r = r.replaceAll("/assets/videos/hero-city-temp.mp4", "/assets/videos/hero-city.mp4");
  r = r.replace(/(?<!\/assets)\/images\//g, "/assets/images/");
  r = r.replace(/(?<!\/assets)\/videos\//g, "/assets/videos/");

  return r;
}

// Sync real media from Next.js public folder (read-only copy)
const publicRoot = path.join(root, "..", "public");
const srcVideo = path.join(publicRoot, "videos", "hero-city.mp4");
const destVideo = path.join(root, "assets", "videos", "hero-city.mp4");
if (fs.existsSync(srcVideo)) {
  fs.copyFileSync(srcVideo, destVideo);
  console.log(`Video: ${(fs.statSync(destVideo).size / 1024 / 1024).toFixed(1)} MB`);
}

for (const name of IMAGES) {
  const src = path.join(publicRoot, "images", `${name}.jpg`);
  const dest = path.join(root, "assets", "images", `${name}.jpg`);
  if (fs.existsSync(src)) fs.copyFileSync(src, dest);
}

let count = 0;
for (const file of walk(root)) {
  if (file.endsWith("fix-media-paths.mjs") || file.endsWith("fix-real-media.mjs") || file.endsWith("patch-paths.mjs")) continue;
  const original = fs.readFileSync(file, "utf8");
  const fixed = fixContent(original);
  if (fixed !== original) {
    fs.writeFileSync(file, fixed);
    count++;
  }
}

console.log(`Updated ${count} files — all photos use JPG, hero uses MP4.`);
