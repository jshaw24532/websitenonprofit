const scripts = [
  "webpack-runtime.js",
  "vendor-react.js",
  "vendor-next.js",
  "main-app.js",
  "chunk-icons.js",
  "layout.js",
  "chunk-image.js",
  "page-shared.js",
  "polyfills.js",
];

for (const s of scripts) {
  const url = `https://demowebsiteslinks.com/josephproject/assets/js/${s}`;
  const r = await fetch(url, { method: "HEAD" });
  console.log(r.status, s);
}
