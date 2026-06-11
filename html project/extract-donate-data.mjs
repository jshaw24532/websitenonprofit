/**
 * Extract org/category data from Next.js source into JSON (read-only).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const orgSrc = fs.readFileSync(
  path.join(root, "..", "src", "lib", "organizations.ts"),
  "utf8"
);
const catSrc = fs.readFileSync(
  path.join(root, "..", "src", "lib", "impact-categories.ts"),
  "utf8"
);

function extractCategories() {
  const m = catSrc.match(/impactCategories:\s*ImpactCategory\[\]\s*=\s*(\[[\s\S]*?\n\]);/);
  if (!m) throw new Error("Could not parse impactCategories");
  return eval(m[1]);
}

function extractOrganizations() {
  const start = orgSrc.indexOf("export const organizations: Organization[] = [");
  if (start === -1) throw new Error("Could not find organizations array");
  const eq = orgSrc.indexOf("= [", start);
  if (eq === -1) throw new Error("Could not find organizations array start");
  let i = eq + 2;
  const begin = i;
  let depth = 0;
  for (; i < orgSrc.length; i++) {
    if (orgSrc[i] === "[") depth++;
    if (orgSrc[i] === "]") {
      depth--;
      if (depth === 0) break;
    }
  }
  let arrStr = orgSrc.slice(begin, i + 1);
  arrStr = arrStr
    .replace(/\ballMethods\b/g, '["cash","crypto","stock","daf"]')
    .replace(/\bcashCryptoDaf\b/g, '["cash","crypto","daf"]')
    .replace(/\bnonCash\b/g, '["crypto","stock","daf"]');
  try {
    const fn = new Function("return " + arrStr);
    const result = fn();
    if (!Array.isArray(result)) throw new Error("Not an array");
    return result;
  } catch (e) {
    console.error("Parse error:", e.message);
    console.error("Snippet:", arrStr.slice(0, 300));
    return [];
  }
}

const data = {
  categories: extractCategories(),
  organizations: extractOrganizations(),
};

const out = path.join(root, "assets", "data", "donate-data.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(data, null, 2));
console.log(`Extracted ${data.organizations.length} orgs, ${data.categories.length} categories`);
