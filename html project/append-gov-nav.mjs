import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const layoutPath = path.join(root, "assets/js/layout.js");
const fallbackPath = path.join(root, "assets/js/gov-nav-fallback.js");
const marker = "/* gov-nav-fallback */";

let layout = fs.readFileSync(layoutPath, "utf8");
const fallback = fs.readFileSync(fallbackPath, "utf8");

const idx = layout.indexOf(marker);
if (idx !== -1) {
  layout = layout.slice(0, idx);
}

fs.writeFileSync(layoutPath, layout + "\n" + marker + "\n" + fallback);
console.log("Appended gov-nav-fallback to layout.js");
