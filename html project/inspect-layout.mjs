import fs from "fs";

const layout = fs.readFileSync("assets/js/layout.js", "utf8");
const matches = [...layout.matchAll(/\/josephproject\/government[^"']*/g)].map((m) => m[0]);
console.log("josephproject gov paths:", [...new Set(matches)]);

const bad = [...layout.matchAll(/\/government[^"']*/g)].map((m) => m[0]);
const unprefixed = bad.filter((p) => !p.startsWith("/josephproject"));
console.log("unprefixed /government paths:", [...new Set(unprefixed)].slice(0, 15));

// Check for broken regex artifacts
for (const f of ["assets/js/layout.js", "assets/js/main-app.js", "assets/js/vendor-next.js", "assets/js/webpack-runtime.js"]) {
  const c = fs.readFileSync(f, "utf8");
  if (c.includes("/josephproject/>")) console.log("BROKEN TAG in", f);
  if (c.includes("http:/josephproject")) console.log("BROKEN URL in", f);
}
