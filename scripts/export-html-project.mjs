/**
 * Exports the full Next.js site as static HTML to "html project/".
 * Run: node scripts/export-html-project.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const htmlProjectDir = path.join(root, "html project");
const apiDir = path.join(root, "src", "app", "api");
const apiBackup = path.join(root, "src", "app", "_api_export_backup");

function rm(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function ensureAssets() {
  const publicDir = path.join(root, "public");
  const images = [
    "hero-city",
    "community-outreach",
    "team-collaboration",
    "enterprise-tech",
    "city-street",
  ];
  for (const name of images) {
    const svg = path.join(publicDir, "images", `${name}.svg`);
    const jpg = path.join(publicDir, "images", `${name}.jpg`);
    if (fs.existsSync(svg) && !fs.existsSync(jpg)) {
      fs.copyFileSync(svg, jpg);
      console.log(`  Created ${name}.jpg from SVG for static export`);
    }
  }
  const videoSrc = path.join(publicDir, "videos", "hero-city-temp.mp4");
  const videoDest = path.join(publicDir, "videos", "hero-city.mp4");
  if (fs.existsSync(videoSrc) && !fs.existsSync(videoDest)) {
    fs.copyFileSync(videoSrc, videoDest);
    console.log("  Created hero-city.mp4 from temp video");
  }
}

function writeReadme() {
  const readme = `# On 3rd Outreach — Static HTML Site

Complete static HTML clone of the Municipal Blockchain & Infrastructure Consortium website.

## Open locally

**Option A — Simple HTTP server (recommended):**

\`\`\`powershell
cd "html project"
npx serve .
\`\`\`

Then open http://localhost:3000 (or the port shown).

**Option B — Python:**

\`\`\`powershell
cd "html project"
python -m http.server 8080
\`\`\`

## Structure

- \`index.html\` — Homepage
- \`about/\`, \`mission/\`, \`programs/\`, \`impact/\`, \`contact/\`, \`volunteer/\`
- \`government/\` — Consortium section (10 sub-pages)
- \`donate/\` — Nonprofit finder + 25 organizations with cash/crypto/stock/daf flows
- \`_next/\` — Compiled CSS, JavaScript, and fonts
- \`images/\`, \`videos/\` — Media assets

## Regenerate

From the parent Next.js project:

\`\`\`powershell
node scripts/export-html-project.mjs
\`\`\`

Stop the dev server before regenerating.

## Notes

- Donation forms display success UI; connect a payment backend for production.
- Generated ${new Date().toISOString().split("T")[0]} from the Next.js source project.
`;
  fs.writeFileSync(path.join(htmlProjectDir, "README.md"), readme);
}

console.log("Preparing static export...");
ensureAssets();

console.log("Temporarily moving API routes (not supported in static export)...");
if (fs.existsSync(apiDir)) {
  rm(apiBackup);
  fs.renameSync(apiDir, apiBackup);
}

try {
  console.log("Building static site (this may take a few minutes)...");
  execSync("npm run build", {
    cwd: root,
    env: { ...process.env, STATIC_EXPORT: "true" },
    stdio: "inherit",
  });

  if (!fs.existsSync(outDir)) {
    throw new Error("Export failed: out/ directory not created");
  }

  console.log("Copying to html project/...");
  rm(htmlProjectDir);
  copyDir(outDir, htmlProjectDir);
  writeReadme();

  const pageCount = countHtmlFiles(htmlProjectDir);
  console.log(`\nDone! ${pageCount} HTML pages exported to: html project/`);
} finally {
  if (fs.existsSync(apiBackup)) {
    rm(apiDir);
    fs.renameSync(apiBackup, apiDir);
    console.log("Restored API routes.");
  }
  rm(outDir);
}

function countHtmlFiles(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) count += countHtmlFiles(p);
    else if (entry.name.endsWith(".html")) count++;
  }
  return count;
}
